import '@toast-ui/editor/dist/toastui-editor-viewer';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';

export default function Admin_Viewer({content}){


    return(
        <div>
            {content &&
            <Viewer height="300px" initialValue={content}/>}
        </div>
    )

}
