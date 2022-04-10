import logo from './yover_logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import LoginForm from "./Components/LoginForm";
import {useState} from "react";
import AdminView from "./Components/AdminView";
import CustomerView from "./Components/CustomerView";


function App() {

     const[isLoggedIn,setLogin]=useState(false)
     const[isAdmin,setAdmin]=useState(false)
     const[username,setUsername]=useState("")



    return (
    <div className="App" >
      <header className="App-header">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"/>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

        {!isLoggedIn &&
            <body className="App-body-for-login">

            <Container>
                {
                    <LoginForm login={setLogin} isAdmin={setAdmin} setLoggedInIdentity={setUsername}/>
                }

            </Container>
            </body>
        }
        {isLoggedIn &&
            <body className="App-body-for-user-view">

            <Container>
                {isAdmin &&
                    <AdminView username={username}/>
                }
                {!isAdmin &&
                    <CustomerView username={username}/>
                }
            </Container>
            </body>
        }
    </div>

  );
}

export default App;
