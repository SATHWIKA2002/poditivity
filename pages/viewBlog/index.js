import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../services/localStorage";
import "./index.css";

const ViewBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { getItem } = useLocalStorage();

  const getData = useCallback(() => {
    const poditivityData = JSON.parse(getItem("poditivity_data"));
    if (poditivityData === null) return;
    const item = poditivityData.find((item) => item.id === id);
    if (item) {
      setData(item);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="view-blog-bg-container">
      <div className="view-blog">
        <h1>
          <strong>Title: </strong> {data.title}
        </h1>
        <p>
          <strong>Author: </strong>
          {data.author}
        </p>
        <p>
          <strong>Publication_Date: </strong>
          {data.date}
        </p>
        <p>
          <strong>Content: </strong>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default ViewBlog;
