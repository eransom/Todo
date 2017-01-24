import React, { Component } from 'react';
import base from './config'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      userName: "",
      toDo: []
    }
    this.auth = base.auth()
  }

  componentDidmount () {
   base.syncState('toDo', {
   state: 'toDo',
   context: this,
   asArray: true
 })
}

  addToDo (e) {
    if(e.keyCode === 13) {
    let text = this.input.value.trim()
    let newToDo = {text: text}
    let newToDoArray = this.state.toDo.concat(newToDo)
    this.setState({
      toDo: newToDoArray
    })
    this.input.value = ""
    }
  }


  deleteItem(index){
  var newList = this.state.toDo;
  newList.splice(index, 1);
  this.setState({
    toDo: newList
   })
 }


// completeItem(completeItem) {
//  var newTodos = this.state.todos.map(item => {
//    if (item !== completeItem) {
//      return item
//    } else {
//      item.complete = !item.completeItem
//      return item
//    }
//  })
//  this.setState ({
//    todos:newTodos
//  })
// }
//

// editItems () {
//  if (this.state.classFill === "") {
//    this. setState({classFill: 'editing'})
//  }
// }


  render() {
    return (
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input onKeyUp={this.addToDo.bind(this)} className="new-todo" placeholder="What needs to be done?" ref={element => this.input = element} autofocus />
          </header>
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label for="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
            {this.state.toDo.map((todo, index) => {
              return <li key={index}>
                <div className="view">
                  <input className="toggle" type="checkbox" checked />
                  <label>{todo.text}</label>
                  <button ref={button => this.button = button}
                  onClick={this.deleteItem.bind(this)} className="destroy"></button>
                </div>
                <input className="edit" value="Create a TodoMVC template" />
              </li>
             })
           }
              <li>
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>Buy a unicorn</label>
                  <button onClick={this.deleteItem.bind(this)} className="destroy"></button>
                </div>
                <input className="edit" value="Rule the web" />
              </li>
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count"><strong>0</strong> item left</span>
            <ul className="filters">
              <li>
                <a className="selected" href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </section>
      )
    }
  }

export default App;
