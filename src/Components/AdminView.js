import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import AddRestaurantModalWithButton from "./AddRestaurantModalWithButton";
import MyToast from "./MyToast"


const AdminView = (props) => {
    const [HasRestaurant,SetHasRestaurant]=useState(false);
    const [showToast,setshowToast]=useState(false)
    const [restaurant,setRestaurant]=useState(null);
    const [messageForToast,setmessageForToast]=useState("");
    const HasAddedRestaurant = () =>{
        SetHasRestaurant(true)
        setmessageForToast("Sword and gun day baby .");
    }
    useEffect(()=>{
        if(messageForToast!==""){
            setshowToast(true);
        }
    },[messageForToast])
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
                        console.log(data.name + " " + data.location +"\n" +data.deliveryZones);
                        setRestaurant(data);
                        SetHasRestaurant(true);

                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
    }

    useEffect(getRestaurantByAdmin)



    const handleViewMenuClick =()=>{

    }
    return (
        <Row>

            <Col>
            <Card body className="cardA" style={{ width: '30rem' }}>
            welcome {props.username} .
            <br/>
            {!HasRestaurant&&
                              <AddRestaurantModalWithButton adminusername={props.username} setrestaurantstate={HasAddedRestaurant}/>
                           }
                           {
                               HasRestaurant&&
                               <Button className="HomepageButton" >View menu</Button>
                           }
        </Card>
            </Col>
            <Col md={7} className="mb-2">
                {
                    showToast&&
                    <MyToast messageToShow={messageForToast}/>
                }
            </Col>

        </Row>

    );
};

export default AdminView;