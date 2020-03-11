import React, { useContext, useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { BookContext } from '../context/BookContext';

export const Books = () => {
  const emptyForm = {
    author: "",
    synopsis: "",
    title: ""
  };
  const [bookForm, setBookForm] = useState(emptyForm);
  const { books, setBooks } = useContext(BookContext);
    
  const loadBooks = () => {
    API.getBooks()
      .then(res => {
        setBooks(res.data);
        setBookForm(emptyForm);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const deleteBook = id => {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBookForm({
      ...bookForm,
      [name]: value
    })
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const { author, synopsis, title } = bookForm; 
    if (title && author) {
      API.saveBook({
        title,
        author,
        synopsis,
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>What Books Should I Read?</h1>
          </Jumbotron>
          <form>
            <Input
              value={bookForm.title}
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={bookForm.author}
              onChange={handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              value={bookForm.synopsis}
              onChange={handleInputChange}
              name="synopsis"
              placeholder="Synopsis (Optional)"
            />
            <FormBtn
              disabled={!(bookForm.author && bookForm.title)}
              onClick={handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}
