import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TermsAndConditions from '@/components/TermAndConditions'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center flex-col max-w-7xl mx-auto ">
    <Navbar />
    <TermsAndConditions />
    <Footer />
    </div>
  )
}

export default page
