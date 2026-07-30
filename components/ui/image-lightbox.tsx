'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

export type LightboxImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LightboxGallery = {
  images: readonly LightboxImage[];
  index: number;
  onIndexChange?: (index: number) => void;
};

type OpenLightbox = (
  gallery: LightboxGallery,
  trigger: HTMLButtonElement,
) => void;

const ImageLightboxContext = createContext<OpenLightbox | null>(null);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const galleryRef = useRef<LightboxGallery | null>(null);
  const pointerStartRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const swipeHandledRef = useRef(false);
  const [gallery, setGallery] = useState<LightboxGallery | null>(null);
  const image = gallery?.images[gallery.index] ?? null;

  const openLightbox = useCallback<OpenLightbox>((nextGallery, trigger) => {
    const index = Math.min(
      Math.max(nextGallery.index, 0),
      nextGallery.images.length - 1,
    );
    const normalizedGallery = { ...nextGallery, index };

    triggerRef.current = trigger;
    galleryRef.current = normalizedGallery;
    setGallery(normalizedGallery);
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const showImage = useCallback((nextIndex: number) => {
    const currentGallery = galleryRef.current;

    if (!currentGallery || currentGallery.images.length <= 1) {
      return;
    }

    const index =
      (nextIndex + currentGallery.images.length) %
      currentGallery.images.length;
    const nextGallery = { ...currentGallery, index };

    galleryRef.current = nextGallery;
    setGallery(nextGallery);
    currentGallery.onIndexChange?.(index);
  }, []);

  const showPrevious = useCallback(() => {
    const currentGallery = galleryRef.current;

    if (currentGallery) {
      showImage(currentGallery.index - 1);
    }
  }, [showImage]);

  const showNext = useCallback(() => {
    const currentGallery = galleryRef.current;

    if (currentGallery) {
      showImage(currentGallery.index + 1);
    }
  }, [showImage]);

  const handleClosed = useCallback(() => {
    galleryRef.current = null;
    pointerStartRef.current = null;
    swipeHandledRef.current = false;
    setGallery(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (!gallery || !dialogRef.current || dialogRef.current.open) {
      return;
    }

    dialogRef.current.showModal();
  }, [gallery]);

  useEffect(() => {
    if (!gallery) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [gallery]);

  useEffect(() => {
    if (!gallery || gallery.images.length <= 1) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gallery, showNext, showPrevious]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        !gallery ||
        gallery.images.length <= 1 ||
        event.pointerType === 'mouse' ||
        (event.target instanceof Element && event.target.closest('button'))
      ) {
        return;
      }

      swipeHandledRef.current = false;
      pointerStartRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [gallery],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const start = pointerStartRef.current;

      if (!start || start.pointerId !== event.pointerId) {
        return;
      }

      pointerStartRef.current = null;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const horizontalDistance = event.clientX - start.x;
      const verticalDistance = event.clientY - start.y;
      const swipeThreshold = Math.max(
        44,
        event.currentTarget.clientWidth * 0.08,
      );

      if (
        Math.abs(horizontalDistance) < swipeThreshold ||
        Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.2
      ) {
        return;
      }

      swipeHandledRef.current = true;
      event.preventDefault();

      if (horizontalDistance < 0) {
        showNext();
      } else {
        showPrevious();
      }

      window.setTimeout(() => {
        swipeHandledRef.current = false;
      }, 0);
    },
    [showNext, showPrevious],
  );

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
            role={gallery && gallery.images.length > 1 ? 'group' : undefined}
            aria-roledescription={
              gallery && gallery.images.length > 1 ? 'carousel' : undefined
            }
            aria-label={
              gallery && gallery.images.length > 1
                ? `Image ${gallery.index + 1} of ${gallery.images.length}`
                : undefined
            }
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerEnd}
            onPointerCancel={() => {
              pointerStartRef.current = null;
            }}
            onClick={(event) => {
              if (swipeHandledRef.current) {
                swipeHandledRef.current = false;
                return;
              }

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
            {gallery && gallery.images.length > 1 ? (
              <>
                <button
                  className="image-lightbox-nav image-lightbox-prev"
                  type="button"
                  aria-label="Previous enlarged image"
                  onClick={showPrevious}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  className="image-lightbox-nav image-lightbox-next"
                  type="button"
                  aria-label="Next enlarged image"
                  onClick={showNext}
                >
                  <span aria-hidden="true">›</span>
                </button>
                <div
                  className="image-lightbox-pagination"
                  aria-label="Choose enlarged image"
                >
                  {gallery.images.map((galleryImage, index) => (
                    <button
                      className={
                        index === gallery.index
                          ? 'image-lightbox-dot is-active'
                          : 'image-lightbox-dot'
                      }
                      type="button"
                      aria-label={`Show enlarged image ${index + 1}`}
                      aria-current={index === gallery.index ? 'true' : undefined}
                      onClick={() => showImage(index)}
                      key={`${galleryImage.src}-${index}`}
                    />
                  ))}
                </div>
                <span className="sr-only" aria-live="polite">
                  Image {gallery.index + 1} of {gallery.images.length}:{' '}
                  {image.alt}
                </span>
              </>
            ) : null}
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
  lightboxImages?: readonly LightboxImage[];
  lightboxIndex?: number;
  onLightboxIndexChange?: (index: number) => void;
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  lightboxImages,
  lightboxIndex = 0,
  onLightboxIndexChange,
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

        const fallbackImage = {
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
        };
        const images =
          lightboxImages && lightboxImages.length > 0
            ? lightboxImages
            : [fallbackImage];

        openLightbox(
          {
            images,
            index: lightboxImages ? lightboxIndex : 0,
            onIndexChange: onLightboxIndexChange,
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
