import { SentimentSatisfied, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography, Box, Chip } from "@mui/material";
import { Stack } from "@mui/system";





export default function Dash_Chart1({regCount, ydayReg}){

    const reg = {regCount};
    const yes = {ydayReg};
    let res = null;
    let msg = "";

    if(reg.regCount > yes.ydayReg){
        res = reg.regCount - yes.ydayReg;
        msg = "가입한 회원의 수가 어제보다 "+ res + "명 많아요!";
    }

    if(reg.regCount < yes.ydayReg) {
        res = yes.ydayReg - reg.regCount;
        msg = "가입한 회원의 수가 어제보다 "+ res + "명 적어요!";
    }

    return(
        <Box marginTop={2} paddingTop={1}>
            <Typography variant="h6" gutterBottom>오늘 가입한 회원</Typography>
            {regCount != null && (
            <Typography component="p" variant="h3" color="primary">
                {regCount}
            </Typography>
            )}
            {regCount == null && (
            <Typography component="p" variant="h4">
               데이터가 없습니다.
            </Typography>
            )}
            {ydayReg == regCount && (
            <Stack spacing={1} marginTop={1} alignItems="center">
              <Chip icon={<SentimentSatisfied/>} label="가입한 회원의 수가 어제와 동일해요!" color="success" />
            </Stack>
            )}
            {ydayReg > regCount && (
            <Stack spacing={1} marginTop={1} alignItems="center">
              <Chip icon={<SentimentVeryDissatisfied/>} label={msg} color="warning" />
            </Stack>
            )}
            {ydayReg < regCount && (
            <Stack spacing={1} marginTop={1} alignItems="center">
              <Chip icon={<SentimentSatisfiedAlt/>} label={msg} color="primary" />
            </Stack>
            )}
        </Box>
    );

}