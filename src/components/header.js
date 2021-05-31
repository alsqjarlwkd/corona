import React from "react"

const Header=()=>{
    return(
<header className="header">
    <h1>COVID-19</h1>
    <select>
        <option>국내</option>
        <option>세계</option>
        <option>미국</option>
        <option>영국</option>
        <option>프랑스</option>
        <option>일본</option>
        <option>중국</option>
    </select>
</header>
    )
}

export default Header;