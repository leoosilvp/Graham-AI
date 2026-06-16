import { Camera } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"

const Account = () => {

    const { user } = useUser()

    return (
        <main className="settings-general-main">
            <h1 className="first">Conta</h1>

            <section>
                <div>
                <h2>Foto</h2>
                <p>Para melhores resultados, utilize imagens quadradas (500×500 ou superior). URLs diretas suportam GIFs e imagens em alta resolução.</p>
                </div>
                <div className="img">
                    <button><Camera size={20}/></button>
                    <img draggable={false} src={user?.profile?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
                </div>
            </section>

            <hr />

            <section className="margin-top">
                <h2>Nome</h2>
                <input className="input" value={user?.profile?.name} />
            </section>

            <hr />

            <section>
                <h2>E-Mail</h2>
                <input className="input" value={user?.email} />
            </section>

            <hr />

            <section>
                <h2>Senha</h2>
                <div className="btn">
                    <button>Trocar senha</button>
                </div>
            </section>

            <hr />

            <h1>Dados pessoais</h1>

            <section>
                <h2>Genero</h2>
                <select value={user?.profile?.gender}>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="None">Prefiro não informar</option>
                </select>
            </section>

            <hr />

            <section>
                <h2>Data de nascimento</h2>
                <input className="input date" value={user?.profile?.birthDate} />
            </section>

            <hr />

            <h1>PERIGO!!</h1>

            <section>
                <div>
                    <h2>Deletar conta</h2>
                    <p>Esta ação não poderá ser desfeita. Após a exclusão, não será possível recuperar sua conta ou qualquer informação vinculada a ela.</p>
                </div>
                <div className="btn">
                    <button className="del">Deletar</button>
                </div>
            </section>
        </main>
    )
}

export default Account
