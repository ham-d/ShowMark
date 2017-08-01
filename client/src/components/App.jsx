import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShowList from './ShowList.jsx';
import ShowInput from './ShowInput.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      toggle: true
    };

    this.handleGetAllRequest = this.handleGetAllRequest.bind(this);
    this.handlePostRequest = this.handlePostRequest.bind(this);
    this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
  }

  componentDidMount() {
    this.handleGetAllRequest();
  }

  handleGetAllRequest() {
    axios.get('/api/shows/fetchAllShows')
      .then(res => {
        console.log('here is the res ', res);
        this.setState({shows: res.data});
      })
      .catch(err => {
        console.log('error in client ', err);
      })
  }
  handlePostRequest(input) {
    axios.post('/api/shows/addShow', {title:input})
      .then(res => {
        alert('successfully added!');
        // this.state.shows.push(res);
        this.setState({shows: [...this.state.shows, res.data]})
      })
      .catch(err => {
        console.log('error in posting ', err);
      })
  }
  handleDeleteRequest(input) {
    axios.delete('/api/shows/deleteShow', {data:{title: input}})
      .then(res => {
        console.log('delete successful');
        alert('delete successful!')
      })
      .catch(err => {
        console.log('delete unsuccessful', err);
      })
  }
  handleUpdateRequest(title) {
  var userRating = prompt('please enter a new rating');
    axios.put('/api/shows/editRating', {title: title, rating: userRating})
      .then(res => {
        this.state.shows.forEach((show, index) => {
          if (show.title === res.data.title) {
            this.state.shows[index] = res.data;
          }
        })
        this.setState({shows: this.state.shows});
      })
      .catch(err => {
        console.log('update unsuccessful', err);
      })
  }
  
  render() {
    return (
      <div className="container">
        <h1>TV show catalog</h1>
          <ShowInput shows={this.state.shows} handlePostRequest={this.handlePostRequest} />
          <ShowList shows={this.state.shows} handleDeleteRequest={this.handleDeleteRequest} handleUpdateRequest={this.handleUpdateRequest} toggle={this.state.toggle}/>
           {/* {this.state.shows ? <ShowList shows={this.state.shows}/> : null }    */}
      </div>
    );
  }
}

export default App;