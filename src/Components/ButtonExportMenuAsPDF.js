import {Button} from "react-bootstrap";

export default function ButtonExportMenuAsPDF (props){
    const handleClick = () =>{
        fetch("http://localhost:7070/poatenumergi/createPDFMenuFor/"+ props.restName)
            .then(async response => {
                const data = await response;
                //check for response
                if (!response.ok) {
                    //get error message from body or default to response statusText
                    // if(data.length===0)  return Promise.reject("Could not fetch data about the restaurants.");
                    // else{
                        return Promise.reject("Some weird error.");
                  //  }
                }
                else{
                    response.blob().then((blob)=>{const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', "menu.pdf");
                        // 3. Append to html page
                        document.body.appendChild(link);
                        // 4. Force download
                        link.click();
                        // 5. Clean up and remove the link
                        link.parentNode.removeChild(link);})
                    console.log("The file has been received!");
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
