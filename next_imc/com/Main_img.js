
import { Box,Card,CardMedia} from "@mui/material";

export default function Main1_img(){

    return(
        <div style={{width:'1600px',height:'600px', margin:'auto'}}> 
            <Card style={{width:'1600px',height:'600px', margin:'auto'}}>
                <CardMedia 
                                component='img'
                                height='100%'
                                width='100%'
                                image="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/28381cf9-4f31-4e89-bd92-caf677fd2cdf/nike-just-do-it.png"
                                alt='unsplash image'
                />
            </Card>
        </div>
    );
}