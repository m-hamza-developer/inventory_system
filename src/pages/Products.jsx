import { useState, useEffect } from 'react'

export default function Products() {
  const [data, setData] = useState('')

  useEffect(() => {
    if (!window.electronAPI) return
    window.electronAPI.receiveData((response) => {
      setData(response)
      console.log('Received from main:', response)
    })
  }, [])

  function handleSubmit() {
    window.electronAPI?.sendToMain('Hello from Products page!')
  }

  return (
    <main className='pt-24 px-6 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold text-purple-600 italic'>Products</h2>
      <p className='text-gray-500 mt-2'>Manage your product inventory here.</p>
      <button onClick={handleSubmit} className='mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'>
        Send text to main
      </button>
      {data && <p className='mt-4 text-green-600'>{data}</p>}
    </main>
  )
}
