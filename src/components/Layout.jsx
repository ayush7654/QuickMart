import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'


export default function Home(){
    const location = useLocation();
    const isHomePage = location.pathname === '/';
   
   
    return(
    <div  className={`root${isHomePage ? 'home' : 'nothome'}`} style={{position:"relative"}}>
    <Header/>
    <div className='outlet-container'>
    <Outlet />
    </div>
        <Footer />
    </div>
        
    )
}