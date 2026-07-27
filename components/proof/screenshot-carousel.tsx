'use client';

import { useState, useCallback, useEffect } from 'react';

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

type ScreenshotCarouselProps = {
  screenshots: Screenshot[];
};

function PrevIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = screenshots.length;
  const canPrev = count > 1;
  const canNext = count > 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, goPrev, goNext]);

  const current = screenshots[index];
  const frame = screenshots[0];

  return (
    <div className="screenshot-carousel">
      <div className="screenshot-carousel-viewport">
        {canPrev && (
          <button
            type="button"
            className="screenshot-carousel-btn screenshot-carousel-prev"
            onClick={goPrev}
            aria-label="Previous screenshot"
          >
            <PrevIcon />
          </button>
        )}

        <figure className="screenshot-carousel-slide">
          <span
            className="proof-screenshot-frame screenshot-carousel-frame"
            style={
              frame.width && frame.height
                ? { aspectRatio: `${frame.width} / ${frame.height}` }
                : undefined
            }
          >
            <img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              loading="lazy"
            />
          </span>
          <figcaption className="screenshot-carousel-caption" aria-live="polite">
            {screenshots.map((screenshot, captionIndex) => (
              <span
                className={
                  captionIndex === index
                    ? 'screenshot-carousel-caption-item is-active'
                    : 'screenshot-carousel-caption-item'
                }
                aria-hidden={captionIndex === index ? undefined : true}
                key={screenshot.src}
              >
                {screenshot.caption}
              </span>
            ))}
          </figcaption>
        </figure>

        {canNext && (
          <button
            type="button"
            className="screenshot-carousel-btn screenshot-carousel-next"
            onClick={goNext}
            aria-label="Next screenshot"
          >
            <NextIcon />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="screenshot-carousel-toolbar">
          <span className="screenshot-carousel-counter">
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <span>/</span>
            <span>{String(count).padStart(2, '0')}</span>
          </span>
          <div className="screenshot-carousel-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`screenshot-carousel-dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
