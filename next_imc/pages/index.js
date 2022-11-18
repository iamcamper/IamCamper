import styles from '../styles/Home.module.css'

import Main1 from '../com/Main1';
import Main1_Menu from '../com/Main1_Menu';
import Main_Bottom from '../com/Main_Bottom';
import Main_Card from '../com/Main_Card';
import Main_ImageList from '../com/Main_ImageList';
import Main1_img from '../com/Main_img';


export default function Home() {
  return (
    <div className={styles.container}>
      <Main1/>
      <Main1_Menu/>
      <Main1_img/>
      <Main_Card/>
      <Main_ImageList/>
      <Main_Bottom/>
    </div>
  )
}
