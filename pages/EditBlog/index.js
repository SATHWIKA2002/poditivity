import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import "./index.css";

const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(date).toLocaleDateString("en-GB", options);
};

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setItem, getItem } = useLocalStorage();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [poditivityData, setpoditivityData] = useState([]);

  const getData = useCallback(async () => {
    const poditivityData = JSON.parse(getItem("poditivity_data"));
    if (poditivityData === null) return;
    setpoditivityData(poditivityData);
    const item = poditivityData.find((item) => item.id === id);
    setAuthor(item.author);
    setContent(item.content);
    setTitle(item.title);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSave = () => {
    const updatedData = poditivityData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
          author: author,
          content: content,
          date: formatDate(new Date()),
        };
      } else {
        return item;
      }
    });
    setItem("poditivity_data", updatedData);
    navigate("/");
  };
  return (
    <div className="add-new-item-page-container">
      <div className="add-new-item-container">
        <h3>Edit</h3>
        <div className="add-new-item">
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
          />
          <button onClick={handleSave} className="btn btn-light">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
