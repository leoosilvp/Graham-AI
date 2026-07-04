import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import '../css/blackboard.css'

const Blackboard = () => {

    const handleMount = (editor) => {
        editor.updateInstanceState({ isGridMode: true })
        editor.user.updateUserPreferences({ colorScheme: 'dark' })
    }

    return (
        <main className='blackboard-main'>
            <Tldraw
                persistenceKey="example"
                forceDarkMode={true}
                onMount={handleMount}
                licenseKey='tldraw-2026-07-18/ WyJsZ3hRdmpGTCIsWyIqIl0sMTYsIj IwMjYtMDctMTgiXQ. bs1Gcz9s7gskAP4XLUJhVRqA0JZXix KzE2awC01v+qwsnz8D+ RBjSQyKpJEJyCtq+ 0WhmIlIVgXNeBaARBt3Nw'
            />
        </main>
    )
}

export default Blackboard