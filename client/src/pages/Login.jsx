import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../constans'
import './CSS/Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.user.role)
        localStorage.setItem('code', data.user.code)
        localStorage.setItem('fullname', data.user.firstName + ' ' + data.user.lastName)
        navigate('/')
      } else {
        setError(data.msg || 'Đăng nhập không thành công')
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gọi API:', error)
      setError('Đã xảy ra lỗi khi đăng nhập')
    }
  }

  return (
    <>
      <div className='center container-lg'>
        <div className='login-container'>
          <h2 className='login-title'>Đăng nhập</h2>
          <form onSubmit={handleLogin} className='form'>
            <div className='form-group'>
              <label>Tên đăng nhập:</label>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label>Mật khẩu:</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className='error-message'>{error}</p>}
            <div className='form-button'>
              <button type='submit'>Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
