import React,{useEffect,useState} from 'react'
import axios from 'axios';//axios 선언
import {Line,Doughnut} from 'react-chartjs-2';//차트 가져오기

const AboradContents = () => {

    const [Globalconfiremd,setGlobalconfiremd] = useState({})

    useEffect(() => {
    const fetchGlobalEvents=async()=>{
        const Global = await axios.get("https://api.covid19api.com/summary")
        const GlobalConfirmed = Global.data.Global.TotalConfirmed;
        const GlobalDeaths = Global.data.Global.TotalDeaths;
        const GlobalRecover = Global.data.Global.TotalRecovered;
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
}
    fetchGlobalEvents()
    }, [])
    return (
    <section>
        <h2>해외 전체인원 코로나 현황</h2>
        <div className="Global_Doughnut">
            <Doughnut data={Globalconfiremd}></Doughnut>
        </div>
    </section>
    )
}

export default AboradContents
