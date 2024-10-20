import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center flex-col max-w-7xl mx-auto ">
    <Navbar />
    <Contact />
    <Footer />
    </div>
  )
}

export default page
