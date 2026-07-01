import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BUGS, EXERCISES, MICRO_EXERCISES, PROJECTS, TUTORIALS, WAVEFORMS } from './content';
import { HomePage } from './pages/HomePage';
import { TutorialPage } from './pages/TutorialPage';
import { ExercisePage } from './pages/ExercisePage';
import { BugPage } from './pages/BugPage';
import { WaveformPage } from './pages/WaveformPage';
import { ProjectPage } from './pages/ProjectPage';
import { ReferencePage } from './pages/ReferencePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ProgressProvider } from './state/ProgressContext';

export function App() {
  return (
    <ProgressProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutorial" element={<Navigate to={`/tutorial/${TUTORIALS[0].id}/0`} replace />} />
          <Route path="/tutorial/:chapterId/:sectionIndex" element={<TutorialPage />} />
          <Route path="/micro" element={<Navigate to={`/micro/${MICRO_EXERCISES[0].id}`} replace />} />
          <Route
            path="/micro/:exerciseId"
            element={
              <ExercisePage
                section="micro"
                title="✏️ 微练习"
                intro="HDLBits 风格的零台阶入门题。每题只练一个小知识点，从输出常量开始，几分钟即可完成。"
                exercises={MICRO_EXERCISES}
              />
            }
          />
          <Route path="/exercise" element={<Navigate to={`/exercise/${EXERCISES[0].id}`} replace />} />
          <Route
            path="/exercise/:exerciseId"
            element={
              <ExercisePage
                section="exercise"
                title="🎯 综合练习"
                intro="覆盖基础到进阶的综合练习题，从门电路、加法器、计数器、FSM 到 UART。"
                exercises={EXERCISES}
              />
            }
          />
          <Route path="/bug" element={<Navigate to={`/bug/${BUGS[0].id}`} replace />} />
          <Route path="/bug/:bugId" element={<BugPage />} />
          <Route path="/waveform" element={<Navigate to={`/waveform/${WAVEFORMS[0].id}`} replace />} />
          <Route path="/waveform/:waveformId" element={<WaveformPage />} />
          <Route path="/project" element={<Navigate to={`/project/${PROJECTS[0].id}`} replace />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ProgressProvider>
  );
}