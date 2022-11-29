import { useEffect } from "react"
import { useRouter } from "next/router"
import { deleteCookie } from "cookies-next";


export default function logout(){

    const router = useRouter();

    function delCookie(){
        deleteCookie("id");
        router.push("/admin/login");
    }
    
    useEffect(()=>{
        delCookie();
    },[]);

    return(

        <></>
    )

}