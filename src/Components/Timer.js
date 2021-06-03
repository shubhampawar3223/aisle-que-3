import React,{useState,useEffect} from 'react';

export default function Timer (){
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [resend,activateResend] = useState(0);    
    
    useEffect(() => {

      if (!seconds && !minutes) {
        activateResend(1);
        return;
      }
  

      const intervalId = setInterval(() => {
        if(seconds >0)  
        setSeconds(seconds - 1);
        if(minutes === 1){
            setMinutes(0);
            setSeconds(59);
        }
      }, 1000);
  
      
      return () => clearInterval(intervalId);
      
    }, [seconds]);
  
    return (
      <div className="mt-4 ">
        <span >
         {
         !resend?   
        <span style={{fontWeight:"bold",fontSize:"1.2rem"}}>{minutes <10 ? `0${minutes}`:minutes} : {seconds <10 ? `0${seconds}`:seconds}</span>
        :
        <button class="btn btn-danger" onClick={()=>{activateResend(0);setSeconds(60);}}>Resend OTP</button>     
         } 
        </span>
      </div>
    );
  };


