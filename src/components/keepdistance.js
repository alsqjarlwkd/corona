import React from 'react'
import KeepDistanceData from './../Data/Data.json'

const Keepdistance = () => {
    const Data = KeepDistanceData.KeepInstanceData;
    const region = Data.map((data)=><li className="label"style={{marginBottom:"10px"}} key={data.id}>{data.label}</li> );
    const distanceLevel = Data.map((data)=><li className="KeepInstance" style={{marginBottom:"10px"}}key={data.id}>{data.KeepInstance}</li>);
    const Instance15 =()=>{
        document.querySelector(".InstanceLevel15_text").style.display ="block";
        document.querySelector(".InstanceLevel20_text").style.display="none";
    }
    const Instance20 =()=>{
        document.querySelector(".InstanceLevel15_text").style.display ="none";
        document.querySelector(".InstanceLevel20_text").style.display="block";
    }
    return (
        <div className="KeepInstance_Warpper">
            <div className="KeepInstance_Header">
                <h1>거리두기 시.도 별 단계</h1>
            </div>
            <div className="KeepInstance_Layout_flex">
            <div className="KeepInstance_Layout">
                <ul>
                    {region}
                </ul>
                <ul>
                    {distanceLevel}
                </ul>
            </div>
            </div>
            <div className="InstanceLevel_Wrapper">
                <div className="InstanceLevel15"onClick={Instance15}>
                    <span>거리두기 1.5단계</span>
                </div>
                <div className="InstanceLevel2"onClick={Instance20}>
                    <span>거리두기 2단계</span>
                </div>
            </div>
            <div className="InstanceLevel15_text">
            <h4>5인 사적모임 금지</h4>
            <p>전국시행</p>
            <h4>영화관, PC방, 오락실, 학원, 독서실, 놀이공원, 이미용업, 대형마트</h4>
            <p>운영제한 해제</p>
            <h4>식당ㆍ카페(취식금지), 실내체육시설, 노래연습장, 파티룸, 실내스탠딩공연장</h4>
            <p>운영시간 제한 해제</p>
            <h4>방문판매 등 직접판매홍보관</h4>
            <p>운영시간 제한 (22시)</p>
            <h4>유흥시설 6종 (유흥·단란·감성주점, 콜라텍, 헌팅포차, 홀덤펍)</h4>
            <p>운영시간 제한 (22시)</p>
            <h4>행사 제한 인원 (결혼‧장례식)</h4>
            <p>방역수칙 준수하여 실시 (500명 초과 시 지자체 신고·협의)</p>
            <h4>종교활동</h4>
            <p>정규예배 등 30% 이내 (모임·식사·숙박 금지)</p>
            </div>
            <div className="InstanceLevel20_text">
            <h4>5인 사적모임 금지</h4>
            <p>전국시행</p>
            <h4>영화관, PC방, 오락실, 학원, 독서실, 놀이공원, 이미용업, 대형마트</h4>
            <p>운영제한 해제</p>
            <h4>식당ㆍ카페(취식금지), 실내체육시설, 노래연습장, 파티룸, 실내스탠딩공연장</h4>
            <p>운영시간 제한 (22시)</p>
            <h4>방문판매 등 직접판매홍보관</h4>
            <p>운영시간 제한 (22시)</p>
            <h4>유흥시설 6종 (유흥·단란·감성주점, 콜라텍, 헌팅포차, 홀덤펍)</h4>
            <p>운영시간 제한 (22시)</p>
            <h4>행사 제한 인원 (결혼‧장례식)</h4>
            <p>100명 미만</p>
            <h4>종교활동</h4>
            <p>정규예배 등 30% 이내 (모임·식사·숙박 금지)</p>
            </div>
        </div>
    )
}

export default Keepdistance
