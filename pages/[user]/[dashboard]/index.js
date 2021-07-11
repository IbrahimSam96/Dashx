import { firebaseAdmin } from "../../../FirebaseAdmin";

import {React, useEffect, useRef, useState} from "react"
import nookies from "nookies";
import moment from 'moment';

import ViewGraph from "../../../Components/viewGraph";

import ViewTextBox from "../../../Components/viewText";


export const getServerSideProps = async (context) => {

    try{

        const db = firebaseAdmin.firestore(); 
        const usersRef = db.collection("Users");

    const cookies = nookies.get(context);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;


    const route1 = context.query.user
    const route2 = context.query.dashboard

    const Dashboards = [];
    const userDashboards = db.collection("Users").doc(context.query.user).collection("Dashboard");

    await userDashboards.get().then((snapchot) => {
                
        snapchot.forEach((obj) => {

            if(obj.exists){

                Dashboards.push( obj.id.toString() )
    
                console.log(obj.id)

                }
        })

        }) 

    const dashboardexists = Dashboards.includes( context.query.dashboard.toString() )


    const Graphs = [] 


    const Texts = [] 

    const Layout = []

    const  graphRef =  db.collection("Users").doc(context.query.user).collection("Dashboard").doc(context.query.dashboard).collection("Graphs");
                   
    const  textRef =  db.collection("Users").doc(context.query.user).collection("Dashboard").doc(context.query.dashboard).collection("Text");
                
    const  layoutRef =  db.collection("Users").doc(context.query.user).collection("Dashboard").doc(context.query.dashboard);


    await graphRef.get().then((snapshot) => {

        snapshot.forEach((obj) => { 

            if(obj.exists){
            Graphs.push( obj.data() )
            console.log(obj.data() )
            }
        })
    })


await textRef.get().then((snapshot) => {
        snapshot.forEach((obj) => { 
            if(obj.exists){
            Texts.push( obj.data() )


            }
        })
    })

// Firestore timestamp 
 await layoutRef.get().then((doc) => {
        if(doc.exists) {
            Layout.push(JSON.stringify(doc.data() ) ) 
                console.log( doc.data() )
                         
                         }
    })

    return {
        props: {  
             token, 
             email,
             uid,
             route1,
             route2,
             Graphs,
             Texts,
             Layout,
             dashboardexists,
         }
      };

    }catch (err) {
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      return { 
                
        props: {
           
        },
      };
    }




}

const Dashboard2 = (props) => {

    console.log(props.route1 , props.route2)
    console.log(props.Graphs, props.Texts, props.Layout )
    console.log(props.dashboardexists)

    const layout = JSON.parse(props.Layout)

    const createdDate = new Date(layout.date._seconds * 1000)
    
    console.log(moment(createdDate).fromNow())

    return(
    
    <>
      {props.dashboardexists? 
      
    <div className="PublicDashboardPage">

<div className="PublicDashboardPage1">

<div className="PublicDashboardPage2">

<div className="PublicDashboardPage3" style={{
    backgroundColor:`${layout.backgroundColor}`,
    width:`${layout.width}px`,
    height: `${layout.height}px`,
    borderColor:`${layout.borderColor}`
}} >


{ props.Graphs.map( (si, k) => (
      
      <>
             <ViewGraph
                key={k}
                 type={si.type} title={si.title} seriestitle={si.seriestitle}
                 legend={si.legend} xAxis={si.xAxis} 
                 yAxis={si.yAxis}    
                 color={si.color}
                 tooltipcolor={si.tooltipcolor}
                 tooltiptextcolor={si.tooltiptextcolor}
                 axisColor={si.axisColor}
                 gk={si.gk}
                 gs={si.gs}
                 gsc={si.gsc}
                 gec={si.gec}
                 gsr={si.gsr}
                 data={si.data}
                 x={si.x}
                 y={si.y}
                 width={si.width}
                 height={si.height}
                  />
      
                
      </>
           
      
           ))
      }

{ props.Texts.map( (si, k) => (

<> 
   <ViewTextBox key={k}
       text={si.text} 
       textColor={si.textColor}
        bold={si.bold}
        italic={si.italic}
        underline={si.underline}
        justify={si.justify} 
        center={si.center}
        textSize={si.textSize}
        x={si.x}
        y={si.y}
        width={si.width}
        height={si.height}
        />
      
       </>
    
 ))}
      

</div>

</div>


</div>
    </div>
    :
    <>
{/* Dashboard Doesn't exist */}
    </>
    
    }
    </>

            )
}

export default Dashboard2