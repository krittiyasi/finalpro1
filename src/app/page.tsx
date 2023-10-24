"use client";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import  Image  from "next/image"
import axios from "axios";
import { useEffect, useState } from "react"



export default function Home() {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://nodejs.krittiyasi.repl.co/products")
      .then((response) => {
        setData(response.data);
      });
  }, []);
  return (
   <>
     <Navbar/>
         <div className="loghome">
              <Image src="/homee.png" width={1675} height={700} alt="homee"/>
         </div>
         <div className="{styles.container}">
           <h1 className="container}">
               NEW ARRIVASLS
           </h1>
         </div>
         <div className="App">
          <div className="row">
            {data.map((val, idx) => (
              <div key={idx} className="col">
                <h3>{val.name}</h3>
                <img src={val.Image} />
                {" | "}
                <span>{val.company}</span>
                <span>{val.price}</span>
              </div>
            ))}
          </div>
         </div>
     <Footer/>
   </>
  )
}
