import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import AddRestaurantModalWithButton from "./AddRestaurantModalWithButton";
import MyToast from "./MyToast"


const AdminView = (props) => {
    const [HasRestaurant,SetHasRestaurant]=useState(false);
    const [showSuccessToast,setshowSuccessToast]=useState(false)
    const HasAddedRestaurant = () =>{
        SetHasRestaurant(true)
        setshowSuccessToast(true);
    }
    const getRestaurantByAdmin = () =>{
        if(HasRestaurant===false) {
            fetch("http://localhost:7070/poatenumergi/getRestaurantByAdminUsername/" + props.username)
                .then(async response => {
                    const data = await response.json();
                    //check for response
                    if (!response.ok) {
                        //get error message from body or default to response statusText
                        if (data.name === "") return false;
                        else {
                            return Promise.reject("Some weird error.");
                        }
                    } else {
                        console.log(data.name + " " + data.location);
                        SetHasRestaurant(true);

                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
    }

    useEffect(getRestaurantByAdmin)

    return (
        <>
        <Card body className="cardA" style={{ width: '30rem' }}>
            welcome {props.username} .
            <br/>
            {!HasRestaurant&&
                              <AddRestaurantModalWithButton adminusername={props.username} setrestaurantstate={HasAddedRestaurant}/>
                           }
                           {
                               HasRestaurant&&
                               <Button className="HomepageButton">View menu</Button>
                           }
        </Card>
            {
                showSuccessToast&&
                <MyToast/>
            }
        </>

    );
};

export default AdminView;