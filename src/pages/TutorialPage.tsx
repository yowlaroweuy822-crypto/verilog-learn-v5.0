import { Navigate, NavLink, useParams } from 'react-router-dom';
import { TUTORIALS } from '../content';
import { itemKey, routeFor } from '../lib/keys';
import { CompletionButton } from '../components/CompletionButton';
import { HtmlBlock } from '../components/HtmlBlock';

export function TutorialPage() {
  const { chapterId, sectionIndex } = useParams();
  const chapterIndex = TUTORIALS.findIndex((item) => item.id === chapterId);
  const chapter = TUTORIALS[chapterIndex];
  const index = Number(sectionIndex ?? 0);

  if (!chapter || Number.isNaN(index) || index < 0 || index >= chapter.sections.length) {
    return <Navigate to={routeFor('tutorial', TUTORIALS[0].id, 0)} replace />;
  }

  const section = chapter.sections[index];
  const prev = previousTutorial(chapterIndex, index);
  const next = nextTutorial(chapterIndex, index);

  return (
    <article>
      <div className="breadcrumb">
        <NavLink to="/tutorial">教程</NavLink> › {chapter.title}
      </div>
      <h1 className="page-title">{section.title}</h1>
      <p className="page-sub">
        {chapter.icon} {chapter.title} · 第 {index + 1}/{chapter.sections.length} 节
      </p>
      <HtmlBlock html={section.html} className="tut-content" />
      <CompletionButton itemKey={itemKey('tutorial', chapter.id, index)} doneLabel="✓ 已学完" pendingLabel="标记为已学" />
      <nav className="chapter-nav" aria-label="教程前后导航">
        {prev ? (
          <NavLink className="cn-btn" to={prev.path}>
            ← {prev.label}
          </NavLink>
        ) : (
          <span />
        )}
        {next ? (
          <NavLink className="cn-btn next" to={next.path}>
            {next.label} →
          </NavLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function previousTutorial(chapterIndex: number, sectionIndex: number) {
  if (sectionIndex > 0) {
    const chapter = TUTORIALS[chapterIndex];
    return {
      label: chapter.sections[sectionIndex - 1].title,
      path: routeFor('tutorial', chapter.id, sectionIndex - 1),
    };
  }
  if (chapterIndex > 0) {
    const chapter = TUTORIALS[chapterIndex - 1];
    return {
      label: chapter.title,
      path: routeFor('tutorial', chapter.id, chapter.sections.length - 1),
    };
  }
  return null;
}

function nextTutorial(chapterIndex: number, sectionIndex: number) {
  const chapter = TUTORIALS[chapterIndex];
  if (sectionIndex < chapter.sections.length - 1) {
    return {
      label: chapter.sections[sectionIndex + 1].title,
      path: routeFor('tutorial', chapter.id, sectionIndex + 1),
    };
  }
  if (chapterIndex < TUTORIALS.length - 1) {
    const next = TUTORIALS[chapterIndex + 1];
    return {
      label: next.title,
      path: routeFor('tutorial', next.id, 0),
    };
  }
  return null;
}
