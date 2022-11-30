import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef, useState } from 'react';
import Axios from 'axios';

export default function Admin_Editor(props){

    const {editorRef} = props;
    const [fileName, setFileName] = useState([]);

    const addImage = async(blob, callback) => {
       const frm = new FormData();
       frm.append('file', blob);
        try{
        const imgUrl = await Axios.post('/admin/upload_img', frm, {
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
                ref = {editorRef}
                placeholder="내용을 입력해 주세요!"
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                initialEditType="wysiwyg"
                hooks={{
                    addImageBlobHook: addImage
                }}
            />
        </div>
    );
}
