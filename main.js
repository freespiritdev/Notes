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
    remove: function(x){
        let arr = this.state.messages;
        arr.splice(x, 1);
        this.setState({messages:arr});
    },
    update: function(newText, x) {
        let arr = this.state.messages;
        arr[x] = newText;
        this.setState({messages:arr});
    },
    oneMessage: function(text, x){
        return (
            <Message key={x} index={x} updateMessage={this.update} deleteMessage={this.remove}>
                {text}
            </Message>);
    },
    render: function() {
        return(
            <div>
               {this.state.messages.map(this.oneMessage)}
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