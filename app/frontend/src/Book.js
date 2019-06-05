import React from 'react';
import './Book.css';
import Checkbox from './Checkbox.js';

function BookCard(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <p>{props.author}</p>
      <p><em>{props.year_won}</em></p>
      <label>
        <Checkbox checked={props.completed} onChange={props.onClick} />
      </label>
    </div>
  );
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      api_url: "http://127.0.0.1:8000/api/books/",
      books: []
    };
  }

  componentDidMount() {
    fetch(this.state.api_url)
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

  toggle(bookId) {
    let url = this.state.api_url + bookId.toString() + '/';
    let books = this.state.books.slice();
    let payload = {'completed': null};
    for (let i = 0; i < books.length; i++) {
      if (books[i]['id'] === bookId) {
        books[i]['completed'] = !books[i]['completed']
        payload['completed'] = books[i]['completed']
      }
    }
    console.log('Sending {"completed": ' + payload['completed'] + '"} to ' + url);
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
    .then(response => console.log('Success: ', JSON.stringify(response)))
    .catch(error => console.error('Error: ', error));
    this.setState({
      books: books,
    });
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
                completed={book.completed}
                onClick={() => this.toggle(book.id)}
              />
            ))}
          </section>
        </div>
      );
    }
  }
}

export default BookList
