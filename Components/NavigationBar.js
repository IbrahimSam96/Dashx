import Link from 'next/link'
import { useRouter } from 'next/router'
import {useState} from "react"
import { firebaseClient } from "../FirebaseIntialization";


const Navbar = (props) => { 

const router = useRouter();


return (

<div className="Navbar">


    <div className="FinancialCharts">

    <Link className="NavLink" href= "/FinancialCharts"> 
    <div className="hodl" 
    style={{ width:'100%', height:"75px", color:"white",
     backgroundColor:"transparent", display:"grid",
      gridTemplateColumns:"repeat(2, 1fr)", 
      gridTemplateRows:"repeat(1, 75px)"}} >
    <span style={{gridColumn:"1/3", gridRow:"1/1", fontSize:"1.2rem", paddingTop:"25px", paddingLeft:"25px", fontFamily:"'Trebuchet MS',  Arial, sans-serif", cursor:"pointer" }}>Financial Charts</span>

    </div>
    </Link> 

    </div>

    
    <div className="Dashboards">

    <Link className="NavLink" href= "/Dashboards"> 
    <div className="hodl" 
    style={{ width:'100%', height:"75px", color:"white",
     backgroundColor:"transparent", display:"grid",
      gridTemplateColumns:"repeat(2, 1fr)", 
      gridTemplateRows:"repeat(1, 75px)"}} >
    <span style={{gridColumn:"1/3", gridRow:"1/1", fontSize:"1.2rem", paddingTop:"25px", paddingLeft:"25px", fontFamily:"'Trebuchet MS',  Arial, sans-serif", cursor:"pointer" }}>Dashboards</span>

    </div>
    </Link> 


    </div>
    
    
    <div className="Reports">

    <Link className="NavLink" href= "/Reports"> 
    <div className="hodl" 
    style={{ width:'100%', height:"75px", color:"white",
     backgroundColor:"transparent", display:"grid",
      gridTemplateColumns:"repeat(2, 1fr)", 
      gridTemplateRows:"repeat(1, 75px)"}} >
    <span style={{gridColumn:"1/3", gridRow:"1/1", fontSize:"1.2rem", paddingTop:"25px", paddingLeft:"25px", fontFamily:"'Trebuchet MS',  Arial, sans-serif", cursor:"pointer" }}>Reports</span>

    </div>
    </Link> 
    </div>


{props.email ?
// User Layout
<div className="UserAccount">

  <span className="email" style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}>
  {props.email} 
  </span>

  <div className="emailTooltip">
  
   <button
   className="SignOutButton"
   style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}
        onClick={async () => {
          await firebaseClient
            .auth()
            .signOut()
            .then(() => {
              router.push("/");
            });
        }}
      >
        Sign out
      </button> 

      <Link  href= "/Profile"> 
      <span className="ProfileLink" style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}>
        Profile
      </span> 
      </Link> 
      <Link  href= "/Create"> 
      <span className="CreateLink " style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}>
        Create
      </span>
      </Link> 

      </div>

    </div>
   :

  //  Non-User Layout
   <div className="Anonymous ">

   <Link  href="/signup"> 
   <a style={{width:"100%", height:"50%", maxWidth:"80px" }} >
  <span className="SignUp" style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}>
  Sign Up
  </span>
  </a>
  </Link> 

  <Link href="login"> 
  <a style={{width:"100%", height:"50%", maxWidth:"80px"}} >
  <span className="LogIn" style={{fontFamily:"'Trebuchet MS',  Arial, sans-serif" , color:"white",fontSize:"1.2rem" }}>
  Log In
  </span> 
  </a>
  </Link> 

     </div>

 }
   

    </div>

    )
}

export default Navbar
