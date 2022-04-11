import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import MultipleSelect from "./MultipleSelect";


const AddRestaurantModalWithButton = (props) => {

    const [show, setShow] = useState(false);
    const [errorMessageForLabel,seterrorMessageForLabel]=useState("");
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [selDelivLoc,setDelivLoc]=useState([]);
    const [availableLocations,setAvailableLocations]=useState([]);
    const [nbavailloc,setnbavailloc]=useState(-1);

    //useEffect((props) => {if(errorMessageForLabel==="You have successfully added the restaurant."){setShow(false)}},[errorMessageForLabel])
    //useEffect((props) => {setShow(false)},[props.setrestaurantstate])


    const handleClose = () => {
        setShow(false)

    }
    const initializeModal = () => {
        setName("");
        setLocation("")
        seterrorMessageForLabel("")
    }
    const validateRestaurantData= () => {
        if (name === "") {
            seterrorMessageForLabel("You must provide a name.");
            return false;
        }
        if (location === "") {
            seterrorMessageForLabel("You must provide a location.");
            return false;
        }
        if(selDelivLoc.length ===0)
        {
            seterrorMessageForLabel("Choose at least one delivery location.");
            return false;
        }
  return true;
    }


    const handleSubmit = async () => {
            //console.log("at submit:"+selDelivLoc);
        if (validateRestaurantData()) {
            let d = {
                name: name,
                location: location,
                deliveryZones: selDelivLoc.map(el => el.label),
                restaurantAdministratorUsername: props.adminusername

            }
            let response = await fetch("http://localhost:7070/poatenumergi/addRestaurant", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(d)
            }).then(function (res) {
                return res.text();
            }).then(function (da) {
               seterrorMessageForLabel(da);
               if(da==="You have successfully added the restaurant.") {
                   props.setrestaurantstate()
                   handleClose();
               }
            })



            }

    }
    const getDeliveryLocations = async () =>{
        fetch("http://localhost:7070/poatenumergi/getDeliveryLocations")
            .then(async response => {
                const data = await response.json();
                //check for response
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    if(data.length===0)  return Promise.reject("Could not fetch data about the delivery zones.");
                    else{
                        return Promise.reject("Some weird error.");
                    }
                }
                else{

                    setnbavailloc(data.length);
                      data.map(el => setAvailableLocations(availableLocations => [...availableLocations,el]));
                }


            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    const handleShow = () => {setShow(true);
            if(nbavailloc===-1){
            getDeliveryLocations();
                }

    }
    // useEffect(()=>console.log("in add with restaurant modal: "+selDelivLoc),[selDelivLoc])
    return (
        <>
            <Button className={"HomepageButton"} onClick={handleShow}>Add Restaurant</Button>
            <Modal className="ModalStyle" style={{opacity:1}} show={show}  onShow={initializeModal} onHide={handleClose}
                   {...props}
                   size="mb"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Join us.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">

                                <Col sm={3}>
                                    <Form.Control type="name" placeholder="How is your restaurant called?" onChange={(e)=>setName(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">

                                <Col sm={3}>
                                    <Form.Control type="location" placeholder="Where can our couriers find you?" onChange={(e)=>setLocation(e.target.value)}/>
                                </Col>
                            </Form.Group>

                            {
                                errorMessageForLabel!==""&&
                                <>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalLabel">

                                        <Col sm={2}>
                                            <Form.Label>{errorMessageForLabel}</Form.Label>
                                        </Col>
                                    </Form.Group>
                                </>

                            }
                            <br/>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLabel2">

                                <Col sm={3}>
                                    <Form.Label>Where do you deliver?</Form.Label>
                                </Col>
                            </Form.Group>
                            {availableLocations.length===nbavailloc &&

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLabel2">
                                <Col sm={3}>
                                    <MultipleSelect parentFunction={setDelivLoc} delivloc={availableLocations}/>
                                </Col>
                            </Form.Group>
                                }

                            <Button className="HomepageButton" onClick={(e) => handleSubmit(e)}>
                                Submit
                            </Button>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddRestaurantModalWithButton;