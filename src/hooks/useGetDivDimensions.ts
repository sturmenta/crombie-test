import { useEffect, useRef, useState } from "react";

export const useGetDivDimensions = () => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const div_ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setDimensions({
        height: event[0].contentBoxSize[0].blockSize,
        width: event[0].contentBoxSize[0].inlineSize,
      });
    });

    if (div_ref?.current) resizeObserver.observe(div_ref.current);
  }, []);

  return { dimensions, div_ref };
};

// ── USAGE ───────────────────────────────────────────────────────────────────────────

// const { dimensions, div_ref } = useGetDivDimensions();

// <div ref={div_ref}>
//   <div style={{height: dimensions.height}} />
// </div>;

// ── DOCS ───────────────────────────────────────────────────────────────────────────

// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
