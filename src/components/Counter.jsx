import { useEffect, useRef, useState } from "react";

const Counter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  // Extract numeric value (e.g. "50+" => 50)
  const endValue = parseInt(value.replace(/\D/g, ""), 10) || 0;

  // Extract suffix (e.g. "+")
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const increment = endValue / (duration / 16);

          const timer = setInterval(() => {
            start += increment;

            if (start >= endValue) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 25);
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
