import router from "next/router";

export default function Main1(){

    return(
        <div style={{width:'1600px', margin:'auto'}}>
            <img src={"https://kin-phinf.pstatic.net/20221222_283/16716780807528rRdc_PNG/KakaoTalk_20221222_114902029.png?type=w750"} alt='logo_image' style={{marginTop:'30px' ,cursor:"pointer",height:"100px",width:"200px"}} onClick={()=>router.push("/")} />     
        </div>
    );
}