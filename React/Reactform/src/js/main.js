
var Comment = React.createClass({
	render:function(){
		return (
			<div>
				<h5>用户注册</h5>
				<MyForm />
			</div>
		);
	}
});

var MyForm = React.createClass({
	getInitialState:function(){
		return {username:'',pwd:''};
	},
	/*handleUserChange:function(e){
		this.setState({username: e.target.value});
	},
	handlePwdChange:function(e){
		this.setState({pwd: e.target.value});
	},*/
	handleChange:function(name,e){
		var newState = {};
		newState[name] = e.target.value;
		this.setState(newState);
	},
	handleSubmit:function(e){
		e.preventDefault();
		console.log(this.state);
	},
	render:function(){
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input 
					type="text" 
					placeholder="请输入姓名" 
					value={this.state.username} 
					onChange={this.handleChange.bind(this,'username')} />
				<input 
					type="pwd" 
					placeholder="请输入密码" 
					value={this.state.pwd} 
					onChange={this.handleChange.bind(this,'pwd')} />
				<input
					type="submit" value="注册"/>
			</form>	
		);
	}
});


ReactDOM.render(
	<Comment />,
  document.getElementById('container')
);
