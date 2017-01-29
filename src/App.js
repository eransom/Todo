import React, { Component } from 'react';
import base from './config'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      toDo: []
    }
  }

  componentDidMount () {
   this.sync = base.syncState('toDo', {
   state: 'toDo',
   context: this,
   asArray: true
 })
}

  addToDo (e) {
    if(e.keyCode === 13) {
    let text = this.input.value.trim()
    let newToDo = {
      text: text,
      complete: false
    }
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


  completeItem(completedToDo) {
   var newTodos = this.state.toDo.map(item => {
     if (item !== completedToDo) {
       return item
     } else {
       item.complete = !item.complete
      console.log('here is: ', item)
       return item
     }
   })
   this.setState ({
     toDo:newTodos
   })
   console.log('after setting state: ', this.state.toDo)
  }


  // editItems () {
  //  if (this.state.classFill === "") {
  //    this. setState({classFill: 'editing'})
  //  }
  // }

  clearCompleteCheck () {
    if (this.state.toDo.some(toDo => toDo.complete === true)) {
      return <button className="clear-completed">Clear completed</button>
    }
  }

  // clearAllComplete() {
  //   if (this.state.toDo)
  // }


  render() {
    console.log(this.state)
    return (

      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input onKeyUp={this.addToDo.bind(this)} className="new-todo" placeholder="What needs to be done?" ref={element => this.input = element} autoFocus />
        </header>

        <section className="main">

          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {this.state.toDo.map((todo, index) => {
            return <li key={index}>
            <div className="view">
              <input onClick={() => this.completeItem(todo)} className="toggle" type="checkbox" defaultChecked={todo.complete} />
              <label>{todo.text}</label>
              <button ref={button => this.button = button}
              onClick={this.deleteItem.bind(this)} className="destroy"></button>
            </div>
            <input className="edit" value="Create a TodoMVC template" />
            </li>
             })
           }
          </ul>
        </section>

        <footer hidden={this.state.toDo.length === 0} className="footer">
          <span  className="todo-count"><strong>{this.state.toDo.length}</strong> item left</span>
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
          {this.clearCompleteCheck()}
        </footer>
      </section>
    )
  }
}

export default App;
