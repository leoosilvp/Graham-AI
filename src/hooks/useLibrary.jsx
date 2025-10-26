import { useState, useEffect, useCallback } from "react";

export function useLibrary() {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem("libraryOpen") === "true");
  const [images, setImages] = useState(() => JSON.parse(localStorage.getItem("libraryImages")) || []);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    localStorage.setItem("libraryOpen", isOpen);
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem("libraryImages", JSON.stringify(images));
  }, [images]);

  const addImage = useCallback((base64) => {
    setImages(prev => {
      if (prev.includes(base64)) return prev;
      const updated = [...prev, base64];
      return updated;
    });
  }, []);

  const removeImage = useCallback((img) => {
    setImages(prev => prev.filter(i => i !== img));
    if (selectedImg === img) setSelectedImg(null);
  }, [selectedImg]);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    window.addImageToLibrary = (base64) => {
      addImage(base64);
    };
  }, [addImage]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setSelectedImg(null); }, []);

  return {
    isOpen, open, close,
    images, selectedImg, setSelectedImg,
    addImage, removeImage
  };
}
