import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "./FirebaseContext/Firebase";
import { useCallback } from "react";
const CartListContext = createContext(null);

export const CartListProvider = ({ children }) => {
  const firebase = useFirebase();

  const userInfo = firebase.isLoggedIn
    ? firebase.currentUser.email
    : null;

  const [cartList, setCartList] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  const fetchCartData = async () => {
    if (!userInfo) {
      setCartList([]);
      setCartLoading(false);
      return;
    }

    setCartLoading(true);
    try {
      const cartItem = await firebase.getDataFromFB(
        "users",
        userInfo,
        "CartItems"
      );

      const items = [];
      cartItem.forEach(item => {
        items.push(item.data().Product);
      });

      setCartList(items);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userInfo]);

  const handleRemove = async (productTitle) => {
   
     // Optimistically update the state
     setCartList(prevCartList => prevCartList.filter(product => product.title !== productTitle));
    
     // Delete product from Firestore
    await firebase.deleteDataInFB("users", userInfo, "CartItems", productTitle);

};

const updateDataBase = useCallback(
  async (productTitle, quantity) => {
    const productInfo = {
      title: productTitle,
      quantity
    };

    await firebase.storeDataInFB(
      "users",
      userInfo,
      "CartItems",
      productTitle,
      productInfo
    );
  },
  [firebase, userInfo]
);


  return (
    <CartListContext.Provider
      value={{
        cartList,
        cartLoading,
        handleRemove,
        updateDataBase,
        refetchCart: fetchCartData
      }}
    >
      {children}
    </CartListContext.Provider>
  );
};


export const useCartList = () => {
  const context = useContext(CartListContext);
  if (!context) {
    throw new Error("useCartList must be used inside CartListProvider");
  }
  return context;
};
