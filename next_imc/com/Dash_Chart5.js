import { Box, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { useEffect } from "react";
import { width } from "@mui/system";




export default function Dash_Chart5({regData}){


const data =  {
            labels:
                regData.reverse().map((data)=>{
                    let label = data.reg_date;
                    return label.substr(5, 8);
                })
            ,
            datasets: [
              {
                type: 'line',
                label: '회원 가입 현황 (단위:명)',
                backgroundColor: 'rgb(255, 99, 132)',
                data: regData.reverse().map((data)=>{
                    return data.cnt;
                }),
                borderColor: 'red',
                borderWidth: 2
              },
              
    ],
};

const options = {
    responsive: false
};


    return(
        <Box marginTop={2} paddingTop={2}>
            <Typography variant="h5" gutterBottom>최근 5일 가입자 현황</Typography>
            <Box>
                {regData != null && (
                <Line data={data} options={options} style={{position: 'relative', height:'250px', width:'28vw', margin:'auto'}}/>
                )}
                {regData == null && (
                    <Typography>데이터가 없습니다.</Typography>
                )}
            </Box>
        </Box>
    );


}