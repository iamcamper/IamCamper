import { PersonAdd } from "@mui/icons-material";
import { Typography } from "@mui/material";




export default function Dash_Chart2(props){

    const totalReg = props.totalReg;

    return(
        <div>
            <h3>누적 가입자</h3>
            <h4>
                {totalReg} 명
            </h4>
        </div>
    );


}