import { useEffect, useState } from "react";
import useNotification from "../hooks/useNotification";
import "../css/upd.css";

const Upd = () => {
    const [show, setShow] = useState(false);
    const { notifications, loading, error } = useNotification();

    useEffect(() => {
        const first = localStorage.getItem("firstLogin");

        if (!first) {
            localStorage.setItem("firstLogin", "true");
            setShow(true);
        } else {
            if (first === "true") setShow(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("firstLogin", false);
        setShow(false);
        window.location.reload();
    };

    const redirectUpd = () => {
        localStorage.setItem("firstLogin", false);
        setShow(false);
        window.location.href='./docs';
    };

    if (!show || loading || error || notifications.length === 0) return null;

    const lastNotification = [...notifications].sort(
        (a, b) => b.id - a.id
    )[0];

    return (
        <section className="ctn-upd">
            <article className="upd">
                <div className="upd-content">
                    {lastNotification.videoUrl ? (
                        <video src={lastNotification.videoUrl} controls preload="metadata" />
                    ) : lastNotification.imgUrl ? (
                        <img src={lastNotification.imgUrl} alt={lastNotification.title} />
                    ) : null}

                    <section className="text-upd">
                        <h1>{lastNotification.title}</h1>
                        <p>{lastNotification.description}</p>

                        <div className="date-upd">
                            <h2>Atualização</h2>
                            <h3>{lastNotification.data}</h3>
                        </div>
                    </section>
                </div>
                <div className="upd-btns">
                    <button onClick={handleClose}>Fechar</button>
                    <button onClick={redirectUpd}>Saber mais</button>
                </div>
            </article>
        </section>
    );
};

export default Upd;