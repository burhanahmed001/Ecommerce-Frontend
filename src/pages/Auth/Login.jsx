import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form

const initialState = { email: "", password: "" }

const Login = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { email, password } = state
    email = email.trim()

    if (!window.isValidEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
    if (password.length < 6) { return window.toastify("Password must be at least 6 characters.", "error") }

    const credentials = { email, password }

    setIsProcessing(true)

    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      .then(({ status, data }) => {
        if (status === 200) {
          const { message, token, role, name, email: userEmail, _id } = data
          
        
          const userData = { _id, name, email: userEmail, role }

          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(userData))

          window.toastify(message || "Login successful!", "success")

         
          if (role === "admin") {
            navigate("/admin/dashboard")
          } else {
            navigate("/")
          }
        }
      })
      .catch(error => {
        console.error("error", error)
        const errorMsg = error.response?.data?.message || "Invalid email or password."
        window.toastify(errorMsg, "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth p-4'>
      <div className="card p-3 p-md-4">
        <Title level={2} className='text-center mb-4 text-primary'>Login</Title>
        <Form layout='vertical' onSubmitCapture={handleSubmit}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Item label="Email" required>
                <Input 
                  type="email" 
                  size='large' 
                  placeholder='Enter your email address' 
                  name='email' 
                  value={state.email}
                  onChange={handleChange} 
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item label="Password" required>
                <Input.Password 
                  size='large' 
                  placeholder='Enter your password' 
                  name='password' 
                  value={state.password}
                  onChange={handleChange} 
                />
              </Item>
            </Col>

            <Col span={24} className="text-end mb-2">
              <Link to="/auth/forgot-password" className="auth-link font-weight-normal" style={{ fontSize: '13px' }}>
                Forgot Password?
              </Link>
            </Col>

            <Col span={24} className="mt-2">
              <Button 
                type='primary' 
                block 
                htmlType='submit' 
                size='large'
                loading={isProcessing}
                className="btn-submit"
              >
                Login
              </Button>
            </Col>

            <Col span={24} className="text-center mt-3">
              <p className="mb-0 text-muted">
                Don't have an account?{' '}
                <Link to="/auth/register" className="auth-link">
                  Register here
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default Login