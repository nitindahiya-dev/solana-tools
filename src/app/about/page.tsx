import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import About from '@/components/ui/About'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center flex-col max-w-7xl mx-auto ">
    <Navbar />
    <About />
    <Footer />
    </div>
  )
}

export default page
