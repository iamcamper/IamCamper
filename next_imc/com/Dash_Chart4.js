import { Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";




export default function Dash_Chart4(){

 
const data =  {
            labels: ['후기 게시판', '자유 게시판', '맛집 게시판', '중고거래 게시판'],
            datasets: [
              {
                type: 'bar',
                label: '오늘의 각 게시판별 게시물 수',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [20, 24, 11, 5],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
                ],
                backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
                ],
                borderWidth: 2
              },
              
    ],
};


    return(
        <div>
            <h5>인기 게시판 내역</h5>
            <div>
                <Bar data={data}/>
            </div>
        </div>
    );


}