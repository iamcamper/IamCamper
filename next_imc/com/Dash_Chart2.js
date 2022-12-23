import { ArrowUpward, PersonAdd } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";





export default function Dash_Chart2({regCount, ydayReg, totalReg}){

    const toReg = {totalReg}; //(오늘까지의) 누적 가입 회원
    const yesdayReg = {ydayReg}; //어제 가입한 회원
    const todayCount = {regCount}; //오늘 가입한 회원

    let per = ( todayCount.regCount / (toReg.totalReg - todayCount.regCount) ) * 100;
    let iper = parseInt(per);

    let msg = "전일 대비 " + iper + "% 증가";



    return(
        <Box marginTop={2} paddingTop={1}>
            <Typography variant="h6" gutterBottom>누적 가입 회원</Typography>
            {(totalReg != null || regCount != null) && (
            <Typography component="p" variant="h3" color="primary">
                {totalReg}
            </Typography>
            )}
            {totalReg == null && (
            <Typography component="p" variant="h4">
               데이터가 없습니다.
            </Typography>
            )}
            {(totalReg != null || regCount != null) && (
            <Stack spacing={1} marginTop={1} alignItems="center">
              <Chip icon={<ArrowUpward/>} label={msg} color="primary" />
            </Stack>
            )}
        </Box>
    );


}