import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { useNavigate } from 'react-router'

export function LoginSignup({ setIsLogin }) {
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            navigate('/board')
            showSuccessMsg('Logged in successfully')
        } catch (err) {
            console.log('Cannot login', err)
            showErrorMsg('Login failed')
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
            navigate('/board')
            showSuccessMsg('Signed up successfully')
        } catch (err) {
            console.log('Cannot signup', err)
            showErrorMsg('Oops try again')
        }
    }

    // async function onSuccess(response) {
    //     const { credential } = response // ה-token שמתקבל מ-Google

    //     try {
    //         // שליחה ל-backend לצורך אימות ה-token
    //         const res = await googleLogin(credential)
    //         console.log('res:', res)
    //         console.log('credential:', credential)
    //         if (res) {
    //             setIsLogin(false)
    //             showSuccessMsg('Logged in successfully')
    //         } else {
    //             showErrorMsg('Login failed')
    //         }
    //     } catch (err) {
    //         console.error('Error during Google login:', err)
    //         showErrorMsg('Oops, something went wrong!')
    //     }
    // }
    // function onFailure(res) {
    //     console.log('Login failed: res:', res)
    // }
    // const clientId =
    //     '922679906339-r3kj2mljtkelfcijme0kmclt1al1nfrk.apps.googleusercontent.com'
    return (
        <div className='login-page'>
            <LoginForm setIsLogin={setIsLogin} onLogin={onLogin} isSignup={isSignup} />
            <div className='login-btns'>
                {/* <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        buttonText='Login with Google'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        shape='rectangular'
                        theme='outline'
                        size='large'
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </GoogleOAuthProvider> */}
                <a href='#' onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
                </a>
            </div>
        </div>
    )
}
