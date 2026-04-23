import { useState, useEffect } from "react"

export default function Orders() {
  const [data, setData] = useState('')

  useEffect(() => {
    if (!window.electronAPI) return
    window.electronAPI.receiveData((response) => {
      setData(response)
      console.log('Received from main:', response)
    })
  }, [])

  function handleSubmit() {
    window.electronAPI?.sendToMain('Hello from Orders page!')
  }

  return (
    <main className='pt-24 px-6 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold text-gray-800'>Orders</h2>
      <p className='text-gray-500 mt-2'>Track and manage your orders here.</p>
      <button onClick={handleSubmit} className='mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700'>
        Send data to main
      </button>
      {data && <p className="mt-4 text-green-600">Data from main: {data}</p>}
    </main>
  )
}
