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
      csrftoken: null,
      books: [],
      userInfo: [],
    };
  }

  componentDidMount() {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    this.setState({csrftoken: getCookie('csrftoken')});
    fetch('/api/books/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            books: result,
            isLoaded: true
          });
        }
      )
    fetch('/api/user/')
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

  toggle(bookId, userInfo) {
    let books_payload = []
    if (userInfo.books_read.includes(bookId)) {
      books_payload = userInfo.books_read.filter(book_id => book_id != bookId)
    } else {
      userInfo.books_read.push(bookId)
      books_payload = userInfo.books_read.slice()
    }
    this.setState({
      userInfo: {
        "user_id": userInfo.user_id,
        "profile_id": userInfo.profile_id,
        "books_read": books_payload
      }
    })

    let url = '/api/profiles/' + userInfo.profile_id.toString() + '/';
    let payload = {
      user: '/api/users/' + userInfo.user_id.toString() + '/',
      books_read: books_payload.map(book => (
        '/api/books/' + book.toString() + '/'
      ))
    };
    console.log('Sending ' + JSON.stringify(payload) + ' to ' + url);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.state.csrftoken
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
    .then(response => console.log('Success: ', JSON.stringify(response)))
    .catch(error => console.error('Error: ', error));
  }

  render() {
    const { error, isLoaded, hasUser, books, userInfo } = this.state;
    if (error) {
      return <h2>Error: {error.message}</h2>
    } else if (!isLoaded) {
      return <h2>Loading...</h2>
    } else if (!hasUser) {
      return <h2>Please <a href="/accounts/login/">Log In</a></h2>
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
                completed={userInfo.books_read.includes(book.id) ? true : false}
                onClick={() => this.toggle(book.id, userInfo)}
              />
            )
        )
      }
          </section>
        </div>
      );
    }
  }
}

export default BookList
