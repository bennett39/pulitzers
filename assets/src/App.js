import React from 'react';
import BookList from './Book';

function App() {
  return (
    <div className="App">
      <h1>Pulitzer Reading List</h1>
      <p>A list of all the Pulitzer Prize winning novels, along with a checkbox to track if you've read them.</p>
      <p>Behind the scenes, all data stored in PostgreSQL database. Uses Django REST Framework to serialize data and process requests from React frontend.</p>
      <p>API available at <a href="/api/">/api/</a>.</p>
      <p>Open the console to see requests when you click the checkboxes.</p>
      <BookList />
    </div>
  );
}

export default App;
