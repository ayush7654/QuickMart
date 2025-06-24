import React from 'react'
import './ExploreCategories.css'

export default function ExploreCategories() {
  return (
     <div className="explore-categories">
              <div className="explore-categories-head-div"><div className="explore-categories-head" >Browse Collections - <span className='explore-tagline'> &nbsp; Not Your Everyday Picks</span></div></div>
              <div className="explore-categories-list-container">
                <div className="explore-categories-list">
                  <div id="explore-card-div" >
              <div className='exploreCard1' id='exploreCard'></div>
              <span id="explore-card-name">FITNESS</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard2' id='exploreCard'> </div>
              <span id="explore-card-name">GREEN CHOICES</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard3' id='exploreCard'> </div>
              <span id="explore-card-name">HEALTH TECH</span>
             </div>
             <div id="explore-card-div" >
              <div className='exploreCard4' id='exploreCard'> </div>
              <span id="explore-card-name">PET WELLNESS</span>
             </div>
                </div>
             
            
         
              </div>
             </div>
  )
}
