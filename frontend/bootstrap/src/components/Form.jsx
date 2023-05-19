import React, { useEffect, useState } from "react";
import axios from "axios";
import { list, useToast } from "@chakra-ui/react";
import "./form.module.css";

export default function Form() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_year, setPublished_year] = useState("");
  const [ISBN, setISBN] = useState("");
  const [image_url, setImage_url] = useState("");
  const toast = useToast();

  const handleForm = (event) => {
    event.preventDefault();
    const data = {
      title,
      author,
      published_year,
      ISBN,
      image_url,
    };
    axios.post("http://localhost:8080/boot/bookPost", data).then((res) => {
      toast({
        title: `${res.data}`,

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });

   window.location.reload();
  };

  return (
    <div>
      <section>
        <form onSubmit={handleForm}>
          <h1>Book form </h1>
          <input
            type="text"
            required
            autoFocus
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            required
            value={author}
            placeholder="Enter Author name"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            required
            value={published_year}
            placeholder="Enter published_year "
            onChange={(e) => setPublished_year(e.target.value)}
          />
          <input
            type="number"
            required
            value={ISBN}
            placeholder="Enter ISBN "
            onChange={(e) => setISBN(e.target.value)}
          />
          <input
            type="url"
            required
            value={image_url}
            placeholder="Enter image url "
            onChange={(e) => setImage_url(e.target.value)}
          />

          <input
            style={{
              width: "90%",
              backgroundColor: "teal",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            type="submit"
          />
        </form>
      </section>
    </div>
  );
}
