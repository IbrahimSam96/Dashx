import React, { useState } from "react";
import Highcharts from "highcharts";
import HightchartsReact from "highcharts-react-official";

const CreateGraph1 = (props) => {


    var arr = [];
    
   var z = 0;
    for (var i = 0; i < props.data.length;  i += 2) {
    
     arr[i] =  [props.data[i][1], parseFloat(props.data[i+1][1])] 

    }



const [option, setOption] = useState({ 
    title: {
        text: props.title, 
        style:{
            color:"white",
            fontFamily:" Trebuchet MS,  Arial, sans-serif",
            fontWeight:"bold",
            fontSize:"1.5rem",
        }
    },
    legend: {
        enabled: props.legend,
        itemStyle:{
        color:"white"
        },
    },
    credits: {
        enabled: false
    },
    chart: {
        renderTo:"GraphArea",
        backgroundColor: "transparent", 
    },
    plotOptions: {
        series: {
            compare:"percent"
        }
    },
    xAxis: {
    // type:"datetime",
    //  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     gridLineColor: 'transparent',
     visible: props.xAxis
    }, 
    yAxis: {
        visible: props.yAxis,
        gridLineColor: 'transparent',
    }, 
    series: [{
        type: props.type,
        color:props.color,
        data: arr.filter(item => item)
    }
],

    tooltip: {
        xDateFormat: '%Y-%m-%d',
        pointFormat: `<span style="color:{series.color}; font-size: 1.0rem; ">{series.name}</span>:  <b>  <span style="font-size: 1.0rem; ">{point.y}</span> </b>`,
        valueDecimals: 2, 
     },
})

const renderHighChartCard = (

<HightchartsReact
 highcharts={Highcharts}
constructorType={'chart'}
options={option} 

/> 

); 


return (

<div> 

{renderHighChartCard}
        
</div>

);

}

export default CreateGraph1; 