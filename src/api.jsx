export  async function getItems(skip,limit,sort,sortOrder){
    const res = await fetch(`https://dummyjson.com/products?skip=${skip===1?0:(skip - 1) * limit}&limit=${limit}&sortBy=${sort}&order=${sortOrder}` )
    if(!res.ok){
        throw{
            message:"There was an error",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return(
        data.products
    )
}

export  async function getFilteredItems(category){
    const res = await fetch(`https://dummyjson.com/products/category/${category}` )
    if(!res.ok){
        throw{
            message:"There was an error",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
   
    return(
       data.products
    )
}


export async function getProductById(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) {
        throw {
            message: `Could not find product with ID: ${id}`,
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data // This returns the single product object
}