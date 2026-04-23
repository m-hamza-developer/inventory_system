import { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Reports from './pages/Reports'
import './App.css'

function AppContent() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.electronAPI) return
    window.electronAPI.onNavigate((path) => navigate(path))
  }, [navigate])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
