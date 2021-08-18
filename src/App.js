import "./App.css";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [data,setData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);


  useEffect(async () => {
    const response1 = await response1Data();
    setUsers(response1);
  },[]);

  useEffect(async () => {
    const response = await responseData();
    setData(response);
  },[]);

  const responseData = async() => {
    const response =  await axios.get('https://reqres.in/api/users?page=2');
   console.log(response?.data);
    return response?.data;
  }

const response1Data = async() => {
  const response =  await axios.get('https://reqres.in/api/users?page=2');
 console.log(response?.data?.data.map((user) => user));
  return response?.data?.data.map((user) => user);
}


  const pagesVisited = pageNumber * data?.per_page;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + data?.per_page)
    .map((user) => {
      return (
        <div className="user">
          <img src={user?.avatar} style={{borderRadius:"50%"}}></img>
          <h3>{user.first_name}</h3>
          <h3>{user.last_name}</h3>
          <h3>{user.email}</h3>
        </div>
      );
    });

  const pageCount = Math.ceil(data?.total / data?.per_page);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      {displayUsers}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
