import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import AddRestaurantModalWithButton from "./AddRestaurantModalWithButton";

const AdminView = (props) => {
    const getRestaurantByAdmin = () =>{
            fetch("http://localhost:7070/poatenumergi/getRestaurantByAdminUsername/"+props.username)
                .then(async response => {
                const data = await response.json();
                //check for response
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    if(data.name==="")  return false;
                    else{
                        return Promise.reject("Some weird error.");
                    }
                }
                else{
                    console.log(data.name + " " + data.location);
                    return true;
                }

            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
    }
    const [HasRestaurant,SetHasRestaurant]=useState(getRestaurantByAdmin);
    return (
              <Card className="cardA" style={{ width: '30rem' }} body >welcome {props.username}.
                  <br/>
                  {!HasRestaurant&&
                      <AddRestaurantModalWithButton adminusername={props.username}/>
                  }
                  {
                      HasRestaurant&&
                      <Button className="HomepageButton">Menu</Button>
                  }
              </Card>
    );
};

export default AdminView;