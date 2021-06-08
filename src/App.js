import './App.css';
import React,{useEffect,useState} from "react";
import Header from './components/header';
import Contents from './components/contents';
import GlobalContents from './components/GlobalContents';
import UsaContents from './components/UsaContents';
import UkContents from './components/UkContents';
import Keepdistance from './components/keepdistance';
import Modal from './components/Modal';


function App() {
  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("body")[0].classList.add("ui-dark");
    }
  }, []);
  const darkOnOff = () => {
    if (document.getElementsByTagName("body")[0].classList.contains("ui-dark"))
    {
      document.getElementsByTagName("body")[0].classList.remove("ui-dark");
      window.localStorage.setItem("bgMode", "light");
    } else {
      document.getElementsByTagName("body")[0].classList.add("ui-dark");
      window.localStorage.setItem("bgMode", "dark");
    }
  }
  const [ modalOpen, setModalOpen ] = useState(false);

  const openModal = () => {
      setModalOpen(true);
      document.body.style.overflow="hidden";
      
  }
  const closeModal = () => {
      setModalOpen(false);
      document.body.style.overflow="unset";
  }
  return (
  <section className="section">
  <Header></Header>
  <div className="DarkModeBtn_flex">
  <div className="DarkModeBtn">
  <button onClick={darkOnOff} style={{marginBottom:"20px"}}>on/off darkMode</button>
  <button onClick={openModal}>국내 지역별 거리두기</button>
  </div>
  </div>
  <Contents></Contents>
  <GlobalContents></GlobalContents>
  <UsaContents></UsaContents>
  <UkContents></UkContents>
  <Modal open={modalOpen} close={closeModal}>
  <Keepdistance></Keepdistance>
  </Modal>
  </section>
  );
}
export default App;
