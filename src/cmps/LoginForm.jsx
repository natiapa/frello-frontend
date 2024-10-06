import { useState } from 'react'
import { userService } from '../services/user'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { googleLogin } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useNavigate } from 'react-router'
import { filterBoard, filterBoards } from '../store/actions/board.actions'

export function LoginForm({ setIsLogin, onLogin, isSignup }) {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
    setIsLogin(false)
  }

  async function onSuccess(response) {
    const { credential } = response
    try {
      const res = await googleLogin(credential)
      if (res) {
        console.log('res:', res)
        setIsLogin(false)
        navigate('/board')
        showSuccessMsg('Logged in successfully')
        filterBoards({ byMemberId: res._id })
      } else {
        showErrorMsg('Login failed')
      }
    } catch (err) {
      console.error('Error during Google login:', err)
      showErrorMsg('Oops, something went wrong!')
    }
  }
  function onFailure(res) {
    console.log('Login failed: res:', res)
  }
  const clientId =
    '922679906339-r3kj2mljtkelfcijme0kmclt1al1nfrk.apps.googleusercontent.com'

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <input
        type='text'
        name='username'
        value={credentials.username}
        placeholder='Username'
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        placeholder='Password'
        onChange={handleChange}
        required
        autoComplete='off'
      />
      {isSignup && (
        <input
          type='text'
          name='fullname'
          value={credentials.fullname}
          placeholder='Full name'
          onChange={handleChange}
          required
        />
      )}
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          buttonText='Login with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          shape='rectangular'
          theme='outline'
          size='large'
          cookiePolicy={'single_host_origin'}
          text='signin_with'
          isSignedIn={false}
        />
      </GoogleOAuthProvider>
      <button className='btn'>{isSignup ? 'Signup' : 'Login'}</button>
    </form>
  )
}
