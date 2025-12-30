import React , {useState} from 'react'
import './TrackingOrder.css'

export default function TrackingOrder() {

      const [currentStage, setCurrentStage] = useState(4); // 0–3
    
      const stages = [
        {stageName:'Ordered', stageGif:'orderedGif.gif',message:'Your order has been successfully placed.'},
        {stageName:'Packed', stageGif:'packedGif.gif',message:'Your order has been packaged and is ready for shipment.'},
        {stageName:'Shipped', stageGif:'shippedGif3.gif',message:'Your package has been dispatched and is in transit.'},
        {stageName:'En-route', stageGif:'OutforGif.gif',message:'Your package is out for delivery.'},
        {stageName:'Delivered', stageGif:'deliveredGif.gif',message:'Your order has been delivered.'}
        ];
    
      // Each gap between circles is 1 segment (total 3 segments)
      const progressPercent = (currentStage / (stages.length - 1)) * 100;

  return (
    <div className='order-tracking-div'>
        <div className='tracking-head-div'>This is the current status of your previous order.</div>
        <div  className='order-tracking-content'>
              <div className='trackGif-container'>
                <div className='trackGif-div'>
                    <img className='trackGif' src={`SiteGif/${stages[currentStage].stageGif}`}/>
                </div>
                <div className='order-message-div' >{stages[currentStage].message}</div>
              </div>
           <div className='tracking-div'>
    <div className='tracking-path-div'>
      <div id='tracking-path' className='empty-path'></div>
      <div id='tracking-path' className='filled-path' style={
    innerWidth > 500
      ? { width: `${currentStage * 25}%`, height: "100%" }
      : { height: `${currentStage * 25}%`, width: "100%" }
  }></div>
    </div>
    <div className='stage-div-container'>
      {stages.map((item,i)=><div className='stage-div'
       style={{backgroundColor:currentStage>=i?'rgb(80,220,220)':'rgb(210, 210, 210)'}}>
        <div className='stage-name' 
             style={{color:currentStage>=i?'rgba(0, 0, 0, 1)':'rgb(190, 190, 190)'}}>
            {item.stageName}
        </div>

         <div className='stage-name-Ph' 
             style={{color:currentStage>=i?'rgba(0, 0, 0, 1)':'rgb(190, 190, 190)',
                fontSize:currentStage===i? '1.2rem':'1rem'
             }}>
                     
            {item.stageName}
        </div>

         {/* {currentStage===i && <div className='trackGif-div'>
            <img className='trackGif' src={`SiteGif/${item.stageGif}`}/>
        </div>} */}

       
       
            </div>)}
        
            
      
       
    </div>


 
  </div>
        </div>
        


   
    </div>
  )
}
