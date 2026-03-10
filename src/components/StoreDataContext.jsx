import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { WinScrollContext } from './WinScrollProvider/WinScrollProvider';// Assuming path

const StoreDataContext = createContext();

export const StoreDataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. UI & Scroll States
  const { isAtTop } = useContext(WinScrollContext);
  const storeOverlayActive = false; // Constant as per your snippet

  // 2. Filter & Category States
  // Initialize from URL params so refresh doesn't lose data
  const [currentCategory, setcurrentCategory] = useState(searchParams.get("type") || '');
  const typeFilter = searchParams.get("type");

  // 3. Sorting States
  const [currentSort, setCurrentSort] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Added missing state

  // --- Handlers ---

  const handleSort = (e) => {
    // Toggles sort off if clicking the same one, otherwise sets new
    setCurrentSort(prev => prev?.name === e.name ? null : e);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleTypeFilter = (category) => {
    setcurrentCategory(category);
    setSearchParams({ type: category });
  };

  const handleCancelTypeFilter = () => {
    setcurrentCategory('');
    setSearchParams({}); // Clear params
    navigate('/store');
  };

  // Sync state if URL changes externally (e.g., back button)
/*   useEffect(() => {
    const type = searchParams.get("type");
    if (type !== currentCategory) {
      setcurrentCategory(type || '');
    }
  }, [searchParams]); */

  const value = {
    isAtTop,
    currentSort,
    setCurrentSort,
    sortOrder,
    setSortOrder,
    currentCategory,
    typeFilter,
    storeOverlayActive,
    handleSort,
    toggleSortOrder,
    handleTypeFilter,
    handleCancelTypeFilter
  };

  return (
    <StoreDataContext.Provider value={value}>
      {children}
    </StoreDataContext.Provider>
  );
};

// Custom Hook for easy access
export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) throw new Error("useStoreData must be used within StoreDataProvider");
  return context;
};