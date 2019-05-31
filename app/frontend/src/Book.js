import React from 'react';
import './Book.css';

function BookCard(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <p>{props.author}</p>
      <p><em>{props.year_won}</em></p>
    </div>
  );
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/books/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result
          });
        }
      )
  }

  render() {
    const { error, isLoaded, books } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="centered">
          <section className="cards">
            {books.map(book => (
              <BookCard
                key={book.id}
                year_won={book.year_won}
                title={book.title}
                author={book.author}
              />
            ))}
          </section>
        </div>
      );
    }
  }
}

export default BookList

