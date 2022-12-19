
import { Grid, Typography } from "@mui/material";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import dynamic from "next/dynamic";

const Viewer = dynamic(()=> import('../pages/bbs/viewer'), {ssr:false});

export default function viewList({list}){
    const RESELL = list.bname;

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
              {list.hit}
            </Typography>
          </Grid> 
        </Grid>
      </Grid>
    )
}