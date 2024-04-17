import React, { useState } from "react";
import { Table } from "../components/Table";
import { Link } from "react-router-dom";
import './Home.css';
import {useNavigate} from 'react-router-dom';

function Home() {
    

    return (
        <div className="home">
            <Table  />
            {/* <button className="button" onClick={handleSortByName}>Sort by Name</button> */}
            <Link to="/chart" className="button"style={{borderRadius: '10px',}}
>
  View Chart
</Link>
        </div>
    );
}

export default Home;
