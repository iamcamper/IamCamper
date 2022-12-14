import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';

export default function editor(props){

    const ref = props.editorRef;
    const con = props.content;
   
    const addImage = async(blob, callback) => {
       const frm = new FormData();
       frm.append('file', blob);
        try{
        const imgUrl = await Axios.post('/bbs/upload_img', frm, {
            headers: {
                "Content-Type" : 'multipart/form-data',
            },
        }).then(json => {
            callback("http://localhost:3000/upload_img/" + json.data.fname);
        })
        } catch {

        }

        
    }
    

    return(
        <div>
           <Editor
                ref = {ref}
                placeholder="내용을 입력해 주세요!"
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                initialEditType="wysiwyg"
                initialValue={con}
                hideModeSwitch={true} 
                hooks={{
                    addImageBlobHook: addImage
                }}
            />
        </div>
    );
}