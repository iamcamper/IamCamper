import { Typography, Box } from "@mui/material";





export default function Dash_Chart1({regCount}){

    return(
        <Box marginTop={2} paddingTop={4}>
            <Typography variant="h5" gutterBottom>오늘 가입한 회원</Typography>
            {regCount != null && (
            <Typography component="p" variant="h4">
                {regCount} 명
            </Typography>
            )}
            {regCount == null && (
            <Typography component="p" variant="h4">
               데이터가 없습니다.
            </Typography>
            )}
        </Box>
    );

}