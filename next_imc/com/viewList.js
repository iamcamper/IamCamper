
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

const Viewer = dynamic(()=> import('../pages/bbs/viewer'), {ssr:false});

export default function viewList({list}){

  
  const router = useRouter();
  const [likehit, setLikehit] = useState();
  const API_LIKE = "/like/up";
  const API_DEL = "/like/dw";
  const API_CHK = "/like/chk";
  console.log(list);

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

useEffect(() => {
  likechk()
},[]);

    return(
     <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography variant="body2" gutterBottom>
                    {list.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {list.nickname}
                </Typography>
                {
                  (function() {
                    if(list.bname === 'RESELL') return (
                      <Typography variant="body2" color="text.secondary">
                          {list.price}
                      </Typography>
                    );
                  })
                }
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
          </Grid> 
        </Grid>
      </Grid>
    )
}