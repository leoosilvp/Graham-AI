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
                licenseKey='tldraw-leonardo-silva-2027-07-09/WyJzSG1WSGhLUiIsWyIqLmdyYWhhbS52dSJdLDksIjIwMjctMDctMDkiXQ.Nszl1HM+oPXF8Fv9w65f4Fc8GYlRsAeq29AYFg1OjSB1C/mCo1H4oU8fRqlq7GRHOHMGK23qHpJbAdbsSQ9J4g'
            />
        </main>
    )
}

export default Blackboard