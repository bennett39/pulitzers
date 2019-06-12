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
      hasUser: false,
      host: 'http://127.0.0.1:8000',
      books: [],
      userInfo: [],
    };
  }

  componentDidMount() {
    fetch(this.state.host + '/api/books/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            books: result,
            isLoaded: true
          });
        }
      )
    fetch(this.state.host + '/api/user/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            userInfo: result,
            hasUser: true,
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
    const { error, isLoaded, hasUser, books, userInfo } = this.state;
    if (error) {
      return <h2>Error: {error.message}</h2>
    } else if (!isLoaded) {
      return <h2>Loading...</h2>
    } else if (!hasUser) {
      return <h2>Please Log In</h2>
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
                completed={book.id in userInfo.books_read ? true : false}
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
