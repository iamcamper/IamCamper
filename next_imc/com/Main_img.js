
import { Box,Card,CardMedia,TextField} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState,useEffect } from "react";
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';
//import styles from '../styles/main.module.css';


export default function Main1_img(){
    //---------받아온 이미지 경로 저장할 곳---------------------
    const [Data,setData] = useState([
        {
            image:'https://www.seoul.go.kr/upload/hotissue/22a91f27e7b44311b3aa11404b480ada.jpg'
        },
        {
            image:'https://www.seoul.go.kr/upload/hotissue/f0ba114f6ca448e4b2fa34ee97db843f.jpg'
        },
        {
            image:'https://www.seoul.go.kr/upload/hotissue/491d1c3d9b8141aca72c5b63a97c6f6f.jpg'
        },
        {
            image:'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODEyMzFfNTkg%2FMDAxNTQ2MjQyNjQxODY3.k_7sYsUWGBo3hvQAJNUzj5WpYVSFBXl3yQ2vB-2-pRAg.j3L_RCi9pZCGlVdBfK7_sfHW6uOuApMpB1e9dW1LHikg.JPEG.dodreamgj%2F3.jpg&type=a340'
        },
        {
            image:'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151227_14%2Fboreumm_1451226185243639Jq_PNG%2Fcamping2_b5.png&type=a340'
        }
    ])
    //------------------------------------------------

    const [cnt , setcnt] = useState(0);
    const length = Data.length;

    const nextSlide = () =>{
        setcnt(cnt === length -1 ? 0 : cnt +1);
    }
    const prevSlide = () => {
        setcnt(cnt === 0 ? length - 1 : cnt -1);
    }
   //console.log(cnt);

    if(!Array.isArray(Data)|| Data.length <= 0){
        return null;
    }

    //5초마다 nextSlide를 실행하는 함수
    useEffect (()=>{
        
        const loop = setInterval(()=>{
            nextSlide();
        },6000);
        return ()=> clearInterval(loop);
    });

    return(
        <div style={{width:'1600px',height:'600px', margin:'0 auto'}}> 
            <section className='slider'>
                < FaArrowAltCircleLeft className='leftarrow' onClick={prevSlide}/>
             {Data.map((item,index) => {
                return(
                <div className={index === cnt ? 'slide active':'slide'} key={index}>
                    {index === cnt &&(
                    <img src={item.image} alt='image' className='image'/>
                    )}
                </div>
                )
            })}
             < FaArrowAltCircleRight className='Rightarrow' onClick={nextSlide}/>
                <span className='item'>{cnt+1}/{length}</span>
             </section>
        </div>
         
        
      
    );
}