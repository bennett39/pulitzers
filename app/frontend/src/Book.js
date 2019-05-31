import React from 'react';

function BookCard(props) {
  return (
    <div>
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
        <div>
          {books.map(book => (
            <BookCard year_won={book.year_won} title={book.title} author={book.author} />
          ))}
        </div>
      );
    }
  }
}

export default BookList

