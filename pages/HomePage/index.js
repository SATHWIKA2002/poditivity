import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  const { getItem, setItem } = useLocalStorage();

  const [poditivityData, setpoditivityData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const getData = useCallback(async () => {
    const poditivityData = JSON.parse(getItem("poditivity_data"));
    if (poditivityData === null) return;
    console.log(poditivityData);
    setpoditivityData(poditivityData);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleAdd = () => {
    navigate("/blog/add");
  };

  const handleDelete = (id) => {
    const filteredData = poditivityData.filter((item) => item.id !== id);
    setItem("poditivity_data", filteredData);
    setpoditivityData(filteredData);
  };

  const handleEdit = (id) => {
    navigate(`/blog/edit/${id}`);
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...poditivityData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
    setpoditivityData(sortedData);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = poditivityData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="main-heading-container">
      
        <h2 className="main-heading">Poditivity Blog App</h2>
        <button className="logout-button"></button>
      </div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <button className="btn btn-dark" onClick={() => handleSort("date")}>
        Sort by Date
      </button>
      <button className="btn btn-success" onClick={handleAdd}>
        Add New Blog
      </button>
      <p className="mt-2">
        Data is Sorted in {sortOrder === "asc" ? "Ascending" : "Descending"}{" "}
        order of {sortField === "name" && "Name"}{" "}
        {sortField === "category" && "Category"}{" "}
        {sortField === "date" && "Date"}
      </p>
      <table>
        <thead>
          <tr>
            <th className="sno">SNo.</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
              <td>
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => navigate(`blog/${item.id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
