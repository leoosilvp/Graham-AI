import { useEffect } from 'react'
import { useUser } from './useUser'

export function ConsoleBanner() {

    const { user } = useUser()

    useEffect(() => {

        const banner = `
 ██████╗ ██████╗  █████╗ ██╗  ██╗ █████╗ ███╗   ███╗
██╔════╝ ██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗ ████║
██║  ███╗██████╔╝███████║███████║███████║██╔████╔██║
██║   ██║██╔══██╗██╔══██║██╔══██║██╔══██║██║╚██╔╝██║
╚██████╔╝██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝   
`
        const info = `
╔════════════════════════════════════════════════════════════╗
│ %cProvider  %cPleroma  %c                                        │
│ %cModel     %cGraham v1.8  %c                                    │
│ %cFocus     %cMathematical Intelligence                        │
╠════════════════════════════════════════════════════════════╣
│ %c● %ccloud    %cReady — go to %c/New %cto get started.              │
╚════════════════════════════════════════════════════════════╝
        `

        console.clear()
        console.log(
            `
            
            %c${banner}
%c✦ %cAdvanced Mathematical Inference%c ✦
%c${info}`,
            'color:#7b7b7b',

            'color:#ffffff',
            'color:#c4c4c4',
            'color:#ffffff',

            'color:#b3b3b3',
            'color:#767676',
            'color:#ffffff',
            'color:#b3b3b3',
            'color:#767676',
            'color:#b3b3b3',
            'color:#b3b3b3',
            'color:#767676',
            'color:#b3b3b3',

            'color:#5aff5a',
            'color:#767676',
            'color:#b3b3b3',
            'color:#ffffff',
            'color:#b3b3b3',
        )
    })
}