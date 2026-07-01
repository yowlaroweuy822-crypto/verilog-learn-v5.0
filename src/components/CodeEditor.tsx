import { useEffect, useRef } from 'react';
import { StreamLanguage } from '@codemirror/language';
import { verilog } from '@codemirror/legacy-modes/mode/verilog';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view';

function editorTheme(isDark: boolean) {
  return EditorView.theme({
    '&': {
      minHeight: '360px',
      fontSize: '13px',
      backgroundColor: isDark ? '#0d1117' : '#ffffff',
      color: isDark ? '#e6edf3' : '#1f2328',
    },
    '.cm-content': {
      fontFamily: '"JetBrains Mono", "SF Mono", Consolas, Menlo, monospace',
      padding: '14px 0',
      backgroundColor: isDark ? '#0d1117' : '#ffffff',
    },
    '.cm-gutters': {
      backgroundColor: isDark ? '#161b22' : '#f6f8fa',
      color: '#8b949e',
      borderRight: isDark ? '1px solid #30363d' : '1px solid #e1e4e8',
    },
    '.cm-activeLine': {
      backgroundColor: isDark ? '#161b22' : '#f6f8fa',
    },
    '.cm-activeLineGutter': {
      backgroundColor: isDark ? '#161b22' : '#f6f8fa',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-selectionBackground': {
      backgroundColor: isDark ? '#264f78' : '#ddf4ff',
    },
  });
}

export function CodeEditor({
  value,
  onChange,
  dark = false,
}: {
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const themeCompartment = useRef(new Compartment());

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!hostRef.current || viewRef.current) return;

    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          keymap.of([]),
          StreamLanguage.define(verilog),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onChangeRef.current(update.state.doc.toString());
          }),
          themeCompartment.current.of(editorTheme(dark)),
        ],
      }),
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // 切换暗色模式时重新配置主题
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: themeCompartment.current.reconfigure(editorTheme(dark)),
    });
  }, [dark]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div className="code-editor" ref={hostRef} />;
}
