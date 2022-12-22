import Admin_Footer from "../../com/Admin_Footer";
import Admin_Sidebar from "../../com/Admin_Sidebar";
import Admin_Navbar from "../../com/Admin_Navbar";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Paper, Button } from "@mui/material";
import dynamic from "next/dynamic";
import viewStyles from "../admin/view.module.css";


const Viewer = dynamic(()=> import('../../com/Admin_Viewer'), {ssr:false});

export default function views(){

    const router = useRouter();
    const cPage = router.query.cPage;
    const b_idx = router.query.b_idx;
    const bname = router.query.bname;
    const bbs = router.query.bbs;
    const DATA_URL = "/admin/views/data"
    const [data, setData] = useState({});



    function getData(){

        Axios.post(
            DATA_URL, null,
            {params:{b_idx: b_idx}},
        ).then((json)=>{
            setData(json.data.data);
        });

    }

    function goList(){
        router.push({
            pathname:'/admin/'+bbs,
            query: {cPage: cPage},
        });
    }

    function edit(){
        router.push({
            pathname:'/admin/edit',
            query:{cPage: cPage, b_idx: b_idx, bname: bname, bbs:bbs}
        });
    }

    useEffect(()=>{
        getData();
    },[]);


    return(

        <Box>
            <Admin_Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Admin_Sidebar/>
                <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                    <Paper sx={{padding:"20px", margin:'auto'}}>
                        <table className={viewStyles.table}>
                            <tbody>
                                <tr>
                                    <th>제목 </th>
                                    <td>{data.subject}</td>
                                    <th>조회수 </th>
                                    <td>{data.hit}</td>
                                </tr>
                                <tr>
                                    <th>글쓴이 </th>
                                    <td>{data.nickname}</td>
                                    <th>작성일</th>
                                    <td>{data.write_date}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div id='viewer'>
                                            <Viewer content={data.content}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        첨부파일
                                    </th>
                                    {data.file_name == null &&(
                                        <td>
                                            첨부된 파일이 없습니다.
                                        </td>
                                    )}
                                    {data.file_name != null &&(
                                        <td>
                                            {data.file_name}
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                       <Button size="small" variant="contained" sx={{margin:'10px'}} onClick={goList}>목록</Button>
                       <Button size="small" variant="contained" sx={{margin:'10px'}} onClick={edit}>수정</Button>
                    </Paper>
                </Box>
            </Stack>
            <Admin_Footer/>
        </Box>
    );

}
