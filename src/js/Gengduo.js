import React, {Component} from 'react';
import $ from 'jquery';
import conf from './../config';

class Gengduo extends Component {
	/* 初始化数据*/
	constructor() {
		super();
		this.state = {
			gengduo: [],
			id:null,
			addid:null
		}
	};
	componentDidMount = function() {
		/*更新页面数据*/
		$.ajax({
			type: "get",
			url: conf.url+"/cebest/gengduo",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
				this.setState({
					gengduo: e
				})
				console.log(this.state.gengduo)
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
			url: conf.url+"/cebest/ingengduo",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				/*上传 要修改的图片*/
				$.ajax({
					type: "post",
					url: conf.url+"/cebest/gengduoaa",
					data: {
						"id": this.state.id
					},
					success: function(e) {
						console.log(e)
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


	/*点击修改  获取要修改的id   并弹窗*/
herfs=function(event){
	$(".gdfixed").css("display","block")
		var aa = event.target
		var id = aa.parentElement.firstElementChild.innerHTML
		this.setState({
			id: id
		})
}.bind(this)
/* 点击取消*/
gdclear=function(){
	$(".gdfixed").css("display","none")
}
/*点击确定*/
gdups=function(){
	/*查看文本框   是否 需要修改*/
		var title1 = $("#gdtexta").val()
		var title2 = $("#gdtextb").val()
		/* 处理 数据  变 或者不变*/
		if($("#gdtexta").val() == "") {
			for(var i = 0; i < this.state.gengduo.length; i++) {
				if(this.state.gengduo[i].id == this.state.id) {
					title1 = this.state.gengduo[i].title1
				}
			}
		}
		/* 处理 数据  变 或者不变*/
		if($("#gdtextb").val() == "") {
			for(var i = 0; i < this.state.gengduo.length; i++) {
				if(this.state.gengduo[i].id == this.state.id) {
					title2 = this.state.gengduo[i].title2
				}
			}
		}
		/*修改后台数据*/
					$.ajax({
					type: "post",
					url: conf.url+"/cebest/gengduobb",
					data: {
						"id": this.state.id,
						"title1":title1,
						"title2":title2
					},
					success: function(e) {
//						console.log(e)
						this.setState({
							gengduo:e
						})
					}.bind(this),
					error: function() {
						console.log("666")
					}
				});
		$(".gdfixed").css("display","none")
}.bind(this)
/*点击删除*/
sc=function(event){
		var arr = []
		/*获取要删除数据的位置*/
		var id = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		var text = event.target.parentElement.firstElementChild.innerHTML
		for(var i = 0; i < this.state.gengduo.length; i++) {
			if(this.state.gengduo[i].id == id) {
				arr = this.state.gengduo[i].sumary.split("?")
			}
		}
		for(var j = 0; j < arr.length; j++) {
			if(arr[j] == text) {
				arr.splice(j, 1)
			}
		}
		var str = arr.join("?")
		/*把删除后的数据 传入后台  进行修改*/
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/gengduocs",
			data: {
				"sumary": str,
				"id": id
			},
			success: function(e) {
				/*更新数据*/
				this.setState({
					gengduo: e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
}.bind(this)
/*点击增加*/
addgd=function(event){
	/*显示弹窗*/
		$(".gengduobox").css("display", "block")
		/*获取 要增加数据的位置*/
		var id = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		this.setState({
			addid: id
		})
		
}.bind(this)
/*点击取消   关闭弹窗*/
gdclears=function(){
	$(".gengduobox").css("display","none")
}
/*点击确定  上传数据*/
gdacc = function(event) {
	/* 判断 数据 是否填写完整*/
		if($("#addva").val() != "") {
			$(".gengduobox").css("display", "none")
			var arr = []
			arr = this.state.gengduo[this.state.addid - 1].sumary.split("?")
			arr.push($("#addva").val())
			var str = arr.join("?")
			$.ajax({
				type: "post",
				url: conf.url+"/cebest/gengduocs",
				data: {
				"sumary": str,
				"id": this.state.addid
				},
				success: function(e) {
					$("#addva").val("")
					/*更新数据*/
					this.setState({
						gengduo: e
					})
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
		}
	}.bind(this)
	render() {
		return(
			<div className="gengduo">
				<p className="titles">更多服务</p>
				<div className="gengduo-box">
				<ul>{this.state.gengduo.map(function(v,i){
					return <li key={i}>
					<p>{v.id}</p> 
					<p><img src={v.img} /></p>    
					<p>{v.title1}</p> 
					<p>{v.title2}</p> 
					<p>{v.sumary.split("?").map(function(v,i){
						return <p key={i}><b>{v}</b> <button onClick={this.sc}>删除</button></p>
					}.bind(this))}
					<p><button onClick={this.addgd}>增加</button></p>
					</p>
					<button className="setbtns1" onClick={this.herfs}>修改</button>  
				</li>
				}.bind(this))}</ul>		
			</div>
			{/* 修改弹窗*/}
			<div className="gdfixed">
			<div className="gdaa">
							<h3>修改</h3>
				        	<p>选择要添加的图片   <input type="file" ref="gengduoimg" onChange={this.setFiles.bind(this,this.refs.gengduoimg)}    multiple="multiple"/></p>
				        	<p>titl1  <input type="text" id="gdtexta"/></p>
				        	<p>titl2  <input type="text" id="gdtextb"/></p>
				        	<p><button onClick={this.gdups}>确定</button><button onClick={this.gdclear}>取消</button></p>
			</div>
			</div>
			{/* 增加的弹窗*/}
			<div  className="gengduobox">
			<div className="gengduodiv">
			<h2>增加</h2>
			<p><input type="text" id="addva"/></p>
			<p><button onClick={this.gdacc}>确定</button><button onClick={this.gdclears}>取消</button></p>
			</div>
			</div>
      </div>
		);
	}
}

export default Gengduo;