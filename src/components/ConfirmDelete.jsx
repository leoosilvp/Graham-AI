import '../css/confirmDelete.css'

const ConfirmDelete = (props) => {
    return (
        <section className="ctn-confirm-delete-card">
            <article className="confirm-delete-card">
                <h1>{props.h1}</h1>
                <h2>{props.h2} <span>{props.span}</span></h2>
                <h3>{props.h3}</h3>
                <section className="buttons-delete-card">
                    <button onClick={props.onClick1}>{props.button1}</button>
                    <button className={props.cActive} onClick={props.onClick2}>{props.button2}</button>
                </section>
            </article>
        </section>
    )
}

export default ConfirmDelete
