export default function Hero() {
  return (
    <section className='bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20 px-6'>
      <div className='max-w-7xl mx-auto flex flex-col items-center text-center gap-6'>
        <span className='bg-cyan-500/20 text-cyan-400 text-sm font-medium px-4 py-1 rounded-full'>
          Inventory Management System
        </span>
        <h2 className='text-5xl font-bold leading-tight'>
          Manage Your <span className='text-cyan-400'>Inventory</span> <br /> With Ease
        </h2>
        <p className='text-gray-400 text-lg max-w-xl'>
          Track products, manage orders, and generate reports — all in one place.
        </p>
        <div className='flex gap-4 mt-2'>
          <button className='bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
            Get Started
          </button>
          <button className='border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 px-6 py-3 rounded-lg font-medium transition-colors'>
            View Reports
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-8 mt-10 w-full max-w-2xl'>
          {[
            { label: 'Total Products', value: '1,240' },
            { label: 'Orders Today', value: '38' },
            { label: 'Low Stock', value: '12' },
          ].map(({ label, value }) => (
            <div key={label} className='bg-gray-800 rounded-xl p-4 border border-gray-700'>
              <p className='text-3xl font-bold text-cyan-400'>{value}</p>
              <p className='text-gray-400 text-sm mt-1'>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
