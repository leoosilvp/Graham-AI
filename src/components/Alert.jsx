import '../css/alert.css'

function Alert({ visible, message }) {

    if (!visible) return null;

    return (
        <section className='ctn-alert'>
            <article className='alert'>
                <i className='fa-solid fa-triangle-exclamation'></i>
                <h1>{message}</h1>
            </article>
        </section>
    )
}

export default Alert
