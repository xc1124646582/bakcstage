import React, {Component} from 'react';
import $ from 'jquery';
import conf from './../config';

class Chinese2 extends Component {
	/*初始化状态*/
	constructor() {
		super();
		this.state = {
			chinese2: [],
			id: null,
			ase: null,
			addid: null
		}
	};
	componentDidMount = function() {
		/*初始化页面数据*/
		$.ajax({
			type: "get",
			url: conf.url+"/cebest/chinese2",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
				this.setState({
					chinese2: e
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
			url: conf.url+"/cebest/incases1",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				/*修改图片*/
				$.ajax({
					type: "post",
					url: conf.url+"/cebest/chinese2img",
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
	/* 点击修改 */
	chers = function(event) {
		$(".chin2fix").css("display", "block")
		/*获取修改的id*/
		var aa = event.target
		var id = aa.parentElement.firstElementChild.innerHTML
		this.setState({
			id: id
		})
	}.bind(this)
	/* 点击修改框的 取消*/
	clearfn = function() {
		$(".chin2fix").css("display", "none")
	}
	/* 点击 确定 上传数据*/
	carups = function() {
		var title1 = $("#titl1").val()
		var title2 = $("#titl2").val()
		/*判断 是否 修改了数据*/
		if($("#titl1").val() == "") {
			for(var i = 0; i < this.state.chinese2.length; i++) {
				if(this.state.chinese2[i].id == this.state.id) {
					title1 = this.state.chinese2[i].titl1
				}
			}
		}
		if($("#titl2").val() == "") {
			for(var i = 0; i < this.state.chinese2.length; i++) {
				if(this.state.chinese2[i].id == this.state.id) {
					title2 = this.state.chinese2[i].titl2
				}
			}
		}
		/*把修改后的数据传入后台*/
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/upchinese2",
			data: {
				"id": this.state.id,
				"title1": title1,
				"title2": title2
			},
			success: function(e) {
				console.log(e)
				/*更新数据*/
				this.setState({
					chinese2: e
				})
				$("#titl1").val("")
				$("#titl2").val("")
				$(".chin2fix").css("display", "none")
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	/*点击删除*/
	chinclearfn = function(event) {
		var arr = []
		/*查找要删除数据的位置*/
		var id = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		var text = event.target.parentElement.firstElementChild.innerHTML
		/*处理数据*/
		for(var i = 0; i < this.state.chinese2.length; i++) {
			if(this.state.chinese2[i].id == id) {
				arr = this.state.chinese2[i].cons.split("?")
			}
		}
		for(var j = 0; j < arr.length; j++) {
			if(arr[j] == text) {
				arr.splice(j, 1)
			}
		}
		var str = arr.join("?")
		/*返回一个新的数据  发送到后台*/
		$.ajax({
			type: "post",
			url: conf.url+"/cebest/upschinese2",
			data: {
				"cons": str,
				"id": id
			},
			success: function(e) {
				/*更新数据*/
				this.setState({
					chinese2: e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	/*点击增加*/
	addfn = function(event) {
		/*弹出增加框*/
		$(".homes").css("display", "block")
		/*获取增加的位置*/
		var id = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		this.setState({
			addid: id
		})
	}.bind(this)
	/*点击确定*/
	clearsn = function(event) {
		/*判断 是否输入*/
		if($("#texten").val() != "") {
			$(".chinred").css("display","none")
			$(".homes").css("display", "none")
			var arr = []
			arr = this.state.chinese2[this.state.addid - 1].cons.split("?")
			arr.push($("#texten").val())
			var str = arr.join("?")
			/*把得到的新数据 发送后台*/
			$.ajax({
				type: "post",
				url: conf.url+"/cebest/upschinese2",
				data: {
					"cons": str,
					"id": this.state.addid
				},
				success: function(e) {
					$("#texten").val("")
					this.setState({
						chinese2: e
					})
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
		}else{
			$(".chinred").css("display","block")
		}
	}.bind(this)
	/*点击取消*/
	ensclear = function() {
		$(".homes").css("display", "none")
		$(".chinred").css("display","none")
	}
	render() {
		return(
			<div className="chinese2">
				<p className="titles"></p>
				<div className="careers2-box">
					<ul>{this.state.chinese2.map(function(v,i){
						return <li key={i+1}>
						<span>{v.id}</span> 
						<span><img src={v.img} /></span>    
						<span>{v.titl1}</span> 
						<span>{v.titl2}</span> 
						<span>{v.cons.split("?").map(function(v,i){
							return <p className="pp" key={i}><b>{v}</b> <button onClick={this.chinclearfn}>删除</button></p>
						}.bind(this))}<p><button onClick={this.addfn}>增加</button></p></span>
						<button className="setbtns1" onClick={this.chers}>修改</button>  
					</li>
					}.bind(this))}</ul>
					<div className='chin2fix'>
			        	<div className="chin2fix-box">
				        	<h3>修改</h3>
				        	<p>选择要添加的图片   <input type="file" ref="careers2" onChange={this.setFiles.bind(null,this.refs.careers2)}   multiple="multiple"/></p>
				        	<p>titl1<input type="text" id="titl1"/></p>
				        	<p>titl2<input type="text" id="titl2"/></p>
				        	<p><button onClick={this.carups}>确定</button><button onClick={this.clearfn}>取消</button></p>
				        </div>
	        		</div>	
        			<div className="homes">
	        			<div>
				        	<h2>增加</h2>
				        	<p><input type="text" id="texten"/></p>
				        	<p className="chinred">请输入完整</p>
				        	<p><button onClick={this.clearsn}>确定</button> <button onClick={this.ensclear}>取消</button></p>
	        			</div>
		        	</div>
				</div>
	    	</div>
		);
	}
}

export default Chinese2;