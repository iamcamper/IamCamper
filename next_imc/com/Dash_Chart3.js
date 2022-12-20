import { Typography } from "@mui/material";




export default function Dash_Chart3({bestBbs}){


    return(
        <div>
            <h5>오늘의 인기 게시판</h5>
            <div>
               {bestBbs}
            </div>
        </div>
    );


}