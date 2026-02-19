import React ,{useState} from 'react'
import './ExploreCategories.css'

export default function ExploreCategories() {


const [collections,setCOllections] = useState([
   {name:'FITNESS',img1:'/ExploreImgs/Browse-Fitness.jpg',img2:''},
   {name:'STYLE',img1:'/ExploreImgs/Browse-Style.jpg',img2:''},
   {name:'LUXURY',img1:'/ExploreImgs/Browse-Luxury.jpg',img2:''},
])

  return (
     <div className="explore-categories">

          <div className='home-heading'>The 2026 Lifestyle Trilogy</div>

              <div className="explore-categories-list-container">

               {collections.map((item,index)=>
               <div key={index} id="explore-card-div" >
              <div  id='exploreCard' style={{ backgroundImage: `url(${item.img1})` }}> </div>
                   <div id="explore-card-name-div" >
                <span id="explore-card-name1">{item.name}</span>
                <span id="explore-card-name2">{item.name}</span>
                <span id="explore-card-name3">{item.name}</span>
                </div>
             </div>
            
            )}
  
    
              </div>
             </div>
  )
}



/*        <div id="explore-card-div" >
              <div className='exploreCard1' id='exploreCard'></div>
              <span id="explore-card-name" >FITNESS</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard2' id='exploreCard'> </div>
              <span id="explore-card-name">STYLE</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard3' id='exploreCard'> </div>
              <span id="explore-card-name">HEALTH TECH</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard4' id='exploreCard'> </div>
              <span id="explore-card-name">PET CARE</span>
             </div> */