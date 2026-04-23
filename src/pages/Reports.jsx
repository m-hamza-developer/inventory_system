import { useEffect, useState } from "react"

export default function Reports() {

  const [data, setData] = useState('')

    useEffect(() => {
      if (!window.electronAPI) return
      window.electronAPI.receiveData((response) => {
        setData(response)
        console.log('Received from main:', response)
      })
    }, [])
  
  function handleSubmit() {
    window.electronAPI?.sendToMain('Hello from Reports page!') 
  }

  return (
    <main className='pt-24 px-6 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold text-gray-800'>Reports</h2>
      <p className='text-gray-500 mt-2'>View and generate inventory reports here.</p>
      <button onClick={handleSubmit} className='mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900'>
        Send data to main
      </button>
      {data && <p className="mt-4 text-green-600">Data from main: {data}</p>}
    </main>
  )
}
