import { useState, useEffect , useMemo} from 'react';
import TransitionLink from '../TransitionLink';
import { useDelayedNavigate } from '../useDelayedNavigate';
import { TrendingUp } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { X } from 'lucide-react';
import './SearchPage.css';



const collections = [
{name:'Curated Threads',img:'clothing-collection7.jpg', path:''},
   {name:'The Fitness Hub',img:'fitness-collection6.jpg', path:''}, 
    {name:'The UV Shield Collection',img:'solar-collection2.jpg', path:''},
   
  {name:'Pampered Paws',img:'pet-collection.jpg', path:''},
  
  {name:'The Apple Experience',img:'apple-collection4.jpg', path:''},

]

const suggestionPlaceholder = [
  {name:'Home Decor',slug:''},
  {name:'Fitness',slug:''},
  {name:'Dresses',slug:''},
  {name:'Laptops',slug:''},
  {name:'Fragrances',slug:''},
  {name:'Mens Watch' ,slug:''},
  {name:'Bike',slug:''},
  {name:'Kitchen Accessories',slug:''},
  {name:'Women Bags',slug:''},
  {name:'Sunglasses',slug:''},
]

export default function SearchPage({ currentToggle, toggleSwitch, toggleOverlay , closePanel , currentPanel }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const[products,setProducts] = useState()



    const delayedNavigate = useDelayedNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  
  };

  const handleCategoryClick = (name, slug) => {
    setSearchTerm(name);
   
  delayedNavigate (`store?type=${slug}`);
   closePanel();
  };

  const handleProductClick = (id) =>{
    
  delayedNavigate (`store/${id}`);
    handleCloseSearchBar();
  }

  const handleCloseSearchBar = () => {
    toggleSwitch(false);
    toggleOverlay(false);
    setSearchTerm('');
  };

function filterAndRankByTitle(list, query) {
  if (!query) return list; // return everything if query is empty

  const lowerQuery = query.toLowerCase();

const filtered = list.filter(item =>
  item.title.toLowerCase().startsWith(lowerQuery)
);

const results = filtered.length > 0
  ? filtered
  : list.filter(item =>
      item.title.toLowerCase().includes(lowerQuery)
    );
  // 2️⃣ Sort by how early the query appears in the title
  const ranked = results.sort((a, b) => {
    const indexA = a.title.toLowerCase().indexOf(lowerQuery);
    const indexB = b.title.toLowerCase().indexOf(lowerQuery);
    return indexA - indexB;
  });

  return ranked;
}

function getHighlightedText(text, highlight) {
  if (!highlight) return text;

  const lowerText = text.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();
  const index = lowerText.indexOf(lowerHighlight);

  // If not found, return the plain text
  if (index === -1) return text;

  // Split into before, match, after (only the first match)
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {before}
      <span style={{ color: 'rgb(0,100,255)', fontWeight: 400 }}>{match}</span>
      {after}
    </>
  );
}






 // Fetch categories ONCE on mount
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const result = await response.json();

      setSuggestions(result);
    } catch (er) {
      console.error(er);
    }
  };
  fetchCategories();
}, []); // Empty array = run only once

// Fetch products ONCE on mount
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0');
      const result = await response.json();
      setProducts(result.products);
    } catch (er) {
      console.error(er);
    }
  };
  fetchProducts();
}, []); // Empty array = run only once

  const suggestionComp = suggestions
    ? suggestions.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : null;


const productsComp = useMemo(() => {
  return products ? filterAndRankByTitle(products, searchTerm) : [];
}, [products, searchTerm]);




  

  
  return (
    <div className='search-page-wrapper'>


  <div className="search-input-wrapper">
    


      <div className="search-input">
        <input
          type="text"
          className="header-search-box"
          placeholder="Search (craete search result page which opens with enter button)"
          value={searchTerm}
          onChange={handleChange}
          autoFocus
        />
        <span className='cancel-search' onClick={closePanel} ><X strokeWidth={1.5}/></span>
      </div>
    </div>

      


<div className="search-panel-suggestion-wrapper">

          <div className="search-panel-suggestion">

          <div className="advanced-search-wrapper">
            <h2>Advanced Search</h2>
            <div className="search-pills-wrapper">
              {searchTerm && suggestionComp.length>0?
               suggestionComp.map((item) => (
           
                <div   onClick={() => handleCategoryClick(item.name, item.slug)} className='category-suggestion'>{item.name}</div>
         
            )):
              
            suggestionPlaceholder.map((item) => (
           
                <div   onClick={() => handleCategoryClick(item.name, item.slug)} className='category-suggestion'>{item.name}</div>
         
            ))

              }
   
            </div>
     
          </div>
          {searchTerm && <div className="search-result-products">
              <span className='result-number'>{productsComp.length} PRODUCTS</span>
              <span className='result-link'>ALL RESULTS <ChevronRight size={15} strokeWidth={2} /> </span>
            </div>}

         {searchTerm? <div className="product-suggestions-wrapper" data-lenis-prevent>
          
          
          <div className="product-suggestions">
              {
            searchTerm &&
            productsComp &&
            productsComp.slice(0,6).map((item) => (
              <div
                onClick={() => handleProductClick(item.id)}
                key={item.name}
                className='suggestion-wrapper'
              >
                <div className='suggestion-image' style={{backgroundImage:`url(${item.images[0]})`}}></div>
                <div className='suggestion'>{getHighlightedText(item.title, searchTerm)}</div>
                <span className="suggestion-arrow"><TrendingUp size={20}/></span>
              </div>
            ))}
          </div>
         

           

          </div>
          :


          <div className="search-collection-wrapper">
           {collections.map((item,index)=>
           <div className='search-colletion' key={index}>
            <div className="search-collection-img">
              <img src={item.img}/>
            </div>
            <div className="search-collection-title">
              {item.name}
            </div>
           </div>)}
          </div>}


          </div>
        </div>
 
     
    </div>
  );
}


 {/*        <div className='searchBar-btn-div'>

            {searchTerm &&   <div
              onClick={() => setSearchTerm('')}
              className='clearSearchBtn-div'

            >
             <IoCloseCircle  className='clearSearchBtn' />
            </div>}
               <div className='searchBar-seachIcon-div'
        
            onClick={handleCloseSearchBar}
          >
            <TransitionLink to={`/search/${searchTerm}`}>
              <Search className='searchIcon' style={{strokeWidth: '1.5' }} />
            </TransitionLink>
          </div>

            </div> */}












