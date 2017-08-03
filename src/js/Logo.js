import React, {Component} from 'react';
import $ from 'jquery';

class Logo extends Component {
	constructor() {
		super();
		this.state = {
			logo1:null,
			logo2:null
		}
	};
	componentDidMount = function() {
			$.ajax({
			type: "get",
			url: "http://192.168.43.25:8100/cebest/logos",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
                this.setState({
					logo1: e[0].src,
					logo2: e[1].src
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});	
	}
	
	setFiles = function(element) {
		var files = []
		files = element.files[0]
		var fd = new FormData(); //表单处理数据的方法
		fd.append('uploadedFile', files)
		//用append方法以键值对的方式保存
		console.log(fd)
		$.ajax({
			type: "post",
			url: "http://192.168.43.25:8100/cebest/inlogo",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				
				$.ajax({
				type: "post",
				url: "http://192.168.43.25:8100/cebest/uplogo",
				data: {
				"id": element.id
				},
				success: function(e) {
					this.setState({
					logo1: e[0].src,
					logo2: e[1].src
				})
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});

				
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});

	}.bind(this)

	render() {
		return(
			<div className="logos">
<ul>
<li><img src={this.state.logo1}/>  <span>重新选择图片</span>  <input type="file" id="1"  ref="logom1" onChange={this.setFiles.bind(this,this.refs.logom1)}    multiple="multiple"/></li>
<li><img src={this.state.logo2}/>   <span>重新选择图片</span> <input type="file"  id="2"  ref="logom2" onChange={this.setFiles.bind(this,this.refs.logom2)}    multiple="multiple"/></li>
</ul>
      </div>
		);
	}
}

export default Logo;