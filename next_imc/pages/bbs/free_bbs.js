import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import * as React from 'react';
import ReactDOM from "react-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from "react-js-pagination";
import { useState } from "react";


export default function free_bbs(){ 
    const [page, setPage] = useState(1);

    const handlePageChange=(page) => {
      setPage(page);
    };
  
    return(
        <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
    <Paper sx={{width:'auto', margin:'auto', textAlign:'center'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{width: 'auto'}}>
                  <TableRow>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                    <TableCell>테스트1</TableCell>
                  </TableRow>
          </TableBody>
          
        </Table>
      </TableContainer>
    </Paper>
    <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
        />

            </div>  
            <Main_Bottom/>
        </div>
    )
}