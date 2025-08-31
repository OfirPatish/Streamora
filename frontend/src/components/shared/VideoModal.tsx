"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string;
  videoName: string;
}

export function VideoModal({ isOpen, onClose, videoKey, videoName }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl aspect-video">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-10 right-0 text-foreground hover:text-foreground/80 z-10"
        >
          <X className="w-4 h-4" />
        </Button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title={videoName}
          className="w-full h-full rounded-lg"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );
}
