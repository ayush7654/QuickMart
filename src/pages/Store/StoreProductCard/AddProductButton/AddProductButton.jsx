import React ,{useState} from 'react'
import './AddProductButton.css'
import { Plus,Check } from 'lucide-react';
import { FiTrash2 } from "react-icons/fi";
export default function AddProductButton({isItemInCart }) {

    const [isAdded, setIsAdded] = useState(false);
  return (
    <button 
      className={`minimal-cart-btn ${isItemInCart ||isAdded ? 'added' : ''}`} 
    onClick={() => setIsAdded(!isAdded)} 
      aria-label="Add to cart"
    >
      <div className="icon-wrapper">
        {isItemInCart || isAdded ? (
          <FiTrash2  size={20} strokeWidth={1.5} className="icon-appear" />
        ) : (
          <Plus size={20} strokeWidth={2} className="icon-plus" />
        )}
      </div>
    </button>
  )
}
