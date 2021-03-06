import React, {Component} from 'react';
import $ from 'jquery';
import conf from './../config';

class Careers2 extends Component {
	/*初始化数据*/
	constructor() {
		super();
		this.state = {
			careers2: [],
			id: null,
			title1: null,
			title2: null,
			con: null
		}
	};
	componentDidMount = function() {
		/*更新页面数据*/
		$.ajax({
			type: "get",
			url: conf.url+"/cebest/careers2",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
				this.setState({
					careers2: e
				})
				console.log(this.state.careers2)
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}
	/*上传图片*/
	setFiles = function(element) {
		console.log(element)
		var files = []
		files = element.files[0]
		var fd = new FormData(); //表单处理数据的方法
		fd.append('uploadedFile', files)
		//用append方法以键值对的方式保存
		console.log(fd)
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/incareers2",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				/*修改图片*/
				$.ajax({
					type: "post",
					url: conf.url+"/cebest/upcareers2img",
					data: {
						"id": this.state.id
					},
					success: function(e) {
						
					}.bind(this),
					error: function() {
						console.log("666")
					}
				});
			}.bind(this),
			error: function() {
				console.log("666")
			}
		})
	}.bind(this)
/*点击修改 弹出框*/
	faser = function(event) {
		$(".car2fix").css("display", "block")
		var aa = event.target
		var id = aa.parentElement.firstElementChild.innerHTML
		/* 获取修改的id*/
		this.setState({
			id: id
		})
	}.bind(this)
	/*点击取消*/
	clearfn = function() {
		$(".car2fix").css("display", "none")
	}
	/* 点击确定*/
	carups = function() {
		var title1 = $("#title1").val()
		var title2 = $("#title2").val()
		var con = $("#con").val()
		/* 判断 每个字段 是否被修改*/
		if($("#title1").val() == "") {
			for(var i = 0; i < this.state.careers2.length; i++) {
				if(this.state.careers2[i].id == this.state.id) {
					title1 = this.state.careers2[i].title1
				}
			}
		}
		if($("#title2").val() == "") {
			for(var i = 0; i < this.state.careers2.length; i++) {
				if(this.state.careers2[i].id == this.state.id) {
					title2 = this.state.careers2[i].title2
				}
			}
		}

		if($("#con").val() == "") {
			for(var i = 0; i < this.state.careers2.length; i++) {
				if(this.state.careers2[i].id == this.state.id) {
					con = this.state.careers2[i].con
				}
			}
		}
		/* 向后台传数据*/
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/upcareers2",
			data: {
				"id": this.state.id,
				"title1": title1,
				"title2": title2,
				"con": con
			},
			success: function(e) {
				/* 更新 修改页面数据*/
				this.setState({
					careers2: e
				})
				$("#title1").val("")
				$("#title2").val("")
				$("#con").val("")
				$(".car2fix").css("display", "none")
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	render() {
		return(
			<div className="careers2">
		<p className="titles">人才 </p>
		<div className="careers2-box">
		<ul>{this.state.careers2.map(function(v,i){
					return <li key={i+1}>
					<span>{v.id}</span> 
					<span><img src={v.img} /></span>    
					<span>{v.title1}</span> 
					<span>{v.title2}</span> 
					<span>{v.con}</span> 
					<button className="setbtns1" onClick={this.faser}>修改</button>  
				</li>
				}.bind(this))}</ul>
<div className='car2fix'>
        	<div className="car2fix-box">
        	<h3>修改</h3>
        	<p>选择要添加的图片   <input type="file" ref="cars1" onChange={this.setFiles.bind(null,this.refs.cars1)}   multiple="multiple"/></p>
        	<p>title1<input type="text" id="title1"/></p>
        	<p>title2<input type="text" id="title2"/></p>
        	<p>con<input type="text" id="con"/></p>
        	
        	
        	
        	<p><button onClick={this.carups}>确定</button><button onClick={this.clearfn}>取消</button></p>
        	
        	</div>
        	</div>			
</div>
      </div>
		);
	}
}

export default Careers2;