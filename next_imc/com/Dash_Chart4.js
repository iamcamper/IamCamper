import { Box, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";




export default function Dash_Chart4({bbsTotalList}){

 
const data =  {
            labels: bbsTotalList.map((data)=>{
                let label = data.bnameko;
                return label;
            })
        ,
            datasets: [
              {
                type: 'bar',
                label: '오늘의 각 게시판별 게시물 수',
                backgroundColor: 'rgb(255, 99, 132)',
                data: bbsTotalList.map((data)=>{
                    let cnt = data.cnt;
                    return cnt;
                })
            ,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
                    'rgb(153, 102, 255, 1)',
                ],
                backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderWidth: 2,
              },
              
    ],
};

const options = {
    responsive: false
  };


    return(
        <Box marginTop={2} paddingTop={2}>
            <Typography variant="h5" gutterBottom>오늘 게시판별 게시글 통계</Typography>
            <Box>
                <Bar data={data} options={options} style={{position: 'relative', width:'35vw', margin:'auto'}}/>
            </Box>
        </Box>
    );


}