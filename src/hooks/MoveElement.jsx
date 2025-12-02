import { useState, useLayoutEffect } from "react";

export default function usePersistentMove(ref) {
  const [moved, setMoved] = useState(() => {
    return localStorage.getItem("showAside") === "true";
  });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const width = element.offsetWidth;
    element.style.marginLeft = moved ? "0" : `-${width + 2}px`;

  }, [ref, moved]);

  const handleMove = () => {
    const element = ref.current;
    if (!element) return;

    const width = element.offsetWidth;
    const newState = !moved;

    setMoved(newState);
    localStorage.setItem("showAside", newState);
    element.style.transition = "var(--transition)";
    element.style.marginLeft = newState ? "0" : `-${width + 2}px`;
  };

  return handleMove;
}
