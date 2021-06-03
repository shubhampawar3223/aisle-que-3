import React from 'react';
import {BrowserRouter as Router ,Route,Switch,Redirect} from 'react-router-dom';
import Login from './Components/Login';
import Discover from './Components/Discover';

const ProtectedRoute = ({component:Component,...restProps}) => {
  return(
    <Route
       {...restProps} 
       render={
            (props)=>{
                 if(localStorage.getItem('Authorization') === null)
                 return <Redirect to={`/`} />
                 else{
                   return(
                       <>
                          <Component {...props}/>
                       </>                     
                   )
                 }
            }        
       }     
    />
  )
}

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Login}/>    
          <ProtectedRoute exact path="/discover" component={Discover}/>   
      </Switch>
    </Router>
  );
}

export default App;
