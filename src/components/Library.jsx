import { useState, useEffect } from "react";
import "../css/library.css";

function Library() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("libraryOpen") === "true";
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("chatImages")) || [];
    setImages(storedImages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatImages", JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem("libraryOpen", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("chatImages")) || [];
      setImages(stored);
    };
    window.addEventListener("updateLibrary", update);
    return () => window.removeEventListener("updateLibrary", update);
  }, []);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "imagem.jpg";
    link.click();
  };

  const handleDelete = (url) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta imagem?");
    if (!confirmDelete) return;
    const updated = images.filter((img) => img !== url);
    setImages(updated);
  };

  const handleClose = () => {
    setSelectedImg(null);
    setIsOpen(false);
  };

  return (
    <section className="ctn-library">
      <article className="library">
        <button onClick={() => setIsOpen(true)}>
          <p><i className="fa-regular fa-images"></i> Biblioteca</p>
          <span>Ctrl + L</span>
        </button>
      </article>

      {isOpen && (
        <section className="ctn-modal-library">
          <article className="modal-library">
            <section className="header-modal-library">
              <h1>{selectedImg ? "Visualização" : "Imagens"}</h1>
              <button onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
            </section>

            <section className="content-modal-library">
              {selectedImg ? (
                <article className="ctn-view-img">
                  <section className="options-view-img">
                    <button onClick={() => setSelectedImg(null)}>
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button onClick={() => handleDownload(selectedImg)}>
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button onClick={() => handleDelete(selectedImg)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </section>
                  <img src={selectedImg} alt="visualização" />
                </article>
              ) : (
                <article className="grid-imgs-modal-library">
                  {images.length === 0 ? (
                    <div className="no-images">
                      <p><i className="fa-regular fa-images"></i> Nenhuma imagem encontrada.</p>
                    </div>
                  ) : (
                    images.map((img, i) => (
                      <div key={i} className="ctn-img-modal-library">
                        <img src={img} alt={`imagem ${i}`} onClick={() => setSelectedImg(img)} />
                        <section className="options-img-modal-library">
                          <button onClick={() => handleDownload(img)}>
                            <i className="fa-solid fa-download"></i>
                          </button>
                          <button onClick={() => handleDelete(img)}>
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </section>
                      </div>
                    ))
                  )}
                </article>
              )}
            </section>
          </article>
        </section>
      )}
    </section>
  );
}

export default Library;
