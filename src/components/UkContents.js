import React,{useEffect,useState} from 'react'
import {Line,Bar,Doughnut} from 'react-chartjs-2';//차트 가져오기
const UkContents = () => {
    const [UkconfirmedData,setUkconfirmedData] = useState({});
    const [UkquarantinedData,setUkaquarantinedData] = useState({});
    const [UkComparedData,setUkComparedData] = useState({});
    useEffect(() => {
    const fetchUkEvent=()=>{
        fetch("https://api.covid19api.com/total/dayone/country/uk")
        .then(res=>res.json())//API를 불러왔을때 API를 json으로 변경하고
        .then(Ukdata=>UkmakeData(Ukdata));//변환된 json형식의 데이터를 Ukdata를 인자값으로 줘서 콜백함수 호출
    }
    const arr=[];
    const UkmakeData=(ukdata)=>{
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
            <div className="Uk_contents">
            <h2>영국 코로나 현황</h2>
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
    )
}

export default UkContents
