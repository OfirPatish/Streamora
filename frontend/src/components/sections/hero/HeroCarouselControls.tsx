interface HeroCarouselControlsProps {
  totalItems: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onAutoPlayToggle: () => void;
  isAutoPlaying: boolean;
}

export function HeroCarouselControls({
  totalItems,
  currentIndex,
  onIndexChange,
  onAutoPlayToggle,
  isAutoPlaying,
}: HeroCarouselControlsProps) {
  const handleIndicatorClick = (index: number) => {
    onIndexChange(index);
  };

  return (
    <>
      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-12 z-30 flex gap-2">
        {Array.from({ length: totalItems }, (_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-gray-500 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={onAutoPlayToggle}
        className="absolute top-6 right-6 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
      >
        {isAutoPlaying ? "⏸️" : "▶️"}
      </button>
    </>
  );
}
