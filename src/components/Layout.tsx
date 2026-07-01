import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BUGS, EXERCISES, MICRO_EXERCISES, PROJECTS, SECTIONS, TUTORIALS, WAVEFORMS } from '../content';
import { itemKey, routeFor } from '../lib/keys';
import { doneCount, progressPercent, totalItems } from '../lib/progress';
import type { LearningSection } from '../types';
import { useProgress } from '../state/ProgressContext';
import { useUi } from '../state/UiContext';
import { CodeCopyEnhancer } from './CodeCopyEnhancer';
import { GlobalSearch } from './GlobalSearch';
import { InstallPrompt } from './InstallPrompt';

const HOME_ROUTES: Record<LearningSection, string> = {
  home: '/',
  tutorial: '/tutorial',
  micro: '/micro',
  exercise: '/exercise',
  bug: '/bug',
  waveform: '/waveform',
  project: '/project',
  reference: '/reference',
  playground: '/playground',
};

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { progress } = useProgress();
  const { dark, toggleDark } = useUi();
  const activeSection = getActiveSection(location.pathname);
  const percent = progressPercent(progress);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, .cm-editor')) return;
      if (event.key === 'Escape') setSidebarOpen(false);
      if (event.key === 'ArrowLeft') {
        const previous = document.querySelector<HTMLAnchorElement>('.chapter-nav .cn-btn:not(.next)');
        previous?.click();
      }
      if (event.key === 'ArrowRight') {
        const next = document.querySelector<HTMLAnchorElement>('.chapter-nav .cn-btn.next');
        next?.click();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <CodeCopyEnhancer />
      <header className="topnav">
        <button
          className="icon-button hamburger"
          type="button"
          aria-label={sidebarOpen ? '关闭导航' : '打开导航'}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          ☰
        </button>
        <NavLink className="logo" to="/">
          <span className="logo-mark">V</span>
          <span>VerilogLearn</span>
        </NavLink>
        <nav className="nav-sections" aria-label="主导航">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              className={`ns-btn ${activeSection === section.id ? 'active' : ''}`}
              to={HOME_ROUTES[section.id]}
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
        <GlobalSearch />
        <div className="top-actions" aria-label="学习进度">
          <button className="dark-toggle" type="button" onClick={toggleDark} aria-label={dark ? '切换到亮色模式' : '切换到暗色模式'}>
            {dark ? '☀️' : '🌙'}
          </button>
          <span className="progress-badge">{percent}%</span>
        </div>
      </header>

      <div className="layout-shell">
        <button
          className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
          type="button"
          aria-label="关闭侧边栏"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="章节导航">
          <SidebarContent activeSection={activeSection} closeSidebar={() => setSidebarOpen(false)} />
        </aside>
        <main className="main" id="main-content">
          <div className="mobile-progress">
            已完成 {doneCount(progress)}/{totalItems()} · {percent}%
          </div>
          {children}
        </main>
      </div>
      <InstallPrompt />
    </>
  );
}

function SidebarContent({
  activeSection,
  closeSidebar,
}: {
  activeSection: LearningSection;
  closeSidebar: () => void;
}) {
  const { progress } = useProgress();
  const location = useLocation();

  if (activeSection === 'tutorial') {
    return (
      <>
        <div className="sidebar-title">教程章节</div>
        {TUTORIALS.map((chapter) => {
          const chapterActive = location.pathname.includes(`/tutorial/${chapter.id}/`);
          const chapterDone = chapter.sections.every((_, index) => progress.done[itemKey('tutorial', chapter.id, index)]);
          return (
            <div key={chapter.id} className="sidebar-group">
              <NavLink
                className={`sidebar-item ${chapterDone ? 'done' : ''}`}
                to={routeFor('tutorial', chapter.id, 0)}
                onClick={closeSidebar}
              >
                <span className="si-icon">{chapter.icon}</span>
                <span>{chapter.title}</span>
                <span className="si-check">✓</span>
              </NavLink>
              {chapterActive
                ? chapter.sections.map((section, index) => {
                    const key = itemKey('tutorial', chapter.id, index);
                    return (
                      <NavLink
                        key={section.title}
                        className={`sidebar-sub ${progress.done[key] ? 'done' : ''}`}
                        to={routeFor('tutorial', chapter.id, index)}
                        onClick={closeSidebar}
                      >
                        {section.title}
                        {progress.done[key] ? ' ✓' : ''}
                      </NavLink>
                    );
                  })
                : null}
            </div>
          );
        })}
      </>
    );
  }

  if (activeSection === 'micro') {
    return <ItemList title="微练习（零基础入门）" icon="✏️" section="micro" items={MICRO_EXERCISES} onClick={closeSidebar} />;
  }
  if (activeSection === 'exercise') {
    return <ItemList title="综合练习" icon="🎯" section="exercise" items={EXERCISES} onClick={closeSidebar} />;
  }
  if (activeSection === 'bug') {
    return <ItemList title="Bug Hunt（找错）" icon="🐛" section="bug" items={BUGS} onClick={closeSidebar} />;
  }
  if (activeSection === 'waveform') {
    return <ItemList title="波形阅读" icon="📊" section="waveform" items={WAVEFORMS} onClick={closeSidebar} />;
  }
  if (activeSection === 'project') {
    return <ItemList title="UART 项目实战" icon="🚀" section="project" items={PROJECTS} onClick={closeSidebar} />;
  }

  return (
    <>
      <div className="sidebar-title">导航</div>
      <NavLink className="sidebar-item" to="/" onClick={closeSidebar}>
        <span className="si-icon">🏠</span>
        <span>首页仪表盘</span>
      </NavLink>
      <NavLink className="sidebar-item" to="/reference" onClick={closeSidebar}>
        <span className="si-icon">📖</span>
        <span>语法速查表</span>
      </NavLink>
      <NavLink className="sidebar-item" to="/playground" onClick={closeSidebar}>
        <span className="si-icon">💻</span>
        <span>代码练习场</span>
      </NavLink>
    </>
  );
}

function ItemList({
  title,
  icon,
  section,
  items,
  onClick,
}: {
  title: string;
  icon: string;
  section: Exclude<LearningSection, 'home' | 'tutorial' | 'reference' | 'playground'>;
  items: Array<{ id: string; title: string; part?: string }>;
  onClick: () => void;
}) {
  const { progress } = useProgress();
  return (
    <>
      <div className="sidebar-title">{title}</div>
      {items.map((item) => {
        const key = itemKey(section, item.id);
        return (
          <NavLink key={item.id} className={`sidebar-item ${progress.done[key] ? 'done' : ''}`} to={routeFor(section, item.id)} onClick={onClick}>
            <span className="si-icon">{icon}</span>
            <span>
              {item.part ? `${item.part} ` : ''}
              {item.title}
            </span>
            <span className="si-check">✓</span>
          </NavLink>
        );
      })}
    </>
  );
}

function getActiveSection(pathname: string): LearningSection {
  const first = pathname.split('/').filter(Boolean)[0] as LearningSection | undefined;
  if (!first) return 'home';
  return SECTIONS.some((section) => section.id === first) ? first : 'home';
}
