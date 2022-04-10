import React, {useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (opt) => {
        setSelectedOptions(opt);
        props.parentFunction(selectedOptions);
    };

    const createOptionsFromStrings =() =>{
        props.delivloc.map(location => setAvailableOptions(availableOptions=>[...availableOptions,{value: location,label:location}]));
    }
    const [availableOptions,setAvailableOptions] = useState([]);
    const handleShow=()=>{
            if(availableOptions.length===0){
                console.log("da")
                    createOptionsFromStrings();
            }
    }
    return (
    <div onClick={handleShow}>

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={availableOptions}
                onChange={handleChange}
            />

        </div>


    );





}