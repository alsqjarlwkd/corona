import './App.css';
import React,{useEffect} from "react";
import Header from './components/header';
import Contents from './components/contents';
import GlobalContents from './components/GlobalContents';
import UsaContents from './components/UsaContents';
import UkContents from './components/UkContents';


function App() {
  return (
  <section>
  <Header></Header>
  <Contents></Contents>
  <GlobalContents></GlobalContents>
  <UsaContents></UsaContents>
  <UkContents></UkContents>
  </section>
  );
}

export default App;
