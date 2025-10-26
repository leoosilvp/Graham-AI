import { useEffect } from "react";

export function useOutsideClick(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return;

    const listener = (e) => {
      try {
        if (!ref?.current) return;
        if (!ref.current.contains(e.target) && !e.target.closest(".btn-profile")) {
          handler(e);
        }
      } catch (err) {
        console.error("useOutsideClick listener error:", err);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, active]);
}
