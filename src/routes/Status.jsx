import { useEffect, useState } from 'react'
import '../css/status.css'
import icon from '../assets/img/icon-light.svg'
import { Link } from 'react-router-dom'

const Status = () => {
    const [commitsByDay, setCommitsByDay] = useState({})
    const [overallStatus, setOverallStatus] = useState('success')

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/status')

                if (!res.ok) return

                const data = await res.json()

                setOverallStatus(data.overallStatus)
                setCommitsByDay(data.commitsByDay)
            } catch (error) {
                console.error('Erro ao buscar status:', error)
            }
        }

        fetchStatus()
    }, [])

    const formatDay = (dateStr) =>
        new Date(`${dateStr}T00:00:00Z`).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        })

    const formatTime = (dateStr) =>
        new Date(dateStr).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

    return (
        <main className='ctn-status-page'>
            <section className='status-page'>
                <header className='status-page-header'>
                    <img onClick={() => window.location.href = '/chat'} src={icon} alt="Graham AI icon" />
                    <Link to='/docs'>Ir para Docs</Link>
                </header>

                <article className='status-all-applications'>
                    <i
                        className={`fa-solid ${overallStatus === 'success'
                            ? 'fa-check'
                            : overallStatus === 'warning'
                                ? 'fa-triangle-exclamation'
                                : 'fa-xmark'
                            }`}
                        style={
                            overallStatus === 'failure'
                                ? { color: 'red' }
                                : overallStatus === 'warning'
                                    ? { color: '#f59e0b' }
                                    : {}
                        }
                    ></i>

                    <h1>
                        {overallStatus === 'success'
                            ? 'Sistema funcionando normalmente.'
                            : overallStatus === 'warning'
                                ? 'Erros recentes detectados. Sistema pode estar instável.'
                                : 'Sistema com falhas recentes.'}
                    </h1>
                </article>

                <section className='commits-dates'>
                    {Object.entries(commitsByDay).map(([day, commits]) => (
                        <article className='commits-day' key={day}>
                            <h1>{formatDay(day)}</h1>
                            <hr />

                            <section className='latest-commits'>
                                {commits.length === 0 ? (
                                    <h3>Sem resultados para esse dia.</h3>
                                ) : (
                                    commits.map(commit => (
                                        <article className='commit' key={commit.sha}>
                                            <section>
                                                <p>{commit.message}</p>
                                                <h2>
                                                    {formatDay(commit.date.split('T')[0])}{' '}
                                                    {formatTime(commit.date)} UTC
                                                </h2>
                                            </section>

                                            <i className={`fa-solid ${commit.status === 'success' || commit.status === 'pending' ? 'fa-check' : 'fa-xmark'}`}
                                                style={commit.status === 'success' || commit.status === 'pending' ? {} : { color: 'red' }}>
                                            </i>
                                        </article>
                                    ))
                                )}
                            </section>
                        </article>
                    ))}
                </section>

                <Link to='/docs' className='link-go-to'>🠔 Ir para Docs</Link>
            </section>
        </main>
    )
}

export default Status
