import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styles from "./books.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
function Books() {
  const [list, setList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_year, setPublished_year] = useState("");
  const [ISBN, setISBN] = useState("");
  const [image_url, setImage_url] = useState("");
  const toast = useToast();

  //get data fun
  const getData = () => {
    axios
      .get("http://localhost:8080/boot/books")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log("someting went wrong");
      });
  };

  //handle delete
  const hanleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/boot/deletePost/${id}`)
      .then((res) => {
        toast({
          title: `${res.data}`,

          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getData();
      })
      .catch((err) => {
        toast({
          title: "someting went wrong",

          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  //handle open
  const hanleOpen = (data) => {
    onOpen();
    setTitle(data.title);
    setAuthor(data.author);
    setPublished_year(data.published_year);
    setISBN(data.ISBN);
    setImage_url(data.image_url);
  };
  //handle edit
  const handleEdit = (e, id) => {
    e.preventDefault();
    const data = {
      title,
      author,
      published_year,
      ISBN,
      image_url,
    };
    axios
      .patch(`http://localhost:8080/boot/editBook/${id}`, data)
      .then((res) => {
       
        toast({
          title: `${res.data}`,

          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
    onClose();
    getData();
  };

  console.log(list);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.booksContainer}>
        
        {list.length > 0 &&
          list.map((ele) => {
            return (
              <div key={ele._id} className={styles.singleDiv}>
                <img src={ele.image_url} alt="image" height="50px" />
                <h3> {ele.title.toUpperCase()}</h3>
                <p>Author: {ele.author}</p>
                <p>Published Year:{ele.published_year}</p>
                <p>ISBN:{ele.ISBN}</p>
                <Button
                  marginRight={"5px"}
                  onClick={() => hanleOpen(ele)}
                  colorScheme="teal"
                >
                  Edit
                </Button>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Update your Book data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <section>
                        <form onSubmit={(e) => handleEdit(e, ele._id)}>
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
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Button onClick={() => hanleDelete(ele._id)} colorScheme="red">
                  Delete
                </Button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Books;
/*{list.length > 0 &&
            list.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.name}</td>
                  <td>{ele.mobileNumber}</td>
                  <td>{ele.email}</td>
                  <td>
                    <Button
                      onClick={() => hanleOpen(ele)}
                      height={5}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Edit
                    </Button>

                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Update your form</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <section>
                            <form onSubmit={() => handleEdit(ele._id)}>
                              <input
                                type="text"
                                required
                                autoFocus
                                value={name}
                                placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
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
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </td>
                  <td>
                    <Button
                      onClick={() => hanleDelete(ele._id)}
                      height={5}
                      colorScheme="red"
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </div>
      ) : (
        ""
      )}*/
