import {Button} from "react-bootstrap";

export default function ButtonSendAdvertisement (props) {

    const handleClick = () =>{
        fetch("http://localhost:7070/poatenumergi/sendAdvertisingEmails/"+ props.restName)
            .then(async response => {
                await response;
                //check for response
                if (!response.ok) {
                    return Promise.reject("Some weird error.");
                }
                else{
                    console.log("The emails have been sent!");
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    return(
        <Button className="HomepageButton" onClick={handleClick}>{props.textOfButton}</Button>
    )
}


