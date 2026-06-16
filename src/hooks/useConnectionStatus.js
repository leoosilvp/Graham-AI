import { useEffect, useState } from 'react'

export const useConnectionStatus = () => {
    const [status, setStatus] = useState('desconhecida')

    useEffect(() => {
        const connection =
            navigator.connection ||
            navigator.webkitConnection ||
            navigator.mozConnection

        const updateStatus = () => {
            if (!navigator.onLine) {
                setStatus('offline')
                return
            }

            if (!connection) {
                setStatus('online')
                return
            }

            const { effectiveType, downlink } = connection

            if (
                effectiveType === 'slow-2g' ||
                downlink < 0.5
            ) {
                setStatus('ruim')
            } else if (
                effectiveType === '2g' ||
                effectiveType === '3g' ||
                downlink < 5
            ) {
                setStatus('boa')
            } else {
                setStatus('excelente')
            }
        }

        updateStatus()

        window.addEventListener('online', updateStatus)
        window.addEventListener('offline', updateStatus)

        connection?.addEventListener(
            'change',
            updateStatus
        )

        return () => {
            window.removeEventListener(
                'online',
                updateStatus
            )

            window.removeEventListener(
                'offline',
                updateStatus
            )

            connection?.removeEventListener(
                'change',
                updateStatus
            )
        }
    }, [])

    return status
}