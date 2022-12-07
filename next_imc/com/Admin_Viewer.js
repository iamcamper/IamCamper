import '@toast-ui/editor/dist/toastui-editor-viewer';
import { Viewer } from '@toast-ui/react-editor';

export default function Admin_Viewer({content}){

    return(
        <div>
            <Viewer height="300px" initialValue={content}/>
        </div>
    )

}
