import Admin_Footer from "../../com/Admin_Footer";
import Admin_Sidebar from "../../com/Admin_Sidebar";
import Admin_Navbar from "../../com/Admin_Navbar";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Paper } from "@mui/material";
import dynamic from "next/dynamic";

const Viewer = dynamic(()=> import('../../com/Admin_Viewer'), {ssr:false});

export default function views(){

    const router = useRouter();
    const cPage = router.query.cPage;
    const b_idx = router.query.b_idx;
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
                        <table>
                            <tbody>
                                <tr>
                                    <th>제목: </th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>글쓴이: </th>
                                    <td>{data.nickname}</td>
                                </tr>
                                <tr>
                                    <th>내용: </th>
                                    <td>
                                        <div id='viewer'>
                                            <Viewer content={data.content}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </Box>
            </Stack>
            <Admin_Footer/>
        </Box>
    );

}
