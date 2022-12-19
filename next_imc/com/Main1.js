import router from "next/router";

export default function Main1(){

    return(
        <div style={{width:'1600px', margin:'auto'}}>
            <img src={'http://www.increpas.com/images/logo.png'} alt='logo_image' style={{marginTop:'30px' ,cursor:"pointer"}} onClick={()=>router.push("/")} />     
        </div>
    );
}