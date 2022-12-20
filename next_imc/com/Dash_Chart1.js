import { Typography } from "@mui/material";




export default function Dash_Chart1({regCount}){

    return(
        <div>
            <h3>오늘 가입자</h3>
            <Typography component="p" variant="h4">
                {regCount} 명
            </Typography>
        </div>
    );


}