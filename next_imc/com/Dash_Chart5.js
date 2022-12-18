import { Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { useEffect } from "react";




export default function Dash_Chart5({regData}){

console.log({regData});


const data =  {
            labels:[1,1,1,1,1,],
            datasets: [
              {
                type: 'line',
                label: '회원 가입 현황',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [20, 24, 11, 5, 1],
                borderColor: 'red',
                borderWidth: 2
              },
              
    ],
};


    return(
        <div>
            <h5>회원 가입 현황</h5>
            <div>
                <Line data={data}/>
            </div>
        </div>
    );


}