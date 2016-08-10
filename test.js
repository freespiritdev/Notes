const Title = React.createClass({ //3rd  //This describes how to render this element for this component
  render: function() { //render is a function that returns html
    return (
      <div className="text-center">
        <h1>Welcome to React</h1>
      </div>
    );
  }
});

const Counter = React.createClass({ //4th //{this.state.counter} keeps track of counter
 
  render: function(){
    let {counter, addCount, minusCount} = this.props;  //destructing this.props.allProps;

    return ( //the parenthesis just allows us to return the div on another line
      <div className="text-center">
        <h3>Counter: {counter}</h3> 
        <button onClick={addCount} className="btn btn-success glyphicon glyphicon-plus">+</button> 
        <button onClick={minusCount} className="btn btn-success glyphicon glyphicon-check"></button>
      </div>
    )
  }
});

const NewMessageForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  addMessage: function() {
    // let text = this.state.text; or
    this.props.addMessage(this.state.text);
    this.setState({text: ''}); //re-render the input 

  },
  save: function(){
    this.setState({editing: false});
  },
  remove: function(){
    this.props.onRemove(this.props.index);

  },
  onInputChange:function(event) //kind of like an event handler
  {
    // console.log('change')
    // console.log('change event', event.target)
    // console.log('change event.value', event.target.value)
    this.setState({text: event.target.value}) //we have to tell it to change the value of the input, because it's connected to the state
  },
  render: function(){
    return (
      <div className="text-center">
        <input type="text" value={this.state.text} onChange={this.onInputChange}/>
        <button onClick={this.addMessage} className="btn btn-success glyphicon glyphicon-check"></button>
        <button onClick={this.update} className="btn btn-info glyphicon glyphicon-pencil"></button>
        <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"></button>
      </div>
    );
  }
});

const MessageList = React.createClass({
  render: function() {
    let messages = this.props.messages.map(message => {
      return <li key={message.id}>{message.text}</li>
    }); //putting an array of lis in the ul, turn each messages to an object 

    return (
      <ul>
        {messages}
      </ul>
    )
  }
})

const MessageBoard = React.createClass({
  getInitialState: function() {
    return { //turn each messages to an object 
      messages: []
  };
},
  addMessage: function(text){
    let message = {
      text,
      id: uuid()
  };
  console.log('message:', message);

  this.setState({
    messages: this.state.messages.concat(message)
  }) // pass in as prop in newMessageForm
},
update: function(newText, x){
  let arr = this.state.messages;
  arr[x] = newText;
  this.setState({messages:arr});
},
remove: function(){
    let arr = this.state.messages;
    arr.splice(x, 1);
    this.setState({messages:arr});
  },
oneMessage: function(message, x){
    return (
      <li key={x}
          index={x}
          onChange={this.update}
          onRemove={this.remove}>
         </li>
    );
},
render: function(){
  return (
    <div className="text-center">
      <h1>MessageBoard</h1>
      <NewMessageForm addMessage= {this.addMessage}/>
      <MessageList messages={this.state.messages}/>
      {this.state.messages.map(this.oneMessage)}
    </div>
    )
  }
})

const Root = React.createClass({ //sub component is loaded into another  1st
  getInitialState: function(){ //returns the object that is initial state
    return {
      counter: 0 //this is the initial state
    }
  },
  addCount: function(){
    this.setState({counter: this.state.counter + 1});
  },
  minusCount: function(){
    this.setState({counter: this.state.counter - 1});
  },
  render: function(){   //spread 
    let counterProps = { //destructing
      addCount: this.addCount, //destructing
      minusCount: this.minusCount, //destructing
      counter: this.state.counter //destructing
    };
   return (
    <div>
      <Title/>  
      <Counter {...counterProps} /> 
      <hr/>
      <MessageBoard/>
      {/*Each message board is independent*/}
      <hr/>
      <MessageBoard/>{}
    </div>
   );
  }
});



// const Root = React.createClass({  //Vanilla JS version to the above
//   render: function(){ 
//     return React.createElement('div', {},
//       React.createElement(Title, {}),
//       React.createElement(Counter, {})
//     )
//   }
// });


ReactDOM.render( //2nd
  <Root />,
  document.getElementById('root')
);
