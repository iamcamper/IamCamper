import { Box, Typography } from "@mui/material";




export default function Dash_Chart3({bestBbs}){


    return(
        <Box marginTop={2} paddingTop={4}>
            <Typography variant="h5" gutterBottom>오늘의 인기 게시판</Typography>
            {bestBbs != null && (
            <Typography component="p" variant="h4">
               {bestBbs}
            </Typography>
            )}
            {bestBbs == null && (
            <Typography component="p" variant="h4">
                데이터가 없습니다
            </Typography>
            )}
        </Box>
    );


}