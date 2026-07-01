import { useProgress } from '../state/ProgressContext';

export function CompletionButton({
  itemKey,
  doneLabel = '✓ 已完成',
  pendingLabel = '标记为已完成',
}: {
  itemKey: string;
  doneLabel?: string;
  pendingLabel?: string;
}) {
  const { progress, toggleItem } = useProgress();
  const done = Boolean(progress.done[itemKey]);
  return (
    <button className={`done-btn ${done ? 'done' : ''}`} type="button" onClick={() => toggleItem(itemKey)}>
      {done ? doneLabel : pendingLabel}
    </button>
  );
}
