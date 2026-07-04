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
            />
        </main>
    )
}

export default Blackboard