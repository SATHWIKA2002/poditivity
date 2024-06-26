import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(date).toLocaleDateString("en-GB", options);
};

const AddBlog = () => {
  const navigate = useNavigate();
  const { setItem, getItem } = useLocalStorage();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [poditivityData, setpoditivityData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const poditivityData = JSON.parse(getItem("poditivity_data"));
    if (poditivityData === null) return;
    setpoditivityData(poditivityData);
  };

  const handleAdd = () => {
    const newData = {
      id: uuidv4(),
      title,
      author,
      content,
      date: formatDate(new Date()),
    };
    const updatedData = [...poditivityData, newData];
    setItem("poditivity_data", updatedData);
    navigate("/");
  };
  return (
    <div className="add-new-item-page-container">
      <div className="add-new-item-container">
        <div className="add-new-item">
          <h3>
            <strong>Add New Blog</strong>
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="my-2"
          />
          <button onClick={handleAdd} className="btn btn-light">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
