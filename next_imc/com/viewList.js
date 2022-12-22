
import { Grid, Typography } from "@mui/material";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import dynamic from "next/dynamic";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import Axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const Viewer = dynamic(()=> import('../pages/bbs/viewer'), {ssr:false});

export default function viewList({list}){

  const labels = {
    1: '별로에요',
    2: '애매해요',
    3: '괜찮아요',
    4: '좋아요',
    5: '최고에요',
  };
  
  const router = useRouter();
  const [likehit, setLikehit] = useState();
  const API_LIKE = "/like/up";
  const API_DEL = "/like/dw";
  const API_CHK = "/like/chk";
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  function likesubmit(){
    if(likehit == 0){
      setLikehit(1);
      Axios.post(
        API_LIKE,null,
        {params:{b_idx:list.b_idx, m_idx:1}}
      ).then(
        router.push("/bbs/view_bbs?idx="+list.b_idx)
      );
    }else if(likehit == 1){
      setLikehit(0);
      Axios.post(
        API_DEL,null,
        {params:{b_idx:list.b_idx, m_idx:1}}
      ).then(
        router.push("/bbs/view_bbs?idx="+list.b_idx)
      );
    }
    console.log(likehit);
  }
  let likecolor = {
    0 : <FavoriteBorderIcon/>,
    1 : <FavoriteIcon color="error"/>
  }

function likechk(){
  Axios.post(
    API_CHK,null,
    {params:{b_idx:list.b_idx, m_idx:1}}
  ).then((json) =>{
    setLikehit(json.data.cnt);
  });
}
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


useEffect(() => {
  likechk()
},[]);

    return(
     <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography variant="h2" gutterBottom>
                    {list.subject}
                </Typography>
                <Typography variant="h4" color="text.secondary">
                    {list.nickname}
                </Typography>
                {(list.bname === 'RESELL' && <Typography variant="h3" color="text.secondary">
                          {list.price}
                      </Typography>)}
              </Grid><Grid item>
                 <Viewer list={list.content}
                 />
                </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {list.bname}
            </Typography>
            <Typography variant="subtitle1" component="div">
                    <IconButton aria-label="FavoriteBorder" onClick={likesubmit}>
                          {likecolor[likehit]}
                    </IconButton>
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{width:200}}>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  console.log(value);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                  console.log(hover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            </Typography>
          </Grid> 
        </Grid>
      </Grid>
    )
}