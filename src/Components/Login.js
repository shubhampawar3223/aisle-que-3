import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css';
import Timer from './Timer';

export default function Discover(){
    let [loading,setLoading] = useState(0);
    let [code,setCode] = useState(null);
    let [mobile,setMobile] = useState(null);
    let [otp, setOtp] = useState(0);
    let [otpPhase,setOtpPhase] = useState(0);
    let codeRef = useRef();
    let mobileRef = useRef();
    let otpRef = useRef();
    let history = useHistory();    
    
    //sendOtp() is used to call API to POST mobile no. along with it.
    const sendOtp = async(e)=>{
        setLoading(1);
        e.preventDefault();  
        let _code = codeRef.current.value;
        let _mobile = mobileRef.current.value;
        setCode(()=>codeRef.current.value);
        setMobile(()=> mobileRef.current.value);
        if(_code[0]!=="+" || _code.length !== 3 ){
           alert('Please enter valid country code');    
           setLoading(0);
        }
        else if(_mobile.length !== 10 ){
            alert('Please enter valid mobile no.'); 
            setLoading(0);
        }
        else{
            let url = 'https://testa2.aisle.co/V1/users/phone_number_login';   
            let postData = { 
              number: _code+_mobile
            }

            let resp =  await fetch(url,{
                method: 'POST',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': '__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720'
                },
                body: JSON.stringify(postData)
            })
               let response = await resp.json();
               if(response.status === true){                
                setOtpPhase(1);        
               }
               else
               alert("No. is not authorized");
               setLoading(0);
        }
        
    }
    
    //verifyOtp() is used to make api call for verification of otp.
    const verifyOtp = async(e)=>{
        setLoading(1);
         e.preventDefault();
         let _otp = otpRef.current.value;
         if(otp.length === 0){
             alert("Please enter valid otp");
             setLoading(0);
         }
         else{
            let postData ={
                number:code+mobile,
                otp:_otp
            } 
            let url='https://testa2.aisle.co/V1/users/verify_otp'
            let resp = await fetch(url,{
                   method: 'POST',
                   mode:'cors',
                   headers: {
                    'Content-Type': 'application/json',
                    'Cookie': '__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720'
                },
                body: JSON.stringify(postData)
            })
            let response = await resp.json();
            if(response.token !== null){
                localStorage.setItem("Authorization",response.token);
                history.push('/notes');        
            }
            else{
                alert("Incorrect OTP");
            }
            setLoading(0);
         }
    }

    return(
        <div className="container">
         <div className="offset-1 offset-md-4 offset-lg-4 element">
        {
         otpPhase===0 ?
         <>
        <p className="f1">Get OTP.</p>
        <div className="col-10 f2">Enter Your Phone Number</div>
        <div className="row">
        <div className="col-3 col-lg-1">
            <input ref={codeRef} type="text" className="form-control" placeholder="+91" style={{fontWeight:"bold"}}/>
        </div>
        <div className="col-6 col-lg-4">    
            <input ref={mobileRef} type="text" className="form-control" placeholder="Mobile no." style={{fontWeight:"bold"}}/>
        </div>
        </div>
        <button className="btn btn-warning btn-md rounded-pill mt-4 f3" onClick={sendOtp} style={{fontWeight:"bold"}}>Continue</button>
        </>
        :
        <>
          <p className="f1">{code} {mobile}  <span className="edit" onClick={()=>setOtpPhase(0)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span > </p>
          <p className="f2 col-10">Enter The OTP</p> 
          <div className="col-4">
              <input ref={otpRef} className="form-control " placeholder="Enter OTP" style={{fontWeight:"bold"}}/>
          </div>

          <div>
           <div style={{display:"inline-block"}}>          
          <button  className="btn btn-warning btn-md rounded-pill "style={{fontWeight:"bold"}}  onClick={verifyOtp}>Continue</button>        
          </div>
          <div   style={{display:"inline-block",marginLeft:"1.3rem"}}>  
          <Timer/>
          </div>
          </div>
        </>
        }
        </div>  

           {
             loading ?
             <div className="d-flex justify-content-center mt-3">
               <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
               <span class="sr-only">Loading...</span>  
             </div>
             :null      
           } 

        </div>
    )
}