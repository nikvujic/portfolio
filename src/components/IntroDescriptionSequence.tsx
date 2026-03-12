type IntroDescriptionSequenceProps = {
  onComplete: () => void;
};

export function IntroDescriptionSequence({onComplete}: IntroDescriptionSequenceProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-base text-(--text) md:text-lg">
        Intro sequence goes here.
      </p>
    </div>
  );
}