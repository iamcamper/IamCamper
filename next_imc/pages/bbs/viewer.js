import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';


export default function viewer({list}){
	return (
	<Viewer
		initialValue = { list }
      	/>
	);
}