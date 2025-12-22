import { useEffect, useState } from "react";

const Account = () => {

    const [avatar, setAvatar] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("grahamUser"));

        if (user) {
            setAvatar(user.avatar);

            if (user.name) {
                const parts = user.name.trim().split(" ");
                setFirstName(parts[0] || "");
                setLastName(parts.slice(1).join(" ") || "");
            }
        }
    }, []);

    const saveToLocalStorage = () => {
        const current = JSON.parse(localStorage.getItem("grahamUser")) || {};
        
        const updatedUser = {
            ...current,
            name: `${firstName} ${lastName}`.trim(),
            avatar: current.avatar
        };

        localStorage.setItem("grahamUser", JSON.stringify(updatedUser));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            saveToLocalStorage();
            window.location.reload();
        }
    };

    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1><i className="fa-regular fa-circle-user"/> Conta</h1>
            </section>

            <section className="ctn-settings-change-img">
                <div className="settings-change-img">
                    <img 
                        src={avatar || "https://static.vecteezy.com/ti/vetor-gratis/p1/9292244-default-avatar-icon-vector-of-social-media-user-vetor.jpg"} 
                        alt="img-profile" 
                    />
                </div>
                <div>
                    <button>Trocar Imagem</button>
                    <p>Envie uma nova imagem para atualizar seu perfil no Graham AI. Para garantir qualidade e alinhamento visual, recomendamos utilizar um arquivo quadrado de 500×500 pixels. Apenas imagens nos formatos PNG, JPG ou JPEG são aceitos, com tamanho máximo permitido de 20 MB. Certifique-se de que a imagem esteja nítida, atual e adequada antes de prosseguir com o envio.</p>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>Primeiro nome</h2>
                    <input 
                        type="text" 
                        placeholder="Seu nome" 
                        maxLength={13}
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </section>

            <hr className="settings-divisor-area" />

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>Sobrenome</h2>
                    <input 
                        type="text" 
                        placeholder="Seu sobrenome"
                        maxLength={13}
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </section>

            <h1 className="settings-new-area" style={{color:'#d63c3c'}}>AREA PERIGOSA!</h1>
            <hr style={{border:'1px solid #d63c3c'}}/>

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Excluir conta</h2>
                    <button className="active">Excluir</button>
                </div>
            </section>

            <hr style={{border:'1px solid #d63c3c'}}/>
            <h1 className="settings-new-area">Atualizar Plano</h1>
            <hr />

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Obter o Graham PRO</h2>
                    <button onClick={() => window.location.href='/docs/plans'}>Atualizar</button>
                </div>
            </section>

        </section>
    );
}

export default Account;
