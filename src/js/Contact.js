import React, {Component} from 'react';
import $ from 'jquery';
import conf from './../config';

class Contact extends Component {
	/* 初始化状态*/
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
		
		/* 初始化页面数据*/
		$.ajax({
			type: "get",
			url: conf.url+"/cebest/contact",
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
/* 点击取消*/
	clearfn = function() {
		$(".fixs").css("display", "none")
	}
	/* 点击修改  显示输入框*/
	fixeds = function(event) {
		$(".fixs").css("display", "block")
		var cid = event.target.parentElement.className
		/* 获取 学要修改的id*/
		this.setState({
			cas: cid
		})
	}.bind(this)
	/*点击确认按钮*/
	upsat = function() {
		var texts = $("#fetext").val()
		var aa=null
		if($("#fetext").val() == "") {
			aa=this.state[this.state.cas]
			texts=aa
		}
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/upcontact",
			data: {
				"id": this.state.cas,
				"con": texts
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