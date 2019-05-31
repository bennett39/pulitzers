import React from 'react';
import './Book.css';

function BookCard(props) {
  return (
    <div className="card">
      {props.year_won}: {props.title} - {props.author}
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
        <section class="cards">
          {books.map(book => (
            <BookCard year_won={book.year_won} title={book.title} author={book.author} />
          ))}
        </section>
      );
    }
  }
}

export default BookList

