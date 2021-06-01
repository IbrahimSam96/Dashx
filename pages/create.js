import {useEffect, useRef, useState} from "react"
import Checkbox from '@material-ui/core/Checkbox';


import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AddIcon from '@material-ui/icons/Add';
import WidgetsIcon from '@material-ui/icons/Widgets';
import TextFormatIcon from '@material-ui/icons/TextFormat';
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
import CreateGraph2 from "../Components/renderGraph";

import React from "react";
import nookies from "nookies";

import { firebaseAdmin } from "../firebaseAdmin";

import Draggable from 'react-draggable';

import { Rnd } from "react-rnd";

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
        redirect: {
          permanent: false,
          destination: "/login"
        },  
        props: {} ,
      };
    }
  };


const Create = (props) => {

//Modal Options
const [show , setShow] = useState(false); 
const [show2 , setShow2] = useState(false); 
const [show3 , setShow3] = useState(false); 
// Graph Styles or Data
const [style, setStyle] = useState(true);

//Graph Options
const [type , setType] = useState("column");
const [title , setTitle] = useState("");
const [seriestitle , setseriesTitle] = useState("");
const [xAxis, setxAxis] = useState(false); 
const [yAxis, setyAxis] = useState(false); 
const [color, setColor] = useState("#7cb5ec");
const [tooltipcolor, settooltipColor] = useState("black");
const [tooltiptextcolor, settooltiptextColor] = useState("white");
const [axisColor, setaxisColor] = useState("white");
const [legend, setLegend] = useState(false); 

// Text options
const [text , setText] = useState("");
const [textColor , setTextColor] = useState("black");
const [bold , setBold] = useState(false);
const [italic , setItalic] = useState(false);
const [underline , setUnderline] = useState(false);
const [justify , setJustify] = useState(false);




const [error, setError] = useState(false);
const [error2, setError2] = useState(false);



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


  const [numberofGraphs, setnumberofGraphs] = useState([]); 

  const [numberofText, setnumberofText] = useState([]); 

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

  console.log( data )

}


const TextBox = (props) => { 

  return (
    <span style={{color:props.textColor, 
    fontWeight: props.bold ? "bold": "normal", 
    fontFamily:"Trebuchet MS,  Arial, sans-serif",
    fontStyle: props.italic? "italic": "normal",
    textDecoration: props.underline? "underline": "none",
    textAlign: props.justify? "justify" :"none"
    }}>
    <h2>{props.text}</h2>
    </span>
  )
}



console.log(numberofGraphs)

console.log(props.email) 

console.log([...data])


const changecolor = _debounce(() => {

const value = document.getElementById("chartseriescolor").value;


setColor(value)

}, 200) ;


const changetooltipcolor = _debounce(() => {

  const value = document.getElementById("charttooltipcolor").value;
  
  settooltipColor(value)
  
  }, 200) 


  const changetooltiptextcolor = _debounce(() => {

    const value = document.getElementById("charttooltiptextcolor").value;
    
    settooltiptextColor(value)
    
    }, 200) 
  
    const changeaxiscolor = _debounce(() => {

      const value = document.getElementById("chartaxiscolor").value;
      
      setaxisColor(value)
      
      }, 200) 
    

const changeTextcolor = _debounce(() => {

const value = document.getElementById("textInputColor").value;
        
setTextColor(value)
        
}, 200) ;
        

const recentTrades  = ( 

<>
<Modal 
    backdrop="static"
    show={show}
    style={{opacity:3}}
    onHide={ () => setShow(false) } >

<Modal.Header>

  <AddCircleSharpIcon onClick={ () => {

        setnumberofGraphs(prevLines => (

          [
          ...prevLines,
       {
        type:type, title:title, seriestitle:seriestitle,
            legend:legend,
             xAxis:xAxis, 
            yAxis:yAxis,  
            color:color,
            tooltipcolor:tooltipcolor,
            tooltiptextcolor:tooltiptextcolor,
            axisColor:axisColor,
            data:[...data],
       }
        ]
        ) 
        );
    
        setShow(false);
} } 
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

<BarChartOutlined onClick={() => setType("column") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
    />


<PieChartOutlined  onClick={() => 
setType("pie") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
    />

<LineChartOutlined  onClick={() => setType("line") } 
    style={{color:"#c7c9d3", 
    float:"right"}} 
        />

<AreaChartOutlined onClick={() => setType("area") } 
style={{color:"#c7c9d3", 
    float:"right"}}  />


<div className="GraphArea"  id="GraphArea">

  <CreateGraph1 key={[type, title, legend, xAxis, yAxis, color, tooltipcolor, tooltiptextcolor,axisColor, [...data], seriestitle ]}
   type={type} title={title} seriestitle={seriestitle}
   legend={legend} xAxis={xAxis} 
   yAxis={yAxis} 
   color={color}
   tooltipcolor={tooltipcolor}
   tooltiptextcolor={tooltiptextcolor}
   axisColor={axisColor}
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

{type !== "pie" ?  
<>

  <input 
      id="chartseriescolor" 
      type="color" 
     defaultValue={color}
      style={{ marginTop:"45px"}}
      title="Series Color" 
      onChange={changecolor} 
       />

     <p>Color</p> 

     <br/>

     <br/>

    <p>Tooltip</p>

    <br/>

     <input 
      id="charttooltipcolor" 
      type="color" 
     defaultValue={tooltipcolor}
      style={{ marginTop:"45px"}}
      title="Background Color" 
      onChange={changetooltipcolor} 
       />

     <p>Background Color</p> 

     <br/>

     <input 
      id="charttooltiptextcolor" 
      type="color" 
     defaultValue={tooltiptextcolor}
      style={{ marginTop:"45px"}}
      title="Background Color" 
      onChange={changetooltiptextcolor} 
       />

    <p>Text Color</p> 

<br/>

{xAxis || yAxis? 

<>
<input 
id="chartaxiscolor" 
type="color" 
defaultValue={axisColor}
style={{ marginTop:"45px"}}
title="Background Color" 
onChange={changeaxiscolor} 
 />

<p>Axis  Color</p> 
</>
:
null

} 
</>

:

<>
<p>Tooltip</p>

<br/>
<input 
id="charttooltipcolor" 
type="color" 
defaultValue={tooltipcolor}
style={{ marginTop:"45px"}}
title="Tooltip Color" 
onChange={changetooltipcolor} 
 />

<p> Background Color</p> 

<br/>


<input 
      id="charttooltiptextcolor" 
      type="color" 
     defaultValue={tooltiptextcolor}
      style={{ marginTop:"45px"}}
      title="Background Color" 
      onChange={changetooltiptextcolor} 
       />

    <p>Text Color</p> 


</>

}

</div>

:
null
}

<Modal 
    show={show2}
    style={{opacity:3}}
    onHide={ () => setShow2(false) } >

<Modal.Header bsPrefix="DataBoxheader" >

<span className="DataBoxheader1" onClick={handleClick}> 
Add Fields 
</span>

<span className="DataBoxheader2" onClick={handleDelete}> 
Remove Fields
</span>

<CloseIcon onClick={() => setShow2(false) } 
    style={{color:"#c7c9d3", 
    float:"right"}}/>



</Modal.Header>

<Modal.Body  bsPrefix="DataBoxbody" >

<input className="inputseriestitle" 
id="inputseriestitle"
   type="text" 
   value={seriestitle} 
   placeholder="Series Title (Optional)" 
   onInput={ (e) => { 
     if(e.target.value.length > 55 ){
      setError(true)
       console.log("too Long 7bb <3")
       setseriesTitle("")
     }
     else{
      console.log(e.target.value)
      setseriesTitle(e.target.value)
   

     }
   }} />

<div className="DataBoxbody1" >

      {[...data.keys()].map((datapoint) => {
        return (
          <input
          className="inputboxes"
          id={datapoint}
           value={data.get(datapoint) }
            key={datapoint}
            onChange={handleChange(datapoint)}
          />
        );

      }
      
      )}

</div>


</Modal.Body>

</Modal>


</Modal.Body>

  </Modal>

  </>

    );

  const recentText = ( 
    <>
    <Modal 
    show={show3}
    style={{opacity:3}}
    onHide={ () => setShow3(false) } >

<Modal.Header bsPrefix="TextBoxheader" >

<CloseIcon onClick={() => setShow3(false) } 
style={{color:"#c7c9d3",float:"right"}}
/>

<AddCircleSharpIcon onClick={ () => {

if(text == "") {
  console.log("Ayree");
  setShow3(false);
}
else{
setnumberofText(prevLines => (

  [
  ...prevLines,
{
text:text,
textColor:textColor,
bold:bold,
italic:italic,
underline:underline,
justify:justify,

}
]
) 
);

setShow3(false);
setText("");
}

}} 
style={{color:"#c7c9d3", 
float:"right"}} />

</Modal.Header>

<Modal.Body  bsPrefix="TextBoxbody" >

<input className="textInput" 
id="textInput"
   type="text" 
   value={text} 
   placeholder="Enter Text Here" 
   onInput={ (e) => { 
      console.log(e.target.value)
      setText(e.target.value)
  }} />

<div className="textInput2">
  <input 
  className="textInputColor"
      id="textInputColor" 
      type="color" 
      defaultValue={textColor}
      style={{ marginTop:"45px"}}
      title="Text Color" 
      onChange={changeTextcolor} 
       />

  <p>Text Color</p> 

</div>

<div className="textInput3">

<Checkbox
        checked={bold}
        onChange={(e) =>{ setBold(e.target.checked) }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> Bold </p>

      <Checkbox
        checked={italic}
        onChange={(e) =>{ setItalic(e.target.checked) }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> Italic </p>

      <br/>
      <Checkbox
        checked={underline}
        onChange={(e) =>{ setUnderline(e.target.checked) }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> Underline </p>

      <Checkbox
        checked={justify}
        onChange={(e) =>{ setJustify(e.target.checked) }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p> Justify </p>
</div>
</Modal.Body>

</Modal>
  </>
  );



return (




<div className="createPage" >


<div className="WorkSpace" id="WorkSpace">


<div id="createdGraph">

{ numberofGraphs.map( (si, k) => (
       
       <>
       <Draggable > 
       
       <div className="resizablebox"> 
       <CloseIcon  
       onClick={ () => {
         const newgraphs = numberofGraphs.filter( (object, kk) =>  k!== kk ) 
         setnumberofGraphs(newgraphs)
       }}
         style={{color:"#c7c9d3", 
          fontSize:"1.5rem"}}
         />  

       <CreateGraph2
       key={[si.type, si.title, si.legend, si.xAxis, si.yAxis, 
            si.color, si.tooltipcolor, si.tooltiptextcolor, si.axisColor, 
           si.data, si.seriestitle,]}
           type={si.type} title={si.title} seriestitle={si.seriestitle}
           legend={si.legend} xAxis={si.xAxis} 
           yAxis={si.yAxis}    
           color={si.color}
           tooltipcolor={si.tooltipcolor}
           tooltiptextcolor={si.tooltiptextcolor}
           axisColor={si.axisColor}
           data={si.data}
          
           />
         </div>
         </Draggable>
         
           </>

     ))}


</div>

<div className="createdText">

{ numberofText.map( (si, k) => (

       <>
       <Rnd> 
  
       <CloseIcon  
       onClick={ () => {
         const newtext = numberofText.filter( (object, kk) =>  k!== kk ) 
         setnumberofText(newtext)
       }}
         style={{color:"#c7c9d3", 
          fontSize:"1.5rem"}}
         />  

  
       <TextBox key={[si.text, si.textColor, si.bold, si.italic, si.underline]}
           text={si.text} 
           textColor={si.textColor}
            bold={si.bold}
            italic={si.italic}
            underline={si.underline}
            jutify={si.justify} />
         </Rnd>
           </>
        
     ))}

</div>


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


<span className="designBar3">
Widgets 
<WidgetsIcon onClick={()=> console.log("Ayre")}/>
</span>

<span className="designBar4">
Text 
<TextFormatIcon onClick={ ()=> setShow3(true) }/> 

</span>
</div>

{recentTrades}
{recentText}

    
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