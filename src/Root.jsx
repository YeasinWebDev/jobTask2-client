import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Component/Nav'

function Root() {
    return (
        <div>
            <Nav/>
            <Outlet />
        </div>
    )
}

export default Root