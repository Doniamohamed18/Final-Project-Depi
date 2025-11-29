import React from 'react'
import Navbar from '../components/Navbar'
import OrderStatus from './OrderStatus'
import Footer from '../components/Footer/Footer'
import "./Account.css"

function AllAccount() {
  return (
    <div>
        <Navbar/>
        <OrderStatus/>
        <Footer/>
    </div>
  )
}

export default AllAccount