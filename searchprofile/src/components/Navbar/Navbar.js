import React, { Component } from 'react';
import { HomeItems} from './HomeItems'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <nav className='NavbarItems'>
                <h1 className='navbar-logo'>RITO.GG<i className='fab fa-react'></i></h1>
                <div className='menu-icon'>
                    
                </div>
                <ul>
                    {HomeItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar