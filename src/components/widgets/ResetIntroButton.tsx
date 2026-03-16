import { createPortal } from 'react-dom';

type ResetIntroButtonProps = {
  onReset: () => void;
};

export function ResetIntroButton({ onReset }: ResetIntroButtonProps) {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="absolute top-4 right-4 z-50">
      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer rounded-full border border-(--border) bg-(--bg)/90 px-3 py-2 text-xs font-medium text-(--text-h) shadow-[var(--shadow)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
      >
        Reset Intro
      </button>
    </div>,
    document.body,
  );
}
