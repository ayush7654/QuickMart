import React from "react";
import {Link} from 'react-router-dom'
export default function ErrorPage(){
    return(<>
    <h1>Error 404</h1>
    <div>This page does not  exist</div>
    <Link to={"./"}>Back to Home</Link>
    
    </>
        
    )
}