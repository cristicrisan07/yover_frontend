import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Card, Col, Container, Row} from "react-bootstrap";
import AddRestaurantModalWithButton from "./AddRestaurantModalWithButton";
import MyToast from "./MyToast"
import FoodMenu from "./FoodMenu";
import AddFoodButtonWithModal from "./AddFoodButtonWithModal";


const AdminView = (props) => {
    const [HasRestaurant,SetHasRestaurant]=useState(false);
    const [showToast,setshowToast]=useState(false)
    const [restaurant,setRestaurant]=useState(null);
    const [messageForToast,setmessageForToast]=useState("");
    const [viewMenu,setViewMenu]=useState(false);
    const [food,setFood]=useState([]);
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
    useEffect(()=>{if(food.length!==0)
    {
        setViewMenu(true);
    }
    },[food])



    const handleViewMenuClick = () =>{
        fetch("http://localhost:7070/poatenumergi/getFood/" + restaurant.name)
            .then(async response => {
                const data = await response.json();
                //check for response
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    if(data.length===1&&data[0].name==="")  {
                        setmessageForToast("You have not added any dishes yet.");
                        return Promise.reject("Could not fetch data about the food.");
                                }
                    else{
                        return Promise.reject("Some weird error.");
                    }
                }
                else{
                    setFood(data);

                }


            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }
    return (
        <>
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
                               <ButtonToolbar>
                               <Button className="HomepageButton" onClick={handleViewMenuClick} >View menu</Button>
                               <AddFoodButtonWithModal restaurantName={restaurant.name} showToast={setmessageForToast}/>
                               </ButtonToolbar>
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
            <br/>
                    {
                        viewMenu&&
                        <FoodMenu foodList={food}/>
                    }
        </>


    );
};

export default AdminView;