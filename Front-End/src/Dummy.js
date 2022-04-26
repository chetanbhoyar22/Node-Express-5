import React, {useEffect} from 'react'
import axios from 'axios';

function Dummy() {

    useEffect(()=>{
        axios.post("http://localhost:3001/login", {"email":"chetan@gmail.com", "password":"c123"})
        .then((res) => {
            // console.log(res);
            console.log(res.data);
            localStorage.setItem("jwtToken", res.data.jwtToken)
        })    
        
        const token = localStorage.getItem("jwtToken");
        axios.get("http://localhost:3001/articles",{headers:{"Authorization":`Bearer ${token}`}})
        .then((res) => {
            console.log(res.data);
        })
       });

  return (
    <div style={{textAlign:"center"}}>
        <h1>Frontend + Backend</h1>
        <h3>Check API using inspect element = network - Fetch/XHR - login & articles </h3>
    </div>
  )
}

export default Dummy;