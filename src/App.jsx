import './App.css'
import React ,{useState,createContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Store from './pages/Store'
import Cart from './pages/Cart'
import LoginPage from './pages/LoginPage'
import Registration from './pages/Registration'
import ProductDetails from './pages/ProductDetails'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/Layout'
import Authentication from './components/Authentication'
import { FirebaseProvider } from './components/FirebaseContext/Firebase'


export const BreadCrumbContext = createContext()
function App() {
  

const[Breadcrumbs,setbreadcrumbs]= useState([]);

  return (
    <BrowserRouter>
    <FirebaseProvider >
      <BreadCrumbContext.Provider value ={[Breadcrumbs,setbreadcrumbs]}>
    <Routes>
      <Route element = {<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/store/:id" element={<ProductDetails/>}/>
      <Route element={<Authentication/>}>
       <Route path="/cart" element={<Cart/>}/>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<Registration/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
      
    </Routes>
     </BreadCrumbContext.Provider>
    </FirebaseProvider>
    </BrowserRouter>
  )
}

export default App
