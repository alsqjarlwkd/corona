import React,{useEffect,useState} from 'react'
import {Line,Bar,Doughnut} from 'react-chartjs-2';//차트 가져오기
import Loading from './loading';
import UpArrow from './../imgs/up-arrow.png';
const UkContents = () => {
    const [UkconfirmedData,setUkconfirmedData] = useState({});
    const [UkquarantinedData,setUkaquarantinedData] = useState({});
    const [UkComparedData,setUkComparedData] = useState({});
    const[lastComfirmedData,setLastComfirmedData] = useState();
    const[lastRecoveredData,setRecoverComfirmedData] = useState();
    const[lastDeathsData,setlastDeathsData] = useState();
    const[comparecomfirmed,setcomparecomfirmed] = useState();
    const[compareRecover,setcompareRecover] = useState();
    const[compareDeath,setcompareDeath] = useState();
    const [loadingData,setloadingData] = useState(true);
    useEffect(() => {
    const fetchUkEvent=()=>{
        fetch("https://api.covid19api.com/total/dayone/country/uk")
        .then(res=>res.json())//API를 불러왔을때 API를 json으로 변경하고
        .then(Ukdata=>UkmakeData(Ukdata))//변환된 json형식의 데이터를 Ukdata를 인자값으로 줘서 콜백함수 호출
        .catch(error => console.log('error', error));//서버에서 불러오지 못할시 에러 출력
    }
    const arr=[];
    const UkmakeData=(ukdata)=>{
        setloadingData(false);
        setLastComfirmedData(ukdata[ukdata.length-1].Confirmed);
        setRecoverComfirmedData(ukdata.[ukdata.length-1].Recovered);
        setlastDeathsData(ukdata.[ukdata.length-1].Deaths);
        setcomparecomfirmed(ukdata.[ukdata.length-1].Confirmed-ukdata[ukdata.length-3].Confirmed);
        setcompareRecover(ukdata.[ukdata.length-1].Recovered-ukdata[ukdata.length-3].Recovered);
        setcompareDeath(ukdata[ukdata.length-1].Deaths-ukdata[ukdata.length-3].Deaths);
        const arr=[];
        ukdata.filter((element)=>{
            const currentDate = new Date(element.Date);
            const year = currentDate.getFullYear();//현재 년도
            const month = currentDate.getMonth();//현재 달
            const date = currentDate.getDate();//현재 날
            const confirmed = element.Confirmed;
            const active = element.Active;
            const deaths = element.Deaths;
            const recovered = element.Recovered;

            const findItem = arr.find(a=>a.year === year && a.month === month);
            if(!findItem)
            {
                arr.push({
                    year,//ES6에서는 키와 value값이 같으면 키값은 생략 가능
                    month,
                    date,
                    confirmed,
                    active,
                    deaths,
                    recovered
                })
            }
        })
        const labels = arr.map((a)=>`${a.month+1}월`);
        setUkconfirmedData({
        labels:labels,
        datasets:[
            {
                label:"영국 누적 확진자",
                backgroundColor:"black",
                fill:false,
                data:arr.map(a=>a.confirmed),
            }
        ]
        },[])
        setUkaquarantinedData({
            labels:labels,
            datasets:[
                {
                    label:"영국 월별 누적 확진자",
                    backgroundColor:"red",
                    fill:false,
                    data:arr.map(a=>a.active),
                }
            ]
        })
        const last = arr[arr.length-1];
        setUkComparedData({
            labels:["확진자","격리해제","사망"],
            datasets:[
                {
                    label:"누적 확진,해제,사망 비율",
                    backgroundColor:["green","yellow","red"],
                    fill:false,
                    data:[last.confirmed,last.recovered,last.deaths],
                }
            ]
        })
    }
    fetchUkEvent();
    },[])
    return (
        <>
        {loadingData ? <Loading></Loading>:
        <div className="uk_contents_wrapper">
            <h2 style={{textAlign:"center"}}>영국 코로나 현황</h2>
        <div className="kr_Count_wrapper">
            <div className="kr_Count_header">
                <p>영국 누적 확진자</p>
            </div>
            <div className="kr_Count_Wrapper">
            <div className="kr_Count">
                <h3>확진자</h3>
                {lastComfirmedData}
                <p><img src={UpArrow}></img>{comparecomfirmed}</p>
            </div>
            <div className="kr_recovered_Count">
                <h3>격리해제</h3>
                {lastRecoveredData}
                <p><img src={UpArrow}></img>{compareRecover}</p>
                </div>
            <div className="kr_deaths_Count">
                <h3>사망자</h3>
                {lastDeathsData}
                <p><img src={UpArrow}></img>{compareDeath}</p>
                </div>
            </div>
        </div>
        <h2 style={{textAlign:"center"}}>영국 코로나 현황</h2>
            <div className="Uk_contents">
            <div>
            <Bar data={UkconfirmedData}></Bar>
            </div>
            <div>
            <Line data={UkquarantinedData}></Line>
            </div>
            <div>
            <Doughnut data={UkComparedData}></Doughnut>
            </div>
            </div>
        </div>}
        </>
    )
}

export default UkContents
