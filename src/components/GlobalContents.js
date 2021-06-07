import React,{useEffect,useState} from 'react'
import axios from 'axios';//axios 선언
import {Line,Doughnut} from 'react-chartjs-2';//차트 가져오기
import Loading from './loading';
import UpArrow from './../imgs/up-arrow.png';

const AboradContents = () => {

    const [Globalconfiremd,setGlobalconfiremd] = useState({})
    const[loadingData,setloadingData] = useState(true);
    const [GlobalNewConfirmed,setGlobalNewConfirmed] = useState();
    const [GlobalNewDeaths,setGlobalNewDeaths] = useState();
    const [GlobalNewRecover,setGlobalNewRecover] =useState();
    const [GlobalConfirmed,setGlobalConfirmed]=useState();
    const [GlobalDeaths,setGlobalDeaths] = useState();
    const [GlobalRecover,setGlobalRecover] = useState();
    useEffect(() => {
    const fetchGlobalEvents=async()=>{
        const Global = await axios.get("https://api.covid19api.com/summary")
        setloadingData(false);
        setGlobalConfirmed(Global.data.Global.TotalConfirmed);
        setGlobalDeaths(Global.data.Global.TotalDeaths);
        setGlobalRecover(Global.data.Global.TotalRecovered);
    setGlobalconfiremd({
        labels:["전체 확진자","전체 사망자수","전체 격리해제"],
        datasets:[
            {
                label:"전세계 누적 확진,전세계 해제,전세계 사망 비율",
                backgroundColor:["green","yellow","red"],
                fill:false,
                data:[GlobalConfirmed,GlobalDeaths,GlobalRecover],
            }
        ]
    })
    setGlobalNewConfirmed(Global.data.Global.NewConfirmed);
    setGlobalNewDeaths(Global.data.Global.NewDeaths);
    setGlobalNewRecover(Global.data.Global.NewRecovered);
}
    fetchGlobalEvents();
    }, [])
    return (
        <>
        {loadingData ? <Loading></Loading> : 
        <div className="global_contents_wrapper">
            <h2 style={{textAlign:"center"}}>해외 전체 코로나 현황</h2>
        <div className="kr_Count_wrapper">
            <div className="kr_Count_header">
                <p>해외 전체 누적 확진자</p>
            </div>
            <div className="kr_Count_Wrapper">
            <div className="kr_Count">
                <h3>확진자</h3>
                {GlobalConfirmed}
                <p><img src={UpArrow}></img>{GlobalNewConfirmed}</p>
            </div>
            <div className="kr_recovered_Count">
                <h3>격리해제</h3>
                {GlobalDeaths}
                <p><img src={UpArrow}></img>{GlobalNewRecover}</p>
                </div>
            <div className="kr_deaths_Count">
                <h3>사망자</h3>
                {GlobalRecover}
                <p><img src={UpArrow}></img>{GlobalNewDeaths}</p>
                </div>
            </div>
        </div>
        <h2 style={{textAlign:"center"}}>해외 전체인원 코로나 현황</h2>
        <div className="global_contents">
        <div className="Global_Doughnut">
        <Doughnut data={Globalconfiremd}></Doughnut>
        </div>
        </div>
        </div>}
        </>
    )
}

export default AboradContents
