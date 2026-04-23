import { NavLink } from 'react-router-dom'

export default function Header() {
  const zoomIn = () => window.electronAPI?.zoomIn()
  const zoomOut = () => window.electronAPI?.zoomOut()

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg' style={{WebkitAppRegion: 'drag'}}>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold text-cyan-400'>Inventory MS</h1>
        <nav className='flex gap-6 items-center' style={{WebkitAppRegion: 'no-drag'}}>
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/products', label: 'Products' },
            { to: '/orders', label: 'Orders' },
            { to: '/reports', label: 'Reports' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-cyan-400 ${isActive ? 'text-cyan-400 underline underline-offset-4' : 'text-gray-300'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <button onClick={zoomIn} className='text-gray-300 hover:text-cyan-400 text-lg font-bold px-2'>A+</button>
          <button onClick={zoomOut} className='text-gray-300 hover:text-cyan-400 text-lg font-bold px-2'>A-</button>
        </nav>
      </div>
    </header>
  )
}
