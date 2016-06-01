
var Comment = React.createClass({ displayName: "Comment",
	render: function () {
		return React.createElement("div", null, React.createElement("h5", null, "用户注册"), React.createElement(MyForm, null));
	}
});

var MyForm = React.createClass({ displayName: "MyForm",
	getInitialState: function () {
		return { username: '', pwd: '' };
	},
	/*handleUserChange:function(e){
 	this.setState({username: e.target.value});
 },
 handlePwdChange:function(e){
 	this.setState({pwd: e.target.value});
 },*/
	handleChange: function (name, e) {
		var newState = {};
		newState[name] = e.target.value;
		this.setState(newState);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		console.log(this.state);
	},
	render: function () {
		return React.createElement("form", { className: "commentForm", onSubmit: this.handleSubmit }, React.createElement("input", {
			type: "text",
			placeholder: "请输入姓名",
			value: this.state.username,
			onChange: this.handleChange.bind(this, 'username') }), React.createElement("input", {
			type: "pwd",
			placeholder: "请输入密码",
			value: this.state.pwd,
			onChange: this.handleChange.bind(this, 'pwd') }), React.createElement("input", {
			type: "submit", value: "注册" }));
	}
});

ReactDOM.render(React.createElement(Comment, null), document.getElementById('container'));