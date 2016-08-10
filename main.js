const Message = React.createClass({
    getInitialState: function() {
    return {editing: false}
  },
    edit: function(){
        this.setState({editing: true});
    },
    remove: function(){
        this.props.deleteMessage(this.props.index);
    },
     save: function(){
        this.props.updateMessage(this.refs.newText.value, this.props.index);
        this.setState({editing: false});
    },
    renderDefault: function(){
        return (
            <div className="text-center">
                <h4>{this.props.children}</h4>
                <button onClick={this.edit} className="btn btn-info glyphicon glyphicon-pencil"></button>
                <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"></button>
            </div>
        );
    },
    renderChange: function(){
        return (
            <div className="text-center">
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className="btn btn-success glyphicon glyphicon-check"></button>
            </div>
        );

    },
    render: function(){
        if(this.state.editing){
            return this.renderChange();
        } else{
            return this.renderDefault();
        }   
    }
})

const NewMessageForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  addMessage: function() {
    this.props.addMessage(this.state.text);
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div>
        <input type="text"
               value={this.state.text}
               onChange={ e => this.setState({text: e.target.value}) }
         />
        <button className="btn btn-primary" onClick={this.addMessage}>Add</button>
      </div>
    );
  }
});

const MessageList = React.createClass({
  render: function() {
    let messages = this.props.messages.map(message => {
      return <li key={message.id}>{message.text}</li>
    });
    return (
      <ul>
        {messages}
      </ul>
    )
  }
})


const MessageBoard = React.createClass({ 
    getInitialState: function() {
        return{
            messages:
            [
            'Hey', 
            'Yay',
            "Oh No"
            ]
        };
    },
    addMessage: function(text) {
        let message = {
            text,
            id: uuid()
        };
        this.setState({
            messages: this.state.messages.concat(messages)
        })
    },
    remove: function(input){
        let arr = this.state.messages;
        arr.splice(input, 1);
        this.setState({messages:arr});
    },
    update: function(newText, input) {
        let arr = this.state.messages;
        arr[input] = newText;
        this.setState({messages:arr});
    },
    oneMessage: function(text, input){
        return (
            <Message key={input} index={input} updateMessage={this.update} deleteMessage={this.remove}>
                {text}
            </Message>);
    },
    render: function() {
        return(
            <div>
               {this.state.messages.map(this.oneMessage)}
               <hr/>
               <NewMessageForm  addMessage={this.addMessage}/>
               <MessageList messages={this.state.messages}/>
            </div>
        );
    }
});


/*let Movie = React.createClass({
    render: function() {
        return (
            <div className="text-center">
                <h2>{this.props.title}</h2> 
                <h2>{this.props.genre}</h2> 

            </div>
        );
    }
})*/

const Root = React.createClass({
    render: function(){
        return (
            <div className="text-center">
                <h1 >It's a Message Board!</h1>
                <p>Yay!</p>
                <hr/>
                <MessageBoard/>
            </div>
        );

    }
});

ReactDOM.render( 
  <div>
      <Root/>
      {/*<Movie title="Guardians of the Galaxy" genre="Action/Sci-Fi/Comic Book!"/>
      <Movie title="The Matrix" genre="Action/Sci-Fi"/>*/}
  </div>,
  document.getElementById('root')
);