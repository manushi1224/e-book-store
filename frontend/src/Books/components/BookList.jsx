import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "./Slider";

function BookList(props) {
  const [books, setBooks] = useState([]);
  const category = props.category;

  useEffect(() => {
    axios
      .get(`https://manushi1224.pythonanywhere.com/api/${category}/`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [category]);

  return (
    <div>
      <Slider data={books} />
    </div>
  );
}

export default BookList;
