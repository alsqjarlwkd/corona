import './App.css';
import React,{useEffect,useState} from "react";
import Contents from './components/contents';
import GlobalContents from './components/GlobalContents';
import UsaContents from './components/UsaContents';
import UkContents from './components/UkContents';
import Keepdistance from './components/keepdistance';
import Modal from './components/Modal';


function App() {
  const[Value,setValue]=useState("")
  const[component,setcomponent]=useState(
    <>
    <Contents></Contents>
    <GlobalContents></GlobalContents>
    <UsaContents></UsaContents>
    <UkContents></UkContents>
    </>
  );
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
  useEffect(()=>{
    if(Value === "kr")
    {
      return setcomponent(()=><Contents></Contents>)
    }
    else if(Value === "global")
    {
      return setcomponent(()=><GlobalContents></GlobalContents>)
    }
    else if(Value === "usa")
    {
      return setcomponent(()=><UsaContents></UsaContents>)
    }
    else if(Value === "uk")
    {
      return setcomponent(()=><UkContents></UkContents>)
    }
    else if(Value === "all")
    {
      return setcomponent(()=>{
        return (
          <>
            <Contents></Contents>
            <GlobalContents></GlobalContents>
            <UsaContents></UsaContents>
            <UkContents></UkContents>
          </>
        )
      })
    }
  },[Value])

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
    <header className="header">
    <div className="header_h1">
    <h1>COVID-19</h1>
    </div>
    <select name="select" id="GraphData" onChange={(e)=>{
        const selectvalue = e.target.value
        setValue(selectvalue)
    }}>
        <option value="all">전체</option>
        <option value="kr">국내</option>
        <option value="global" >세계</option>
        <option value="usa" >미국</option>
        <option value="uk">영국</option>
    </select>
</header>
  <div className="DarkModeBtn_flex">
  <div className="DarkModeBtn">
  <button onClick={darkOnOff} style={{marginBottom:"20px"}}>on/off darkMode</button>
  <button onClick={openModal}>국내 지역별 거리두기</button>
  </div>
  </div>
  {component}
  <Modal open={modalOpen} close={closeModal}>
  <Keepdistance></Keepdistance>
  </Modal>
  </section>
  );
}
export default App;