import {COLORS} from '../values/colors'

export const AuthPage = () => {
    const mainStyle = {
        backgroundColor: COLORS.windowBackground,
        color: COLORS.highlight,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <>
            <main style={mainStyle}>
                <h1>Auth Page</h1>
            </main>
        </>
    )
}