// UI component types

export interface CarouselProps {
  items: any[];
  title?: string;
  showTitle?: boolean;
  showControls?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export interface CardProps {
  item: any;
  onClick?: () => void;
  showInfo?: boolean;
  showRating?: boolean;
}

export interface SkeletonProps {
  count?: number;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
