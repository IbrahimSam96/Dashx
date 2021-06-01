import React, { useState } from "react";
import Highcharts from "highcharts";
import HightchartsReact from "highcharts-react-official";
import ReactDOM from 'react-dom'


const CreateGraph2 = (props) => {


    var arr = [];
    
    for (var i = 0; i < props.data.length;  i += 2) {
    
     arr[i] =  [props.data[i][1] , Number(props.data[i+1][1]) ] 

    }


const [option, setOption] = useState({ 
    title: {
        text: props.title, 
        style:{
            color:props.tooltiptextcolor,
            fontFamily:" Trebuchet MS,  Arial, sans-serif",
            fontWeight:"bold",
            fontSize:"1.5rem",
        }
    },
    legend: {
        enabled: props.legend,
        itemStyle:{
        color:props.tooltiptextcolor
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
     visible: props.xAxis,
     labels: {
        style: {
            color: props.axisColor
        }
    },
    }, 
    yAxis: {
        visible: props.yAxis,
        gridLineColor: 'transparent',
        labels: {
            style: {
                color: props.axisColor
            }
        },
    }, 
    series: [{
        name:props.seriestitle,
        type: props.type,
        color:props.color,
        data: arr.filter(item => item)
    }
],

    tooltip: {
        style: {
            color: props.tooltiptextcolor,
            fontWeight: 'bold'
        },
        xDateFormat: '%Y-%m-%d',
        pointFormat: `<span style="font-size: 1.0rem; "> {series.name}</span>:
          <b>  <span style="font-size: 1.0rem; ">{point.y}</span> </b>`,
        valueDecimals: 2, 
        backgroundColor:props.tooltipcolor,
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



export default CreateGraph2 ; 