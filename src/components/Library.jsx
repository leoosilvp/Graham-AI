import { useState, useCallback } from "react";
import "../css/library.css";
import ConfirmDelete from "./ConfirmDelete";
import { useLibrary } from "../hooks/useLibrary";

function Library() {
  const { isOpen, open, close, images, selectedImg, setSelectedImg, removeImage } = useLibrary();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);

  const handleDownload = useCallback((url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "GrahamAI-image.jpg";
    link.click();
  }, []);

  const askDelete = useCallback((img) => {
    setImgToDelete(img);
    setDeleteModalOpen(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setImgToDelete(null);
    setDeleteModalOpen(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!imgToDelete) return;
    removeImage(imgToDelete);
    setImgToDelete(null);
    setDeleteModalOpen(false);
  }, [imgToDelete, removeImage]);

  return (
    <section className="ctn-library">
      <article className="library">
        <button onClick={open}>
          <p><i className="fa-regular fa-images"></i> Biblioteca</p>
          <span>Ctrl + L</span>
        </button>
      </article>

      {isOpen && (
        <section className="ctn-modal-library">
          <article className="modal-library">
            <section className="header-modal-library">
              <h1>{selectedImg ? "Visualização" : "Imagens"}</h1>
              <button onClick={close}><i className="fa-solid fa-xmark"></i></button>
            </section>

            <section className="content-modal-library">
              {selectedImg ? (
                <article className="ctn-view-img">
                  <section className="options-view-img">
                    <button onClick={() => setSelectedImg(null)}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={() => handleDownload(selectedImg)}><i className="fa-solid fa-download"></i></button>
                    <button onClick={() => askDelete(selectedImg)}><i className="fa-solid fa-trash-can"></i></button>
                  </section>
                  <img src={selectedImg} alt="Visualização da imagem" />
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
                        <img src={img} alt={`Imagem ${i}`} onClick={() => setSelectedImg(img)} />
                        <section className="options-img-modal-library">
                          <button onClick={() => handleDownload(img)}><i className="fa-solid fa-download"></i></button>
                          <button onClick={() => askDelete(img)}><i className="fa-solid fa-trash-can"></i></button>
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

      {deleteModalOpen && (
        <ConfirmDelete
          cActive='active'
          h1="Deletar foto?"
          h2="Você está apagando uma imagem!"
          h3="Esta ação não tem mais volta. Você concorda em deletar essa imagem da sua conversa e do seu histórico para sempre?"
          button1="Cancelar"
          onClick1={cancelDelete}
          button2="Deletar"
          onClick2={confirmDelete}
        />
      )}
    </section>
  );
}

export default Library;
