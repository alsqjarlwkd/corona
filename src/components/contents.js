import React, { useEffect, useState } from 'react';
import axios from 'axios';//axios 선언
import {Bar,Doughnut,Line} from 'react-chartjs-2';//차트 가져오기
import UpArrow from './../imgs/up-arrow.png';
import Loading from './loading';
const Contents=()=>{
    const[confirmedData,setconfirmedData]=useState({});//data 상태 관리를 위한 useState Hook 사용
    const[quarantinedData,setquarantinedData]=useState({});
    const[comparedData,setcomparedData]=useState({});
    const[lastComfirmedData,setLastComfirmedData] = useState();
    const[lastRecoveredData,setRecoverComfirmedData] = useState();
    const[lastDeathsData,setlastDeathsData] = useState();
    const[comparecomfirmed,setcomparecomfirmed] = useState();
    const[compareRecover,setcompareRecover] = useState();
    const[compareDeath,setcompareDeath] = useState();
    const[loadingData,setloadingData] = useState(true);
    useEffect(()=>{
        const fetchEvents=async()=>{
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")//해당 API에서 정보를 get 해온다
            makeData(res.data);//국내 확진자 수 데이터
            setloadingData(false);
            setLastComfirmedData(res.data[res.data.length-1].Confirmed);
            setRecoverComfirmedData(res.data[res.data.length-1].Recovered);
            setlastDeathsData(res.data[res.data.length-1].Deaths);
            setcomparecomfirmed(res.data[res.data.length-1].Confirmed-res.data[res.data.length-2].Confirmed);
            setcompareRecover(res.data[res.data.length-1].Recovered-res.data[res.data.length-2].Recovered);
            setcompareDeath(res.data[res.data.length-1].Deaths-res.data[res.data.length-2].Deaths);
            console.log(res);
        }
        const makeData =(items)=>{
        const arr = items.reduce((acc,cur)=>{
            const currentDate = new Date(cur.Date);
            const year = currentDate.getFullYear();//현재 년도
            const month = currentDate.getMonth();//현재 달
            const date = currentDate.getDate();//현재 날
            const confirmed = cur.Confirmed;//cur 의 배열에 Confirmed 데이터 값을 confirmed 변수에 기입
            const active = cur.Active;//cur의 배열에 Active 데이터 값을 active 변수에 기입
            const deaths = cur.Deaths;//cur의 배열에 Deaths 데이터 값을 deaths 변수에 기입
            const recovered = cur.Recovered; //cur의 배열에 Recovered recovered 변수에 기입

            const findItem = acc.find(a=>a.year === year && a.month === month);
            if(!findItem)
            {
            acc.push({
                    year,//ES6에서는 키와 value값이 같으면 키값은 생략 가능
                    month,
                    date,
                    confirmed,
                    active,
                    deaths,
                    recovered
                })
            }
            if(findItem && findItem.date<date)
            {//해당 변수는 값 자체를 복사한것이 아닌 값이 가르키는 아이템의 주소를 담았기 때문에 findItem에 값을 바꿔도 acc의 해당 아이템의 값이 변경될수 있음
            findItem.active=active;
            findItem.deaths = deaths;
            findItem.date = date;
            findItem.year = year;
            findItem.month = month;
            findItem.recovered = recovered;
            findItem.confirmed = confirmed;
            }
            return acc;
        },[])
        const labels = arr.map(a =>`${a.month+1}월`)
        setconfirmedData({
        labels:labels,
        datasets:[
            {
                label:"국내 누적 확인자(월단위)",
                backgroundColor:"black",
                fill:true,
                data:arr.map(a=>a.confirmed),
            }
        ]
    });
    setquarantinedData({
        labels:labels,
        datasets:[
            {
                label:"월별 누적 확인자",
                backgroundColor:"red",
                fill:false,
                data:arr.map(a=>a.active),
            }
        ]
    });
    const last = arr[arr.length-1];
    setcomparedData({
        labels:["확진자","격리해제","사망"],
        datasets:[
            {
                label:"누적 확진,해제,사망 비율",
                backgroundColor:["green","yellow","red"],
                fill:false,
                data:[last.confirmed,last.recovered,last.deaths],
            }
        ]
    });
    }
    fetchEvents();//fetchEvents 실행
    },[])
    return(
        <>
        {loadingData ? <Loading></Loading>:
        <div className="kr_contents_wrapper">
        <h2 style={{textAlign:"center"}}>국내 코로나 현황</h2>
        <div className="kr_Count_wrapper">
            <div className="kr_Count_header">
                <p>국내 누적 확진자</p>
            </div>
            <div className="kr_Count_Wrapper">
            <div className="kr_Count">
                <h3>확진자</h3>
                {lastComfirmedData}
                <p><img src={UpArrow}alt="uparrow"></img>{comparecomfirmed}</p>
            </div>
            <div className="kr_recovered_Count">
                <h3>격리해제</h3>
                {lastRecoveredData}
                <p><img src={UpArrow}alt="uparrow"></img>{compareRecover}</p>
                </div>
            <div className="kr_deaths_Count">
                <h3>사망자</h3>
                {lastDeathsData}
                <p><img src={UpArrow}alt="uparrow"></img>{compareDeath}</p>
                </div>
            </div>
        </div>
        <div className="kr_contents">
        <div className="Corona_Bar">
                <Bar data={confirmedData}></Bar>
            </div>
            <div className="Corona_Line">
                <Line data={quarantinedData}></Line>
            </div>
            <div className="Corona_Doughnut">
                <Doughnut data={comparedData}></Doughnut>
            </div>
        </div>
        </div>}
        </>
        )
}

export default Contents;