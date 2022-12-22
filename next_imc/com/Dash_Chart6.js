import { Box, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { useEffect } from "react";
import { width } from "@mui/system";




export default function Dash_Chart6({snsList}){


const data =  {
            labels:
                snsList.map((data)=>{
                    let label = data.snsAuth;
                    return label;
                })
            ,
            datasets: [
              {
                type: 'doughnut',
                label: '가입자 현황',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)',
                ],
                data: snsList.map((data)=>{
                    let dt = data.cnt;
                    return dt;
                }),
                borderWidth: 2
              },
              
    ],
};

const options = {
    responsive: false
};


    return(
        <Box marginTop={2} paddingTop={2}>
            <Typography variant="h5" gutterBottom>일반 / 소셜 회원 가입 현황</Typography>
            <Box>
                {snsList != null && (
                <Line data={data} options={options} style={{position: 'relative', height:'230px', width:'29vw', margin:'auto'}}/>
                )}
                {snsList == null && (
                    <Typography>데이터가 없습니다.</Typography>
                )}
            </Box>
        </Box>
    );

}