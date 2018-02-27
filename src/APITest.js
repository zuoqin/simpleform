import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class APITest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: 0.0, totalsquare: 100.0, leavingsquare: 50.0,
      longitude: 37.6155600, latitude: 55.7522200, housetype: 'brick', city: 'Moscow'};

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  fetchData(){
    fetch('http://192.168.126.133:5000/estimate?totalsquare=' + this.state.totalsquare +
      '&leavingsquare=' + this.state.leavingsquare +
      '&longitude=' + this.state.longitude + '&latitude=' + this.state.latitude + 
      '&housetype=' + this.state.housetype + '&city=' + this.state.city, {
      method: 'get'
    }).then(function(results){
          return results.json();
        }.bind(this))
      .then(function(data){
          this.setState({
            ...this.state,
            data: data.data
          })
        }.bind(this))
        .catch(function(err) {
      // Error :(
    });
  }


  handleClick(event){
    setTimeout(function() { this.fetchData(); }.bind(this), 10);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Общая площадь:
          <input id="totalsquare" type="text" value={this.state.totalsquare} onChange={this.handleChange} />
        </label>

        <br />

        <label>
          Жилая площадь:
          <input id="leavingsquare" type="text" value={this.state.leavingsquare} onChange={this.handleChange} />
        </label>
        <br />

        <label>
          Широта:
          <input id="latitude" type="text" value={this.state.longitude} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Долгота:
          <input id="longitude" type="text" value={this.state.latitude} onChange={this.handleChange} />
        </label>
        <br />

        <select id="city" value={this.state.city} onChange={this.handleChange}>
          <option value="Moscow">Москва</option>
          <option value="SanctPeterburg">Санкт-Петербург</option>
          <option value="Tula">Тула</option>
          <option value="other">Другой</option>
        </select>
        <br />
        <select id="housetype" value={this.state.housetype} onChange={this.handleChange}>
          <option value="brick">Кирпичный</option>
          <option value="monolith">Монолитный</option>
          <option value="steel">Железобетонный</option>
          <option value="wood">Деревянный</option>
        </select>
        <br />
        <button type="button" onClick={this.handleClick}>
          Получить данные
        </button>

        <br />

        <span style={{display: (this.state.data > 0.1) ? 'block' : 'none'}}>Цена: {this.state.data}</span>
      </form>
    );
  }
}



export default APITest;
