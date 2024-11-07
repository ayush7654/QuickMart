import {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ProductCard from "../components/ProductCard";


export default function SearchResults() {
  const[productList,setproductList]= useState([])
 

  const {product} = useParams()
  
  useEffect(()=>{
    const fetchList=async()=>{
        try{
       const response = await fetch(`https://dummyjson.com/products/search?q=${product}`)

       const data = await response.json()
       console.log(data)
       setproductList(data.products)
        }
        catch(error){
            console.error(error)
        }
    }
    fetchList()
  },[product])
  const productElements = productList ? productList.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      images={product.images}
      title={product.title}
 
      price={product.price}
     
  />
  )):<div>Loading..</div>
  return (<div>
     <div style={{fontSize:'18px', padding:'10px',marginLeft:'20px'}}>{productElements.length} products found for "{product}"</div>
     <div className='search-result-list'>
      
        {productElements}
    </div>
  </div>
   
  )
}
