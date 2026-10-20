import React from 'react'
import './SiteMenu.css'

const siteNavArray = [
    {}
]

export default function SiteMenu() {
  return (
    <div className='site-menu'>
        <div className="site-menu-content">
                  <div className="site-menu-nav-wrapper">
               <span className='site-menu-nav'>Our shop</span>
        <span className='site-menu-nav'>Campaign</span>
        <span className='site-menu-nav'>About us</span>
        <span className='site-menu-nav'>Contact</span>
        <span className='site-menu-nav'>Publication</span>
        <span className='site-menu-nav'>Sale</span>
        </div>

        <div className="site-menu-grid-wrapper">
            <div className="site-menu-img-wrapper">1</div>
            <div className="site-menu-img-wrapper">2</div>
            <div className="site-menu-img-wrapper">3</div>

        </div>
        </div>
  
     
    </div>
  )
}
