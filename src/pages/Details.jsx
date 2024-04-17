import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCat } from "../service/Service"; // Import the getCat function from your service
import './Details.css';

export function Details() {
    const { index } = useParams();
    const [cat, setCat] = useState(null); // Initialize state to hold the cat details

    useEffect(() => {
        fetchCatDetails();
    }, []); // Fetch cat details on component mount

    const fetchCatDetails = () => {
        getCat(index) // Fetch cat details based on the index parameter
            .then(response => {
                setCat(response.data); // Update state with fetched cat details
            })
            .catch(error => {
                console.error('Error fetching cat details:', error);
            });
    };

    return (
        <div className="detailsPage">
            <div className="detailsContainer">
                {cat ? (
                    <>
                        <h1>Cat Details:</h1>
                        <p style={{ fontSize: '22px' }}>ID: {cat.id}</p>
                        <p style={{ fontSize: '22px' }}>Name: {cat.name}</p>
                        <p style={{ fontSize: '22px' }}>Description: {cat.description}</p>
                        <p style={{ fontSize: '22px' }}>Color: {cat.color}</p>
                        <p style={{ fontSize: '22px' }}>Age: {cat.age}</p>
                    </>
                ) : (
                    <p>Loading cat details...</p>
                )}
            </div>
        </div>
    );
}
