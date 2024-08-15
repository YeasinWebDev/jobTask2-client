import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Component/Nav'
import Footer from './Component/Footer'

function Root() {
    return (
        <div>
            <Nav/>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Root