import React, { useEffect, useContext } from "react";
import "./Table.css"
import {BsFillPencilFill, BsFillTrashFill, BsPlusCircle} from "react-icons/bs"
import { Link } from "react-router-dom"
import { useState } from "react";
import { listCats, deleteCat } from "../service/Service";
import {useNavigate} from 'react-router-dom';
import { CatsContext } from "../model/Context";

export const Table = () =>{
    const { cats, setCats } = useContext(CatsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const navigator = useNavigate();
  const totalPages = cats ? Math.ceil(cats.length / rowsPerPage) : 0;
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const records = Array.isArray(cats) ? cats.slice(firstIndex, lastIndex) : [];

    useEffect(() => {
        getAllCats();
    }, [])

    function getAllCats(){
        listCats().then((response) => {
            setCats(response.data)
        }).catch((error) => {
            console.error('Error fetching data', error)
        })
    }


    function addNewCat() {
        navigator('/add-cat')

    }

    function updateCat(id){
        navigator(`/update-cat/${id}`)
    }

    function seeDetails(id){
        navigator(`/entity/${id}`)
    }

    function deleteCatById(id){
        console.log(id)
    
        deleteCat(id)
          .then((response) => {
              getAllCats();
          })
          .catch((error) => {
              console.error('Error deleting data', error)
          });
    }
    


    function nextPage(){
        if(currentPage !== totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }

    }

    function changeCurrentPage(id){
        setCurrentPage(id)

    }

    return (
    <div className="tableWrapper">
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {records.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>
                                <span className="actions">
                                    <BsFillTrashFill className="deleteButton" onClick={() => deleteCatById(cat.id)}/>
                                    <BsFillPencilFill className="updateButton" onClick={() => updateCat(cat.id)}/>
                                        <BsPlusCircle className="detailsButton" onClick={()=> seeDetails(cat.id)} />
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
        <div>
        <nav className="paginationWrapper">
    <ul className="pagination">
        <li className="page-item">
            <a href='#' className='page-link' onClick={prePage}>
                Prev
            </a>
        </li>
        {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href='#' className='page-link' onClick={()=>changeCurrentPage(n)}>
                    {n}
                </a>
            </li>
        ))}
        <li className="page-item">
            <a href='#' className='page-link' onClick={nextPage}>
                Next
            </a>
        </li>
    </ul>
</nav>
</div>
<button className='button' onClick={addNewCat} style={{ display: 'block', margin: '20px auto 0', width: '100px', padding: '10px 15px', borderRadius: '10px'}}>Add</button>

<br></br>

    </div>)
};