import React, { useEffect, useState } from 'react';
import axios from 'axios';//axios 선언
import {Bar,Doughnut,Line} from 'react-chartjs-2';//차트 가져오기
const Contents=()=>{

    const[confirmedData,setconfirmedData]=useState({
        
        });

    useEffect(()=>{
        const fetchEvents=async()=>{
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")//해당 aPI에서 정보를 get 해온다
            console.log(res);
            makeData(res.data);
        }
        const makeData =(items)=>{
        const arr = items.reduce((acc,cur)=>{
            const currentDate = new Date(cur.Date);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const date = currentDate.getDate();
            const confirmed = cur.Confirmed;
            const active = cur.Active;
            const deaths = cur.Deaths;
            const recovered = cur.Recovered;

            const findItem = acc.find(a=>a.year === year && a.month === month);
            if(!findItem)
            {
            acc.push({
                    year,
                    month,
                    date,
                    confirmed,
                    active,
                    deaths,
                    recovered
                })
            }
            if(findItem && findItem.date <date)
            {
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
        const labels = arr.map(a=>`${a.month+1}월`)
      setconfirmedData({
        labels:labels,
        datasets:[
            {
                label:"국내 누적 확인자",
                backgroundColor:"aqua",
                fill:true,
                data:arr.map(a=>a.confirmed),
            }
        ]
      })
        }
        fetchEvents();//fetchEvents 실행
    })

    return(
        <section>
        <h2>국내 코로나 현황</h2>
        <div className="contents">
            <div>
                <Bar data={confirmedData} options={
                    {title:{display:true,Text:"누적확진자 추이",fontsize:16}},
                    {legend:{display:true,position:"bottom"}}
                }
                ></Bar>
            </div>
        </div>
    </section>
    )
}

export default Contents;