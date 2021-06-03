import React,{useState,useEffect} from 'react';
import discover_1 from '../images/discover_1.png';
import matches_1 from '../images/matches_1.png';
import notes_1 from '../images/notes_1.png';
import profile_1 from '../images/profile_1.png';
import "./Discover.css";

export default function Discover(){
    const [loading,setLoading] = useState(0);
    const [showImages,setShowImages] = useState([]);
    const [hiddenImages,setHiddenImages] = useState([]);
    
//here useEffect()/componentDidMount lifecycle method is used to fetch data using API call and also for states updating purpose. 
    useEffect(async()=>{
        setLoading(1); 
       let url="https://testa2.aisle.co/V1/users/test_profile_list";
       let resp = await fetch(url,{
        method: 'GET',
        mode:'cors',
        headers: {
         'Content-Type': 'application/json',
         'Cookie': '__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720',
         'Authorization': localStorage.getItem('Authorization')
        },
         })    

         if(resp.status === 200){
             let response = await resp.json();
             setShowImages(()=>[...response.invites.profiles])
             setHiddenImages(()=> [...response.likes.profiles])
             setLoading(0);                        
         }
         else{
            alert("Error");   
         }
          
    },[])

    return(
        <div className="main">
        <div className="container mt-4 ">             
            {
             loading ?
             <div className="d-flex justify-content-center mt-3">
               <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
               <span class="sr-only">Loading...</span>  
             </div>
             :
             <div>
             <div className="upper">
               <p className="text-center font11">Notes</p>
               <p className="text-center font12">Personal messages to you</p> 
             {
               showImages.map((e)=>{ 
               return(  
             <div className="offset-lg-4 col-lg-4 " >
                   <div className="component1">
                    <div>   
                   <img className="img1" src={e.photos.filter(e=> e.status==="avatar")[0].photo}  /> 
                   </div>
                   <p id="text1">{e.general_information.first_name}</p> 
                   <p id="text2">Tap to review 50+ notes</p>
                   
                   </div>                  
             </div>
               )
             })
                }
             <div className="offset-md-4 col-md-4 offset-lg-4 col-lg-4 row mt-2">
                 <div className="col-8 ">
                     <div className="offset-1 col-10 ">
                     <p id="font13">Interested In You</p>
                     <p id="font14">Premium members can view all their likes at once.</p>
                     </div>
                 </div>
                 <div className="col-4  buttonEle">
                     <button className="btn btn-warning rounded-pill mt-4">Upgrade</button>
                 </div>
             </div>            

             <div className=" offset-lg-3 col-lg-6  d-flex justify-content-evenly ">

               { hiddenImages.map((e)=>{ 
                   return(
                 <div >
                     <div className="component2">
                     <div>    
                     <img className="img2" src={e.avatar}/>
                     </div>
                     <p id="text_1">{e.first_name}</p>
                     </div>
                 </div>
                   )
               })

                }
             </div>
             </div>
 
             <div className="footer footerw d-flex justify-content-evenly">                 
                  
                  <div className="footElement" >
                  <div className="d-flex justify-content-center mt-2">    
                  <img className="imgfooter" src={discover_1}/>
                  </div> 
                  <p className="font2">Discover</p>
                  </div>
 
                  <div className="footElement ">
                  <div className="d-flex justify-content-center mt-2">    
                  <img className="imgfooter" src={notes_1}/>
                  </div> 
                  <p className="font2">Discover</p>
                  </div>
 
                  <div className="footElement">
                  <div className="d-flex justify-content-center mt-2">    
                  <img className="imgfooter" src={matches_1}/>
                  </div> 
                  <p className="font2">Discover</p>
                  </div>
 
                  <div className="footElement">
                  <div className="d-flex justify-content-center mt-2">    
                  <img className="imgfooter" src={profile_1}/>
                  </div> 
                  <p className="font2">Discover</p>
                  </div>
                  
             </div>
             </div>      
           }

        </div>
        </div>
    )
}