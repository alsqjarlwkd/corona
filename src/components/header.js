import React from "react"

const Header=()=>{
    function ChangeValue(){
        let select = document.getElementById("GraphData");
        const Value = select.options[select.selectedIndex].value;
        const krData = document.querySelector(".kr_contents_wrapper");
        const globalData = document.querySelector(".global_contents_wrapper");
        const usaData = document.querySelector(".usa_contents_wrapper");
        const ukData = document.querySelector(".uk_contents_wrapper");
        if(Value == "kr")
        {
            krData.style.display ="block";
            globalData.style.display ="none";
            usaData.style.display ="none";
            ukData.style.display ="none";
        }
        else if(Value == "global")
        {
            krData.style.display ="none";
            globalData.style.display ="block";
            usaData.style.display ="none";
            ukData.style.display ="none";
        }
        else if(Value == "usa")
        {
            krData.style.display ="none";
            globalData.style.display ="none";
            usaData.style.display ="block";
            ukData.style.display ="none";
        }
        else if(Value == "uk")
        {
            krData.style.display ="none";
            globalData.style.display ="none";
            usaData.style.display ="none";
            ukData.style.display ="block";
        }
        else if(Value == "all")
        {
            krData.style.display ="block";
            globalData.style.display ="block";
            usaData.style.display ="block";
            ukData.style.display ="block";
        }
    }
    return(
<header className="header">
    <div className="header_h1">
    <h1>COVID-19</h1>
    </div>
    <select name="select" id="GraphData" onChange={ChangeValue}>
        <option value="all">전체</option>
        <option value="kr">국내</option>
        <option value="global" >세계</option>
        <option value="usa" >미국</option>
        <option value="uk">영국</option>
    </select>
</header>
)
}

export default Header;