import { Navigate, NavLink, useParams } from 'react-router-dom';
import { ExerciseCard } from '../components/ExerciseCard';
import { routeFor } from '../lib/keys';
import type { Exercise, LearningSection } from '../types';

export function ExercisePage({
  section,
  title,
  intro,
  exercises,
}: {
  section: Extract<LearningSection, 'micro' | 'exercise'>;
  title: string;
  intro: string;
  exercises: Exercise[];
}) {
  const { exerciseId } = useParams();
  const index = exercises.findIndex((item) => item.id === exerciseId);
  const exercise = exercises[index];

  if (!exercise) return <Navigate to={routeFor(section, exercises[0].id)} replace />;

  return (
    <article>
      <div className="breadcrumb">
        <NavLink to={routeFor(section, exercises[0].id)}>{title}</NavLink> › 第 {index + 1} 题
      </div>
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{intro}</p>
      <ExerciseCard exercise={exercise} section={section} badge={section === 'micro' ? `微练 ${index + 1}` : `练习 ${index + 1}`} />
      <nav className="chapter-nav" aria-label="练习前后导航">
        {index > 0 ? (
          <NavLink className="cn-btn" to={routeFor(section, exercises[index - 1].id)}>
            ← {exercises[index - 1].title}
          </NavLink>
        ) : (
          <span />
        )}
        {index < exercises.length - 1 ? (
          <NavLink className="cn-btn next" to={routeFor(section, exercises[index + 1].id)}>
            {exercises[index + 1].title} →
          </NavLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
