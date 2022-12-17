import { Typography } from "@mui/material";




export default function Dash_Chart2(props){

    const regCount = props.regCount;

    return(
        <div>
            <h5>오늘 가입자</h5>
            <Typography component="p" variant="h6">
                {regCount} 명
            </Typography>
            <h5>총 게시물 수</h5>
            <Typography component="p" variant="h6">
                15개
            </Typography>
        </div>
    );


}