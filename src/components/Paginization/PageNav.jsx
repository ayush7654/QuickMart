import {useState} from 'react'

export default function PageNav({getPagesStyle,handlePage,pageArray}) {
  //const [PageNavArr,setPageNavArr]= useState([1,2,3,4,5,6,7,8,9,10])
  return (<>
   {pageArray.map((num) => {
        return (
          <div
            className="page-nav"
            style={getPagesStyle(num)}
            key={num}
            onClick={() => handlePage(num)}
          >
            {num}
          </div>
        );
      })}</>
   
  )
}
