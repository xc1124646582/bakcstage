import React, {Component} from 'react';
import $ from 'jquery';

class Contact extends Component {
	constructor() {
		super();
		this.state = {
			about: null,
			address: "",
			addressEn: "",
			hotlineOne: "",
			hotlineTwo: "",
			emailOne: "",
			emailTwo: "",
			web: "",
			cas: null
		}
	};
	componentDidMount() {
		{ /* 案例列表一*/ }
		$.ajax({
			type: "get",
			url: "http://192.168.43.25:8100/cebest/contact",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
				this.setState({
					about: e[0],
					address: e[0].address,
					addressEn: e[0].addressEn,
					hotlineOne: e[0].hotlineOne,
					hotlineTwo: e[0].hotlineTwo,
					emailOne: e[0].emailOne,
					emailTwo: e[0].emailTwo,
					web: e[0].web
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});

	};

	clearfn = function() {
		$(".fixs").css("display", "none")
	}
	fixeds = function(event) {
		$(".fixs").css("display", "block")
		var cid = event.target.parentElement.className
		this.setState({
			cas: cid
		})
	}.bind(this)
	upsat = function() {
		$.ajax({
			type: "post",
			url: "http://192.168.43.25:8100/cebest/upcontact",
			data: {
				"id": this.state.cas,
				"con": $("#fetext").val()
			},
			success: function(e) {
				this.setState({
					about: e[0],
					address: e[0].address,
					addressEn: e[0].addressEn,
					hotlineOne: e[0].hotlineOne,
					hotlineTwo: e[0].hotlineTwo,
					emailOne: e[0].emailOne,
					emailTwo: e[0].emailTwo,
					web: e[0].web
				})
				$("#fetext").val("")
				$(".fixs").css("display", "none")
				alert("修改成功")
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	render() {
		return(
			<div className="contact"> 
	        	<h2>联系</h2>
	        	<p className="address">
		        	<span>{this.state.address}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="addressEn">
		        	<span>{this.state.addressEn}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="hotlineOne">
		        	<span>{this.state.hotlineOne}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="hotlineTwo">
		        	<span>{this.state.hotlineTwo}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="emailOne">
		        	<span>{this.state.emailOne}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="emailTwo">
		        	<span>{this.state.emailTwo}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<p className="web">
		        	<span>{this.state.web}</span>
		        	<button onClick={this.fixeds}>修改</button>
	        	</p>
	        	<div className='fixs'>
		        	<div className="fixs-box">
			        	<h3>修改</h3>
			        	<input type="text" id="fetext"/>
			        	<p>
				        	<button onClick={this.upsat}>确定</button>
				        	<button onClick={this.clearfn}>取消</button>
			        	</p>
		        	</div>
	        	</div>
        	</div>
		)
	};
}
export default Contact