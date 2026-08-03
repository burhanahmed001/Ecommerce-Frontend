import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'
import { Spin } from 'antd'

const PrivateRoute = ({ Component }) => {
  const { isAuth, isAppLoading } = useAuth()

 
  if (isAppLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

 
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />
  }


  return <Component />
}

export default PrivateRoute