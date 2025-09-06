import { useState } from "react";

export default function MoveElement(ref) {
  const [moved, setMoved] = useState(false);

  const handleMove = () => {
    if (ref.current) {
      const width = ref.current.offsetWidth;

      if (!moved) {
        ref.current.style.marginLeft = `-${width + 2}px`;
      } else {
        ref.current.style.marginLeft = "0";
      }

      setMoved(!moved);
    }
  };

  return handleMove;
}
