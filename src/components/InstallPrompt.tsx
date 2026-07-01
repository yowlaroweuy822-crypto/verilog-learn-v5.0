import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('veriloglearn_install_dismissed') === '1');

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    if (standalone || dismissed) return;

    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [dismissed]);

  if (!promptEvent || dismissed) return null;

  return (
    <div className="install-banner" role="status">
      <span className="install-icon">📱</span>
      <span>把 VerilogLearn 添加到桌面，之后可像 App 一样打开。</span>
      <button
        type="button"
        onClick={async () => {
          await promptEvent.prompt();
          setPromptEvent(null);
        }}
      >
        添加
      </button>
      <button
        className="install-close"
        type="button"
        aria-label="关闭安装提示"
        onClick={() => {
          localStorage.setItem('veriloglearn_install_dismissed', '1');
          setDismissed(true);
        }}
      >
        ×
      </button>
    </div>
  );
}
