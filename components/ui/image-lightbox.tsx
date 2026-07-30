'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';

type LightboxImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type OpenLightbox = (image: LightboxImage, trigger: HTMLButtonElement) => void;

const ImageLightboxContext = createContext<OpenLightbox | null>(null);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [image, setImage] = useState<LightboxImage | null>(null);

  const openLightbox = useCallback<OpenLightbox>((nextImage, trigger) => {
    triggerRef.current = trigger;
    setImage(nextImage);
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const handleClosed = useCallback(() => {
    setImage(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (!image || !dialogRef.current || dialogRef.current.open) {
      return;
    }

    dialogRef.current.showModal();
  }, [image]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [image]);

  return (
    <ImageLightboxContext.Provider value={openLightbox}>
      {children}
      <dialog
        className="image-lightbox-dialog"
        ref={dialogRef}
        aria-label={image ? `Enlarged image: ${image.alt}` : 'Enlarged image'}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeLightbox();
          }
        }}
      >
        <button
          className="project-enquiry-dialog-close image-lightbox-close"
          type="button"
          aria-label="Close enlarged image"
          onClick={closeLightbox}
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>
        {image ? (
          <div
            className="image-lightbox-stage"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeLightbox();
              }
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        ) : null}
      </dialog>
    </ImageLightboxContext.Provider>
  );
}

type ZoomableImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'alt' | 'src'
> & {
  src: string;
  alt: string;
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  ...props
}: ZoomableImageProps) {
  const openLightbox = useContext(ImageLightboxContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  if (!openLightbox) {
    throw new Error(
      'ZoomableImage must be used inside ImageLightboxProvider.',
    );
  }

  return (
    <button
      className="image-lightbox-trigger"
      type="button"
      ref={buttonRef}
      aria-label={`Enlarge image: ${alt}`}
      aria-haspopup="dialog"
      onClick={() => {
        if (!buttonRef.current) {
          return;
        }

        openLightbox(
          {
            src: imageRef.current?.currentSrc || src,
            alt,
            width:
              typeof width === 'number'
                ? width
                : imageRef.current?.naturalWidth,
            height:
              typeof height === 'number'
                ? height
                : imageRef.current?.naturalHeight,
          },
          buttonRef.current,
        );
      }}
    >
      <img
        {...props}
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </button>
  );
}
