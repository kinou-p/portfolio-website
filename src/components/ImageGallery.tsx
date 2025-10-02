import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}

export const ImageGallery = ({ images, projectTitle }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${projectTitle} - Image ${index + 1}`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-foreground"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={`${projectTitle} - Image ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </motion.div>
      )}
    </>
  );
};
