import React,{useEffect,useState} from 'react'
import axios from 'axios';//axios 선언
import {Line,Bar, Doughnut} from 'react-chartjs-2';//차트 가져오기
const UsaContents = () => {

    const [UsaConfirmedData,setUsaConfirmedData] = useState({});
    const [UsaquarantinedData,setUsaquarantinedData] = useState({});
    const [UsaComparedData,setUsaComparedData] = useState({});
    useEffect(() => {
        const fetchUsaEvent = async() =>{
            const USA = await axios.get("https://api.covid19api.com/total/dayone/country/us")
            const UsaData = USA.data;
            makeUsaData(UsaData);
        }
        const makeUsaData=(usaData)=>{
            const arr = usaData.reduce((acc,cur)=>{
            const currentDate = new Date(cur.Date);//cur.Date 에서 Date 메소드를 이용하여 데이터에 들어있는 날짜 값을 불러옴
            const year = currentDate.getFullYear();//년도
            const month = currentDate.getMonth();//달
            const date = currentDate.getDate();
            const confirmed = cur.Confirmed;
            const active = cur.Active;
            const deaths = cur.Deaths;
            const recovered = cur.Recovered;
            const findItem = acc.find(a=>a.year === year && a.month === month);
            if(!findItem)
            {
            acc.push({//기존 acc는 누산값임으로 값이 존재하지 않기때문에 acc 빈 배열에 값을 푸시함
                    year,//ES6에서는 키와 value값이 같으면 키값은 생략 가능
                    month,
                    date,
                    confirmed,
                    active,
                    deaths,
                    recovered
                })
            }
            if(findItem && findItem.date<date)//findItem에서 년도와 월이 동일하고 findItem에 있는 Date보다 새롭게 불러와지는 Date가 더 높으면 findItem의 값을 새롭게 불러와지는 값을 적용시킴
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
        const labels = arr.map(a=>`${a.month+1}월`);
        setUsaConfirmedData({
            labels:labels,
            datasets:[
                {
                    label:"미국 누적 확인자",
                    backgroundColor:"black",
                    fill:false,
                    data:arr.map(a=>a.confirmed),
                }
            ]
        })
        setUsaquarantinedData({
            labels:labels,
            datasets:[
                {
                    label:"미국 월별 누적 확진자",
                    backgroundColor:"red",
                    fill:false,
                    data:arr.map(a=>a.active),
                }
            ]
        })
        const last = arr[arr.length-1];
        setUsaComparedData({
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
        fetchUsaEvent();
    }, [])
    return (
        <div>
        <section>
        <h2>미국 코로나 현황</h2>
        <div className="contents">
        <div className="Global_Bar">
            <Bar data={UsaConfirmedData}></Bar>
        </div>
        <div className="Global_Doughnut">
            <Line data={UsaquarantinedData}></Line>
        </div>
        <div className="Global_Doughnut">
            <Doughnut data={UsaComparedData}></Doughnut>
        </div>
        </div>
        </section>    
        </div>
    )
}

export default UsaContents
