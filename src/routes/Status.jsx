import { useEffect, useState } from 'react'
import '../css/status.css'
import icon from '../assets/img/icon-light.svg'
import { NavLink } from 'react-router-dom'

const COMMITS_URL = 'https://api.github.com/repos/leoosilvp/Graham-AI/commits'

const GITHUB_HEADERS = {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json'
}

const Status = () => {
    const [commitsByDay, setCommitsByDay] = useState({})
    const [overallStatus, setOverallStatus] = useState('success')

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const commitsRes = await fetch(
                    `${COMMITS_URL}?per_page=50`,
                    { headers: GITHUB_HEADERS }
                )

                if (!commitsRes.ok) return

                const commits = await commitsRes.json()
                if (!Array.isArray(commits) || commits.length === 0) return

                const commitsWithStatus = await Promise.all(
                    commits.map(async (commit) => {
                        const statusRes = await fetch(
                            `https://api.github.com/repos/leoosilvp/Graham-AI/commits/${commit.sha}/status`,
                            { headers: GITHUB_HEADERS }
                        )

                        const statusData = await statusRes.json()

                        return {
                            sha: commit.sha,
                            message: commit.commit.message,
                            date: commit.commit.committer.date,
                            status: statusData.state
                        }
                    })
                )

                const latestCommit = commitsWithStatus[0]
                const lastFiveCommits = commitsWithStatus.slice(0, 3)

                if (latestCommit?.status !== 'success') {
                    setOverallStatus('failure')
                } else if (
                    lastFiveCommits.some(
                        c => c.status === 'failure' || c.status === 'error'
                    )
                ) {
                    setOverallStatus('warning')
                } else {
                    setOverallStatus('success')
                }

                const grouped = commitsWithStatus.reduce((acc, commit) => {
                    const day = new Date(commit.date).toISOString().split('T')[0]
                    acc[day] = acc[day] || []
                    acc[day].push(commit)
                    return acc
                }, {})

                const newestDate = new Date(commitsWithStatus[0].date)
                const oldestDate = new Date(
                    commitsWithStatus[commitsWithStatus.length - 1].date
                )

                const completedDays = {}
                const current = new Date(newestDate)

                while (current >= oldestDate) {
                    const dayKey = current.toISOString().split('T')[0]
                    completedDays[dayKey] = grouped[dayKey] || []
                    current.setUTCDate(current.getUTCDate() - 1)
                }

                setCommitsByDay(completedDays)
            } catch (error) {
                console.error('Erro ao buscar status do GitHub:', error)
            }
        }

        fetchCommits()
    }, [])

    const formatDay = (dateStr) =>
        new Date(dateStr).toLocaleDateString('pt-BR', {
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
                    <img src={icon} alt="Graham AI icon" />
                    <NavLink to='/docs'>Ir para Docs</NavLink>
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
                                                    {formatDay(commit.date)} {formatTime(commit.date)} UTC
                                                </h2>
                                            </section>

                                            <i
                                                className={`fa-solid ${commit.status === 'success'
                                                        ? 'fa-check'
                                                        : 'fa-xmark'
                                                    }`}
                                                style={
                                                    commit.status !== 'success'
                                                        ? { color: 'red' }
                                                        : {}
                                                }
                                            ></i>
                                        </article>
                                    ))
                                )}
                            </section>
                        </article>
                    ))}
                </section>
                
                <NavLink to='/docs' className='link-go-to'>🠔 Ir para Docs</NavLink>

            </section>
        </main>
    )
}

export default Status
