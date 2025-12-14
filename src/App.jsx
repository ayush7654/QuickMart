import './App.css'
import React ,{useState,createContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import Home from './pages/Home/Home'

import Store from './pages/Store/Store'
import Cart from './pages/Cart/Cart'
import Account from './pages/Account/Account'
import Registration from './pages/Account/Registration/Registration'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/Layout'
import Authentication from './components/Authentication'
import { FirebaseProvider } from './components/FirebaseContext/Firebase'
import WinScrollProvider from "./components/WinScrollProvider/WinScrollProvider";
import LoadingBird from './pages/LoadingPage';
import Testing from './components/Testing/Testing';


export const BreadCrumbContext = createContext()
function App() {
  



  return (
    <BrowserRouter>
    <WinScrollProvider>
    <FirebaseProvider >
    <ScrollToTop />
    <Routes>
      <Route element = {<Layout/>}>
      <Route path="/" element={<Home/>}/>
      
      <Route path="/store" element={<Store/>}/>
      <Route path="/store/:id" element={<ProductDetails/>}/>
      <Route path="/search/:product" element={<SearchResults/>}/>
      <Route element={<Authentication/>}>
       <Route path="/cart" element={<Cart/>}/>
       </Route>
      <Route path="/login" element={<Account/>}/>
      <Route path="/register" element={<Registration/>}/>
       <Route path="/testing" element={<Testing/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
      
    </Routes>
  
    </FirebaseProvider>
    </WinScrollProvider>
    </BrowserRouter>
  )
}

export default App
