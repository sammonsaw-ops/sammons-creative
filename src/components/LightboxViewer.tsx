"use client";
import Lightbox from "yet-another-react-lightbox";
import type { PhotoEntry } from "@/content/galleries";

type Props = {
  images: PhotoEntry[];
  index: number;
  onClose: () => void;
};

export function LightboxViewer({ images, index, onClose }: Props) {
  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index >= 0 ? index : 0}
      slides={images.map((i) => ({ src: i.src, alt: i.alt }))}
      controller={{ closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: "rgba(10,10,10,0.95)" } }}
    />
  );
}
