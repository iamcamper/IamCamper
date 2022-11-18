import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button } from '@mui/material';

export default function imc_camping(){

    return(
    <div className={styles.container}>

      <Main1_top/>
      <Main1/>
      <Main1_Menu/>

      <div >

      </div>

      <Main_Bottom/>

    </div>
    );
}