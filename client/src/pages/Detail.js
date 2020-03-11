import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { BookContext } from '../context/BookContext';

const Detail = (props) => {
  const {books} = useContext(BookContext);
  const book = books.find(book => book._id === props.match.params.id);

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {book.title} by {book.author}
              </h1>
              <h3>Likes: {book.likes || 0}</h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {book.synopsis}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
}

export default Detail;
