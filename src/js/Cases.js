import React, {Component} from 'react';
import $ from 'jquery';

class Cases extends Component {
	constructor() {
		super();
		this.state = {
			lis: [],
			upes: 0,
			imagesww: ""
		}
	};
	componentDidMount() {
		{ /* 案例列表一*/ }
		$.ajax({
			type: "get",
			url: "http://localhost:8100/cebest/alcases1",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				this.setState({
					lis: e
				})
				console.log(this.state.lis)

			}.bind(this),
			error: function() {
				console.log("666")
			}
		});

		{ /* 上传*/ }
		$('#addsbtn1').click(function() {
			if($("#text1").val() != "" && this.refs.fils1.files[0] != undefined) {
				$.ajax({
					type: "post",
					url: "http://localhost:8100/cebest/accases1",
					data: {
						"text": $("#text1").val()
					},
					success: function(e) {
						alert(e)
						$.ajax({
							type: "get",
							url: "http://localhost:8100/cebest/alcases1",
							success: function(e) {
								this.setState({
									lis: e
								})
								console.log(this.state.lis)
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
			} else {
				alert("请输入完整")
			}
		}.bind(this))

	};

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
			url: "http://localhost:8100/cebest/incases1",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
			},
			error: function() {
				console.log("666")
			}
		});
	}

	fn = function(event) {
		var aa = event.target
		var imgen = null
		var cid = aa.parentElement.firstElementChild.innerHTML
		for(var i in this.state.lis) {
			if(this.state.lis[i].cid == cid) {
				imgen = this.state.lis[i].src
			}
		}
		var imgsrc = imgen.split("/")[imgen.split("/").length - 1]
		console.log(imgsrc) { /* 删除*/ }
		$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/dlcases1",
			data: {
				"cid": cid,
				"imagesww": "public/images/" + imgsrc
			},
			success: function(e) {
				alert(e)
				for(var i in this.state.lis) {
					if(this.state.lis[i].cid == cid) {
						var aa = this.state.lis.splice(i, 1)
						this.setState({
							lis: this.state.lis
						})
					}
				}
			}.bind(this),
			error: function() {
				alert("666")
			}
		});
	}.bind(this);
	revisefn = function(event) {
		$(".black1").css("display", "block")
		var aa = event.target
		var cid = aa.parentElement.firstElementChild.innerHTML
		this.setState({
			upes: cid
		})
	}.bind(this)
	confirmfn = function() {
		$(".black1").css("display", "none")
		$.ajax({
			type: "get",
			url: "http://localhost:8100/cebest/alcases1",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				this.setState({
					lis: e
				})
				console.log(this.state.lis)

			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	upfn1 = function(event) {
		if(this.refs.fixedimg.files[0] != undefined) {
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/upcases1",
				data: {
					"cid": this.state.upes
				},
				success: function(e) {
					alert(e)
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
		} else {
			alert("不能为空")
		}

	}.bind(this)
	upfn2 = function(event) {
		if($("#houp").val() == "") {
			alert("不能为空")
		} else {
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/upscases1",
				data: {
					"cid": this.state.upes,
					"con": $("#houp").val()
				},
				success: function(e) {
					alert(e)
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
		}

	}.bind(this)
	render() {
		return(
			<div className="my-cases">
            <p className="titles">案例列表一</p>
        <p>
        选择要添加的图片   <input type="file" ref="fils1" onChange={this.setFiles.bind(null,this.refs.fils1)}  multiple="multiple"/>
        con内容 : <input type="text" id="text1"/>
        <button id="addsbtn1">上传啦</button>
        </p>
		<div className="photo">
			<ul className="list" id="list1">
				<li><span>id</span>  <span>img</span> <span>con</span></li>
				{this.state.lis.map(function(v,i){
					return <li key={i+1}>
					<span>{v.cid}</span> 
					<span><img src={v.src} /></span>    
					<span>{v.con}</span> 
					<button className="setbtns1" onClick={this.revisefn}>修改</button>  
					<button className="clearbtns clearbtns1" onClick={this.fn.bind(null)}>删除</button>
				</li>
				}.bind(this))}
			</ul>
		</div>
		<div className="black black1">
		<div className="cases1-box" id="fixeds">
		<p className="fixed-title">案例一修改</p>
		 <p>选择要修改的图片</p> 
		<p><input type="file" ref="fixedimg"  onChange={this.setFiles.bind(null,this.refs.fixedimg)}    multiple="multiple"/><button id="addsbtn1" onClick={this.upfn1}>上传啦</button></p>
        <p>con内容 : <input type="text" id="houp"/><button id="addsbtn1" onClick={this.upfn2}>上传啦</button></p>
        <p><button id="confirm" onClick={this.confirmfn}>确定</button></p>
		</div>
		</div>
            </div>
		)
	};
}
export default Cases