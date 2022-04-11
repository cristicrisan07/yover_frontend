import React, {useEffect, useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SingleSelect(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (opt) => {
        setSelectedOption(opt);
    };
    useEffect(()=>{        props.parentFunction(selectedOption)},[selectedOption])
    const createOptionsFromStrings =() =>{
        props.inputStrings.map(val => setAvailableOptions(availableOptions=>[...availableOptions,{value: val,label:val}]));
    }
    const [availableOptions,setAvailableOptions] = useState([]);
    const handleShow=()=>{
        if(availableOptions.length===0){
            createOptionsFromStrings();
        }
    }
    return (
        <div onClick={handleShow}>

            <Select
                className="basic-single"
                classNamePrefix="select"
                name="color"
                components={animatedComponents}
                options={availableOptions}
                onChange={handleChange}

            />

        </div>


    );





}