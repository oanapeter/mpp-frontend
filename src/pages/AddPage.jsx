import React, { useEffect, useState } from "react";
import { addCat } from "../service/Service";
import { getCat, updateCat } from "../service/Service";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import './AddPage.css';

 export function AddPage ()  {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [age, setAge] = useState('')
    const {id} = useParams();
    const navigator = useNavigate();
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        color: '',
        age: ''
    
    })


    
    function pageTitle(){
        if(id){
            return <h1 className="text-center">Update Cat</h1>
        }
        else {
            return <h1 className="text-center">Add Cat</h1>
        }

    }

    function validate(){
        let valid = true;
        const errorsCopy = {...errors};
        if(name === ''){
            errorsCopy.name = 'Name is required';
            valid = false;
        }
        if(description === ''){
            errorsCopy.description = 'Description is required';
            valid = false;
        }
        if(color === ''){
            errorsCopy.color = 'Color is required';
            valid = false;
        }
        if(age === ''){
            errorsCopy.age = 'Age is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }
 
    
    useEffect(() => {
        if(id){
            getCat(id).then((response) =>{
                setName(response.data.name);
                setDescription(response.data.description);
                setColor(response.data.color);
                setAge(response.data.age);
            }).catch((error) => {
                console.error('Error fetching data', error);
            }
            )
        }}, [id])
    
    function saveOrUpdateCat(e) {
        e.preventDefault();

        if(validate()){
            const cat = {name, description, color, age};
            console.log(cat);

            if(id){
                updateCat(id, cat).then((response) => {
                    console.log(response.data);
                    navigator('/cats');
                }).catch(error => {
                    console.error('Error updating data', error);
                })
            } else {
                addCat(cat).then((response) => {
                    console.log(response.data);
                    navigator('/cats');
                }).catch(error => {
                    console.error('Error adding data', error);
                })
            }
        }
    }



    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body"></div>
                    <form>
                        <div className="form-group">
                            <label className="form-label">Name: </label>
                            <input
                                type = "text"
                                placeholder="Enter cat name"
                                name="name"
                                value={name}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                onChange={(e) => setName(e.target.value)}>

                                </input>
                                { errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                <br></br>
                                <br></br>
                            <label className="form-label">Description: </label>
                            <input
                                type = "text"
                                placeholder="Enter cat description"
                                name="description"
                                value={description}
                                className= {`form-control ${errors.description ? 'is-invalid' : ''}`}
                                onChange={(e) => setDescription(e.target.value)}>
                                </input>
                                { errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                <br></br>
                                <br></br>
                            <label className="form-label">Color: </label>
                            <input
                                type = "text"
                                placeholder="Enter cat color"
                                name="color"
                                value= {color}
                                className= {`form-control ${errors.color ? 'is-invalid' : ''}`}
                                onChange={(e) => setColor(e.target.value)}>
                                </input>
                                { errors.color && <div className="invalid-feedback">{errors.color}</div>}
                                <br></br>
                                <br></br>

                            <label className="form-label">Age: </label>
                            <input
                                type = "number"
                                placeholder="Enter cat age"
                                name="age"
                                value= {age}
                                className= {`form-control ${errors.age ? 'is-invalid' : ''}`}
                                onChange={(e) => setAge(e.target.value)}>
                                </input>
                                { errors.age && <div className="invalid-feedback">{errors.age}</div>}
                                <br></br>
                                <br></br>
                            </div>
                            <button className="button" onClick={saveOrUpdateCat}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    );
}
 