import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className='bg-blue-950 text-white flex items-center justify-center px-4 h-16'>
        <p className='text-center'>Copyright &copy; {currentYear} Get Me A Chai - All rights reserved</p>

      </footer>
    </div>
  )
}

export default Footer
