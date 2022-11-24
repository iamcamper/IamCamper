import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main1_top from '../../com/Main_top';
import styles from '../../styles/Home.module.css';
import React, { useRef, useState } from 'react';
 import { Editor } from '@tinymce/tinymce-react';
 import TextField from '@mui/material/TextField';
 import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';


export default function edit_bbs(){
    const editorRef = useRef(null);

   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };
   const [value, setValue] = useState('Controlled');

   const [bbs, setBbs] = useState('');

    const valueChange = (e) => {
        setValue(e.target.value);
       
    }; 
    const bbsChange = (e) => {
       setBbs(e.target.value);
    }; 
    
    return(
        <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
         <Paper sx={{width:'1600px', margin:'auto', textAlign:'center', height:'auto'}}>
                <h1> 게시글 작성 </h1>
            <div style={{textAlign:"left", margin:"30px"}}>
            <FormControl sx={{ m: 5, minWidth: 300 }} size="small">
                <InputLabel id="demo-select-small">게시판</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={bbs}
                    label="bbs"
                    onChange={valueChange}
                >
                    <MenuItem value={0}>
                    <em>자유게시판</em>
                    </MenuItem>
                    <MenuItem value={1}>후기 게시판</MenuItem>
                    <MenuItem value={2}>맛집 게시판</MenuItem>
                    <MenuItem value={3}>중고거래 게시판</MenuItem>
                </Select>
            </FormControl>
            <br/>
                <TextField
                    id="standard-textarea"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    multiline
                    variant="standard"
                /><br/>
                <TextField
                    id="standard-textarea"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    multiline
                    variant="standard"
                />
            </div>

            <Editor
                id = 'tinyEditor'
                apiKey = '064mhttd25ukeh524gyod1h6zq7im55mopqp61hwdabecd2n'
                selector= "textarea"
                initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                height: 500,
                menubar: false,
                paste_data_images: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image'
                ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat |' + ' image | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    automatic_uploads: true,
                    file_browser_callback_types: "image",
                    image_advtab: true,
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype == 'file') {
                            callback('mypage.html', {text: 'My text'});
                          }
                      
                          // Provide image and alt text for the image dialog
                          if (meta.filetype == 'image') {
                            callback('myimage.jpg', {alt: 'My alt text'});
                          }
                      
                          // Provide alternative source and posted for the media dialog
                          if (meta.filetype == 'media') {
                            callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                          }
                    },
                }}
            />
            <button onClick={log}>Log editor content</button>
            </Paper>
          <div> 
            <Main_Bottom/>
          </div>
        </div>
    )
}