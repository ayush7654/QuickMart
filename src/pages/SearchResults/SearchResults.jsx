import {useState, useEffect} from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import ProductCard from "../../components/ProductCard";
import './SearchResults.css'

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
/*     <ProductCard
      key={product.id}
      id={product.id}
      images={product.images}
      title={product.title}
      price={product.price}
     
  /> */
  <Link to={`/store/${product.id}`} className='search-product'>
    <div className='search-product-Img'>
      <img src={product.images[0]} width='200px'/>
    </div>
    <div className='search-product-Info'>
      <div className='search-product-Title'>{product.title}</div>
      <div className='search-product-Price'>Price: ${product.price}</div>
      <div className='search-product-stocks'>Stocks left: {product.stock}</div>
    </div>
  </Link>
  )):<div>Loading..</div>
  return (<div className='searchResult-page'>
     <div className='search-result-num'>{productElements.length} products found for "{product}"</div>
     <div className='search-result-list'>                      
      
        {productElements}
    </div>
  </div>
   
  )
}
