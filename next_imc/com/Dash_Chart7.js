import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";


export default function Dash_Chart7({bestHit}){



    return(
        <Box marginTop={2} paddingTop={2}>
            <Typography variant="h5" gutterBottom>오늘 살펴봐야 할 인기 게시글 (조회수 순)</Typography>
            <TableContainer>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>게시판 분류</TableCell>
                    <TableCell>글 제목</TableCell>
                    <TableCell align="right">조회수</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {bestHit != null && bestHit.map((data)=>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {data.bnameko}
                        </TableCell>
                        <TableCell>{data.subject}</TableCell>
                        <TableCell align="right">{data.hit}</TableCell>
                    </TableRow>
                    )}
                    {bestHit == null || bestHit == undefined && (
                        <TableRow>
                            <TableCell colSpan={3}>데이터가 없습니다.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );


}