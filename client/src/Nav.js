import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navbar'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/technicians'>Technicians</Link></li>
            <li><Link to='/projects'>Projects</Link></li>
            <li><Link to='/specializations'>Specializations</Link></li>
        </ul>
    </nav>
  )
}

export default Nav