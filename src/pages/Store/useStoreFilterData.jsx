
import { useState} from "react";

export default function useStoreFilterData() {
  const [storeFilters, setStoreFilters] = useState([
    { name: "In Stock", filter: "availabilityStatus", state: false },
    { name: "Warranty", filter: "warrantyInformation", state: false },
    { name: "Return Policy", filter: "returnPolicy", state: false },
    { name: "Fast Shipping", filter: "shippingInformation", state: false },
    { name: "Limited Stock", filter: "stock", state: false },
      { name: "Latest Offers", filter: "discountPercentage", state: false },
       { name: "Best Sellers", filter: "rating", state: false },
    { name: "COD Available", filter: "minimumOrderQuantity", state: false },
   
  ]);



  const filterLogicMap = {
    availabilityStatus: value => value === "In Stock",
    warrantyInformation: value => /\d/.test(value),
    returnPolicy: value => /\d/.test(value),
      shippingInformation: value =>
    typeof value === "string" && value.toLowerCase().includes("days"),

  stock: value =>
    typeof value === "number" && value < 50,

  discountPercentage: value =>
    typeof value === "number" && value < 20,

  rating: value =>
    typeof value === "number" && value > 3.5,

  minimumOrderQuantity: value =>
    typeof value === "number" && value > 20,
  };



 

  return {
    storeFilters,
    setStoreFilters,
    filterLogicMap
  
  };
}
