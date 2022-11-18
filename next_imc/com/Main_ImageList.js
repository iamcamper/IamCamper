
import { Box,Stack,Paper} from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Main_ImageList(){

    const itemData = [
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoA3n3VWMb-2fLeL94ewiUdwG9fWNgA2adpw&usqp=CAU',
          title: '신발1',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxeF5pN1-9eTFK-E-M-n1vq5n5m8TZGIsBRQ&usqp=CAU',
          title: '신발2',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Zyx5QQV2PREF8-pWdPeEzABJzF3d7cp_7A&usqp=CAU',
          title: '신발3',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTro4grIBEZa1spXf1cbSI9Tpc3pHD1U8HjA&usqp=CAU',
          title: '신발4',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrltlKuPxrQSSiz9M4cd-ZCeIM11m6fMIIw&usqp=CAU',
          title: '신발5',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYJeHbiYkBXrwtYfFA-JE6Cv5S7XBLTDGbTw&usqp=CAU',
          title: '신발6',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd7hf6ZnlTuMwUGO6jKArW6CMJfQQRdNPRyngmA_rDuudPIF5kU8oloKaLLSnWP8p9iI&usqp=CAU',
          title: '신발7',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcEZZ6c6Jhf2YB3Z-LpLooriXhZEa6bUV3Q&usqp=CAU',
          title: '신발8',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK88byw6knUoRmJUi6fSi4JwdbGG3gCIv7ZQ&usqp=CAU',
          title: '신발9',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeibQ3kT_mFADqpUqSFTaIKvxpat6diasyVpraEEsNyNNvhuWy6jT7_Ryk_ZUDhJNhAbc&usqp=CAU',
          title: '신발10',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTttVEcWt9o4g7v8JT-kvB3ZKZYHg4JDKWcGA&usqp=CAU',
          title: '신발11',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qpif0LFUUOlqRNq1jxKk4G7dJslJvVdlniQZaeF944--wSHgiYTxILf5zpbhj6SlULM&usqp=CAU',
          title: '신발12',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcEZZ6c6Jhf2YB3Z-LpLooriXhZEa6bUV3Q&usqp=CAU',
          title: '신발8',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK88byw6knUoRmJUi6fSi4JwdbGG3gCIv7ZQ&usqp=CAU',
          title: '신발9',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeibQ3kT_mFADqpUqSFTaIKvxpat6diasyVpraEEsNyNNvhuWy6jT7_Ryk_ZUDhJNhAbc&usqp=CAU',
          title: '신발10',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTttVEcWt9o4g7v8JT-kvB3ZKZYHg4JDKWcGA&usqp=CAU',
          title: '신발11',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qpif0LFUUOlqRNq1jxKk4G7dJslJvVdlniQZaeF944--wSHgiYTxILf5zpbhj6SlULM&usqp=CAU',
          title: '신발12',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcEZZ6c6Jhf2YB3Z-LpLooriXhZEa6bUV3Q&usqp=CAU',
          title: '신발8',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK88byw6knUoRmJUi6fSi4JwdbGG3gCIv7ZQ&usqp=CAU',
          title: '신발9',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeibQ3kT_mFADqpUqSFTaIKvxpat6diasyVpraEEsNyNNvhuWy6jT7_Ryk_ZUDhJNhAbc&usqp=CAU',
          title: '신발10',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTttVEcWt9o4g7v8JT-kvB3ZKZYHg4JDKWcGA&usqp=CAU',
          title: '신발11',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qpif0LFUUOlqRNq1jxKk4G7dJslJvVdlniQZaeF944--wSHgiYTxILf5zpbhj6SlULM&usqp=CAU',
          title: '신발12',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qpif0LFUUOlqRNq1jxKk4G7dJslJvVdlniQZaeF944--wSHgiYTxILf5zpbhj6SlULM&usqp=CAU',
          title: '신발12',
        },
        
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qpif0LFUUOlqRNq1jxKk4G7dJslJvVdlniQZaeF944--wSHgiYTxILf5zpbhj6SlULM&usqp=CAU',
          title: '신발12',
        },
        
        
      ];

    return(
        <Box style={{width:'1600px',height:'600px', margin:'auto',marginTop:'30px'}}> 
        <Paper sx={{ width: 1300, height: 500 ,margin:"auto"}}  elevation={6}>
          <Stack spacing={10} direction='row'>
                    <ImageList sx={{ width: 1300, height: 500 ,margin:"auto"}} cols={6} rowHeight={256}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                style={{marginBottom:'10px'}}
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
              </Stack>
          </Paper>
        </Box>
        
    );
}