import { Button } from "@mui/material";
import Axios from "axios";

export default function test(){
    
    function Update(){
        Axios.get(
            "http://localhost:8080/cam/update"
        ).then((json)=>{
            console.log(json);
        });

    }

      return(
      
      <div>
        <Button onClick={Update} value="병원">병원</Button>
        <Button onClick={Update} value="캠핑">캠핑</Button>
        <Button onClick={Update} value="약국">약국</Button>
  
        
      </div>
      );
  }