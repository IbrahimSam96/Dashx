import {useEffect, useRef, useState} from "react"
import Checkbox from '@material-ui/core/Checkbox';


import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AddIcon from '@material-ui/icons/Add';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CloseIcon from '@material-ui/icons/Close';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';

import { AreaChartOutlined, LineChartOutlined, 
  PieChartOutlined, 
  BarChartOutlined, 
 
} from '@ant-design/icons';

import Modal from 'react-bootstrap/Modal';
import _debounce from 'lodash.debounce';
import CreateGraph1 from "../Components/createGraph";


import nookies from "nookies";
import dynamic from "next/dynamic";
import { firebaseAdmin } from "../firebaseAdmin";
import { SettingsPowerOutlined } from "@material-ui/icons";

export const getServerSideProps = async (context) => {
    try {
      const cookies = nookies.get(context);
      console.log(JSON.stringify(cookies, null, 2));
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid, email } = token;
  
      // the user is authenticated!
      // FETCH STUFF HERE
  
      return {
        props: {  email, uid , token},
  
        // redirect: {
        //   permanent: false,
        //   destination: "/create"
        // }
  
      };
    } catch (err) {
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      return {
        props: {} ,
      };
    }
  };


const Create = (props) => {
//Modal
const [show , setShow] = useState(false); 
const [show2 , setShow2] = useState(false); 

const [style, setStyle] = useState(true);

const [display , setDisplay] = useState("column");

const [title , setTitle] = useState("");
const [error, setError] = useState(false);
const [error2, setError2] = useState(false);

const [xAxis, setxAxis] = useState(false); 
const [yAxis, setyAxis] = useState(false); 

const [color, setColor] = useState("#7cb5ec");

const [legend, setLegend] = useState(false); 


  const [data, setData] = useState( 
    new Map( 
    Object.entries({
    datapoint1: "",
    datapoint2: "",
    datapoint3: "",
    datapoint4: ""
  })
  )
  );


  const handleClick = () => {

   const newRows = new Map(data);
   newRows.set(`datapoint${[newRows.size + 1 ]}`, "");
   newRows.set(`datapoint${[newRows.size + 1 ]}`, "");
   setData(newRows)
  };

 
    
  const handleDelete = () => {

    const newRows = new Map(data);

    if(newRows.size === 4){

      setError2(true)
    }
    else {
    newRows.delete(`datapoint${newRows.size}`);
    newRows.delete(`datapoint${newRows.size}`);
    setData(newRows);
    }
  }


  const handleChange = (datapoint) => (event) => {

  const newRows = new Map(data); 

  newRows.set(datapoint, event.target.value);

  setData(newRows)

}



console.log(props.email) 

console.log([...data])


const changecolor = _debounce(() => {

const value = document.getElementById("chartseriescolor").value;


setColor(value)

}, 200) 


    

const recentTrades  = ( 

<>
<Modal 
    backdrop="static"
    show={show}
    style={{opacity:3}}
    onHide={ () => setShow(false) } >

<Modal.Header>

    <AddCircleSharpIcon onClick={() => setShow(false) } 
    style={{color:"#c7c9d3", 
    float:"right"}} />

    <CloseIcon onClick={() => setShow(false) } 
    style={{color:"#c7c9d3", 
    float:"right"}}/>

<input className="inputtitle" 
id="inputtitle"
   type="text" 
   value={title} 
   placeholder="Chart Title" 
   onInput={ (e) => { 
     if(e.target.value.length > 75 ){
      setError(true)
       console.log("too Long 7bb")
       setTitle("")
     }
     else{
      console.log(e.target.value)
      setTitle(e.target.value)
   

     }
   }} />

    </Modal.Header>
   


<Modal.Body>

<BarChartOutlined onClick={() => setDisplay("column") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
    />


<PieChartOutlined  onClick={() => 
setDisplay("pie") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
    />

<LineChartOutlined  onClick={() => setDisplay("line") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
        />

<AreaChartOutlined onClick={() => setDisplay("area") } 
style={{color:"#c7c9d3", 
    float:"right"}}  />


<div className="GraphArea"  id="GraphArea">

  <CreateGraph1 key={[display, title, legend, xAxis, yAxis, color, [...data] ]}
   type={display} title={title} 
   legend={legend} xAxis={xAxis} 
   yAxis={yAxis} 
   color={color}
   data={[...data]}
   /> 

</div>


<span className="GraphOptions" onClick={() =>{ setStyle(true)}}> 
<p> 
  Style
</p>
</span>

<span className="GraphOptions1" onClick={() => {
   setShow2(true)
}}>
<p>
Data
</p>
</span>


{ style? 

<div className="GraphCheckboxes">

<Checkbox
        checked={xAxis}
        onChange={(e) =>{ setxAxis(e.target.checked) }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> xAxis </p>
      
      <Checkbox
        checked={legend}
        onChange={(e) =>{ 
          setLegend(e.target.checked)
        }}

        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> Legend</p>

<br/>
      <Checkbox
        checked={yAxis}
        onChange={(e) =>{ 
          setyAxis(e.target.checked)
        }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> yAxis </p>

<br/>
<br/>

{display !== "pie" ?  
<>
  <input 
      id="chartseriescolor" 
      type="color" 
     defaultValue={color}
      style={{ marginTop:"45px"}}
      title="SeriesColor" 
      onChange={changecolor} 
       />

     <p>Color</p> 

</>
:
null}

</div>

:
null
}

<Modal 
    show={show2}
    style={{opacity:3}}
    onHide={ () => setShow2(false) } >

<Modal.Header bsPrefix="DataBoxheader" >

<span className="DataBoxheader1" onClick={handleClick}> Add Fields </span>

<span className="DataBoxheader2" onClick={handleDelete}> Remove Fields</span>

<CloseIcon onClick={() => setShow2(false) } 
    style={{color:"#c7c9d3", 
    float:"right"}}/>

</Modal.Header>

<Modal.Body  bsPrefix="DataBoxbody" >

<div className="DataBoxbody1" >

      {[...data.keys()].map((datapoint) => {
        return (
          <input
          className="inputboxes"
            key={datapoint}
            onChange={handleChange(datapoint)}
          />
        );
      })}

</div>


</Modal.Body>

</Modal>


</Modal.Body>

  </Modal>

  </>

    );


return (

<div className="createPage" >

<div className="WorkSpace" id="WorkSpace">

</div>
      
<div className="designBar" id="designBar">


<span className="designBar1" >
Layout 
<AspectRatioIcon onClick={() => {
const  div =  document.getElementById("designBar1Options"); 

      if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
}}/>

</span>


<span id="designBar1Options" >

<CloseIcon onClick={() => {
const  div =  document.getElementById("designBar1Options");
        div.style.display = 'none';
}} style={{color:"#c7c9d3", float:"right"}}/>

<br/>
<br/>

<p>Background Color</p>

<input 
        id="backgroundColorWorkSpace" 
        type="color" 
        defaultValue='#05355f'
        style={{marginLeft:"50px", marginTop:"25px"}}
        title="Background Color" 
        onChange={(e)=>{
        const background = document.getElementById("WorkSpace")

            background.style.backgroundColor = e.target.value
        }} 
         />

<br/>
<br/>

<p>Border Color</p>

<input 
        id="borderColorWorkSpace" 
        type="color" 
        defaultValue='#c7c9d3'
        style={{marginLeft:"50px", marginTop:"25px"}}
        title="Border Color" 
        onChange={(e)=>{
        const background = document.getElementById("WorkSpace")

            background.style.borderColor = e.target.value
        }} 
         />



</span>


<span className="designBar2">
Charts 
<AddIcon onClick={ ()=> setShow(true)}/>

</span>



{recentTrades}



<span className="designBar3">
Widgets 
<WidgetsIcon onClick={()=> console.log("Ayre")}/>
</span>

</div>

    
{error? 
  <div className="SignuperrorMessageNotification2">
    <a onClick={ () => {  setError(false)}} > X </a>
  <h2>Oh snap! Your title dude!</h2>
  <p>
 Title is too Long!! relax and reduce it to less than 75 characters 
  </p>

</ div>
:

null
  
} 

{error2? 
  <div className="SignuperrorMessageNotification2">
    <a onClick={ () => {  setError2(false)}} > X </a>
  <h2>Sorry !</h2>
  <p>
 You need to have a minimum of 4 Fields 
  </p>

</ div>
:

null
  
} 

</div>

)

}

export default Create; 