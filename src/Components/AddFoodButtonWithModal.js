import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import MultipleSelect from "./MultipleSelect";
import React, {useEffect, useState} from "react";
import SingleSelect from "./SingleSelect";

export default function AddFoodButtonWithModal (props) {
    const [show, setShow] = useState(false);
    const [availableCategories,setAvailableCategories]= useState([]);
    const [nbavailcat,setnbavailcat]=useState(-1);
    const [errorMessageForLabel,seterrorMessageForLabel]=useState("");
    const [name,setName]=useState("");
    const [category,setCategory]=useState("");

    const initializeModal = () => {
        setName("");
        setCategory("")
        seterrorMessageForLabel("")
    }
    const getCategories = () =>{
        fetch("http://localhost:7070/poatenumergi/getFoodCategories")
            .then(async response => {
                const data = await response.json();
                //check for response
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    if(data.length===0)  return Promise.reject("Could not fetch data about the food categories.");
                    else{
                        return Promise.reject("Some weird error.");
                    }
                }
                else{

                    setnbavailcat(data.length);
                    data.map(el => setAvailableCategories(availableCategories => [...availableCategories,el]));
                }


            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }
    const handleShow =()=>{
        setShow(true);
        if(nbavailcat===-1){
            getCategories();
        }
    }
    const handleClose = () => {
        setShow(false)
    }
    const validateFoodData = () =>{
        if (name === "") {
            seterrorMessageForLabel("You must provide a name.");
            return false;
        }
        if(category===""){
            seterrorMessageForLabel("Choose at least one category.");
            return false;
        }
    return true;
    }

    const  handleSubmit = async () => {
        if (validateFoodData()) {
            let d = {
                name: name,
                category: category.label,
                restaurantName: props.restaurantName

            }
            let response = await fetch("http://localhost:7070/poatenumergi/addFood", {
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
                if (da === "Food added successfully.") {
                    props.showToast("You have added: " + name + " to the menu.");
                    handleClose();
                }
            })
        }
    }
  //  useEffect(() => console.log(category),[category])
    return (
    <>
        <Button className={"HomepageButton"} onClick={handleShow}>Add Food</Button>
        <Modal className="ModalStyle" style={{opacity:1}} show={show}  onShow={initializeModal} onHide={handleClose}
               {...props}
               size="mb"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Good food brings people together.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">

                            <Col sm={3}>
                                <Form.Control type="name" placeholder="The name of the master piece." onChange={(e)=>setName(e.target.value)} />
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
                                <Form.Label>Category:</Form.Label>
                            </Col>
                        </Form.Group>
                        {availableCategories.length===nbavailcat &&

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLabel2">
                                <Col sm={3}>
                                    <SingleSelect parentFunction={setCategory} inputStrings={availableCategories}/>
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
)
}