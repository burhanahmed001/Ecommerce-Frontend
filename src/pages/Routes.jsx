import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from '@/components/PageNotFound'


import Frontend from './Frontend'  
import Auth from './Auth'          
import Admin from './Admin'        

const Index = () => {
  return (
    <Routes>
  
      <Route path='/*' element={<Frontend />} />   
      <Route path='/auth/*' element={<Auth />} /> 
      <Route path='/admin/*' element={<Admin />} /> 
      <Route path='*' element={<PageNotFound />} /> 
    </Routes>
  )
}

export default Index