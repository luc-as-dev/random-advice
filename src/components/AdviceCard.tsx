import React, { useEffect, useState } from 'react'
import "./AdviceCard.css"
import logo from "../assets/images/icon-dice.svg"
import dividerDesktop from "../assets/images/pattern-divider-desktop.svg"
import dividerMobile from "../assets/images/pattern-divider-mobile.svg"

const API = "https://api.adviceslip.com/advice"

type Props = {
  title: string,
  text: string
}

type AdviceData = {
  slip:{
    id: number,
    advice: string
  }
}

export default function AdviceCard({title, text}: Props) {
  const [advice, setAdvice] = useState<null | AdviceData>(null);
  
  async function getAdvice() {
      const response = await fetch(API);
      const data:AdviceData = await response.json();
      setAdvice(data);
  }

  useEffect(()=>{
    getAdvice()
  },[])


  return (
    <div className='advice-card-container'>
      <div className='advice-card-inner'>
        <div className='advice-card-title'>{advice && `ADVICE #${advice.slip.id}`}</div>
        <div className='advice-card-text'>{advice ? `"${advice.slip.advice}"` : "Loading..."}</div>
        <div className='advice-card-divider-desktop'><img src={dividerDesktop} /></div>
        <div className='advice-card-divider-mobile'><img src={dividerMobile} /></div>
      </div>
      <button className='advice-card-button' onClick={getAdvice}><img src={logo}/></button>
    </div>
  )
}