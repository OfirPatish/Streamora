interface CarouselControlsProps {
  totalItems: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onAutoPlayToggle: () => void;
  isAutoPlaying: boolean;
}

export function CarouselControls({
  totalItems,
  currentIndex,
  onIndexChange,
  onAutoPlayToggle,
  isAutoPlaying,
}: CarouselControlsProps) {
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
              index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-muted/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={onAutoPlayToggle}
        className="absolute top-6 right-6 z-30 p-2 bg-background/50 rounded-full text-foreground hover:bg-background/70 transition-colors"
        aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
      >
        {isAutoPlaying ? "⏸️" : "▶️"}
      </button>
    </>
  );
}
