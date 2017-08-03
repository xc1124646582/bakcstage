import React, {Component} from 'react';
import $ from 'jquery';

class Know extends Component {
	constructor() {
		super();
		this.state = {
			know:[],
			know1:[],
			know2:[],
			know3:[],
			know4:[],
			cpid:null,
			knsd:null,
			index:null
		}
	};
	componentDidMount = function() {
		$.ajax({
			type: "get",
			url: "http://localhost:8100/cebest/know",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				for (var i in e) {
                    if (e[i].con=='1') {
                        this.state.know1.push(e[i])
                    }else if (e[i].con=='2'){
                        this.state.know2.push(e[i])
                    }else if (e[i].con=='3'){
                        this.state.know3.push(e[i])
                    }else if (e[i].con=='4'){
                        this.state.know4.push(e[i])
                    }
                };
                this.setState({
					know: e,
					h21: this.state.know1[0].h2,
					h22: this.state.know2[0].h2,
					h23: this.state.know3[0].h2,
					h24: this.state.know4[0].h2
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}
	
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
			url: "http://localhost:8100/cebest/inknow",
			async: true,
			data: fd,
			contentType: false,
			processData: false,
			success: function(e) {
				if(element.id=="knimg"){
				$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/know1",
				data: {
				"id": this.state.cpid
				},
				success: function(e) {
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
				}

				
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});

	}.bind(this)
ades=function(event){
	var id = event.target.parentElement.parentElement.firstElementChild.innerHTML
	this.setState({
		cpid:id
	})
	$(".knbox1").css("display","block")
}.bind(this)
knclear=function(){
	$(".knbox1").css("display","none")
}
knups=function(){
		var tit = $("#kntexts").val()
		if($("#kntexts").val() == "") {
			for(var i = 0; i < this.state.know.length; i++) {
				if(this.state.know[i].id == this.state.cpid) {
					tit = this.state.know[i].tit
				}
			}
		}
	
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/know2",
				data: {
				"id": this.state.cpid,
				"tit":tit
				},
				success: function(e) {
					this.setState({
						know1:[],
						know2:[],
						know3:[],
						know4:[]
					})
					
					for (var i in e) {
                    if (e[i].con=='1') {
                        this.state.know1.push(e[i])
                    }else if (e[i].con=='2'){
                        this.state.know2.push(e[i])
                    }else if (e[i].con=='3'){
                        this.state.know3.push(e[i])
                    }else if (e[i].con=='4'){
                        this.state.know4.push(e[i])
                    }
                };
					this.setState({
						know:e
					})
					$("#kntexts").val("")
				$(".knbox1").css("display","none")
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
}.bind(this)
kndats=function(event){
var id = event.target.parentElement.parentElement.firstElementChild.innerHTML
this.setState({
		knsd:id
	})
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/knowac",
				data: {
				"id": id
				},
				success: function(e) {
					this.setState({
						know1:[],
						know2:[],
						know3:[],
						know4:[]
					})
					
					for (var i in e) {
                    if (e[i].con=='1') {
                        this.state.know1.push(e[i])
                    }else if (e[i].con=='2'){
                        this.state.know2.push(e[i])
                    }else if (e[i].con=='3'){
                        this.state.know3.push(e[i])
                    }else if (e[i].con=='4'){
                        this.state.know4.push(e[i])
                    }
                };
					this.setState({
						know:e
					})
				$(".knbox1").css("display","none")
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
}.bind(this)
addknow=function(event){
	$(".knbox2").css("display","block")
	var id = event.target.parentElement.parentElement.firstElementChild.innerHTML
	var index=null
	if(id=="品牌网站"){
		index=1
	}else if(id=="电商平台"){
		index=2
	}else if(id=="活动营销"){
		index=3
	}else if(id=="业务系统"){
		index=4
	}
this.setState({
	index:index
})
}.bind(this)
kn2fo=function(){
	$(".knbox2").css("display","none")
}
kn2fp=function(){
	if($("#kndars").val()!=""&& this.refs.kn2img.files[0] != undefined){
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/knowins",
data: {"con": this.state.index,"tit":$("#kndars").val()},
				success: function(e) {
					this.setState({
						know1:[],
						know2:[],
						know3:[],
						know4:[],
						h21:null,
						h22:null,
						h23:null,
						h24:null,
					})
					
					for (var i in e) {
                    if (e[i].con=='1') {
                        this.state.know1.push(e[i])
                    }else if (e[i].con=='2'){
                        this.state.know2.push(e[i])
                    }else if (e[i].con=='3'){
                        this.state.know3.push(e[i])
                    }else if (e[i].con=='4'){
                        this.state.know4.push(e[i])
                    }
                };
					this.setState({
						know:e
					})
					$("#kndars").val("")
				$(".knbox2").css("display","none")
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
	}else{
		alert("输入完整")
	}
}.bind(this)
entfn=function(event){
	$(".knbox3").css("display","block")
	var id = event.target.parentElement.firstElementChild.innerHTML
	var index=null
	for(var i=0;i<this.state.know.length;i++){
		if(this.state.know[i].h2==id){
			index=this.state.know[i].con
		}
	}
	this.setState({
		index:index
	})
}.bind(this)
knupfs=function(event){
	console.log(this.state.index)
	$(".knbox3").css("display","none")
			$.ajax({
				type: "post",
				url: "http://localhost:8100/cebest/knowacf",
				data: {
				"con": this.state.index,
				"h2":$("#knfsts").val()
				},
				success: function(e) {
				this.setState({
						know1:[],
						know2:[],
						know3:[],
						know4:[],
						h21:null,
						h22:null,
						h23:null,
						h24:null,
					})
				for (var i in e) {
                    if (e[i].con=='1') {
                        this.state.know1.push(e[i])
                    }else if (e[i].con=='2'){
                        this.state.know2.push(e[i])
                    }else if (e[i].con=='3'){
                        this.state.know3.push(e[i])
                    }else if (e[i].con=='4'){
                        this.state.know4.push(e[i])
                    }
                };
                this.setState({
					know: e,
					h21: this.state.know1[0].h2,
					h22: this.state.know2[0].h2,
					h23: this.state.know3[0].h2,
					h24: this.state.know4[0].h2
				})
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
}.bind(this)
knclearzs=function(){
	$(".knbox3").css("display","none")
}
	render() {
		return(
			<div className="know">
			<ul className="klist">
			<h2>品牌网站</h2>
			 <p><span>{this.state.h21}</span>    <button onClick={this.entfn}>修改</button></p> 
			{this.state.know1.map(function(v,i){
				return <li className="clear" key={i}><span>{v.id}</span><p><img src={v.img}/></p><p>{v.tit}</p> <p><button onClick={this.kndats}>删除</button><button onClick={this.ades}>修改</button></p></li>
			}.bind(this))}
			<li className="knowss"><button onClick={this.addknow}>增加</button></li>
			</ul>
			
			<ul className="klist">
			<h2>电商平台</h2>
			 			 <p><span>{this.state.h22}</span>    <button onClick={this.entfn}>修改</button></p> 
			{this.state.know2.map(function(v,i){
				return <li className="clear" key={i}><span>{v.id}</span><p><img src={v.img}/></p><p>{v.tit}</p>  <p><button onClick={this.kndats}>删除</button><button onClick={this.ades}>修改</button></p></li>
			}.bind(this))}
			<li className="knowss"><button onClick={this.addknow}>增加</button></li>
			</ul>
			
			<ul className="klist">
			<h2>活动营销</h2>
			 			 <p><span>{this.state.h23}</span>    <button onClick={this.entfn}>修改</button></p> 
			{this.state.know3.map(function(v,i){
				return <li className="clear" key={i}><span>{v.id}</span><p><img src={v.img}/></p><p>{v.tit}</p>  <p><button onClick={this.kndats}>删除</button><button onClick={this.ades}>修改</button></p></li>
			}.bind(this))}
			<li className="knowss"><button onClick={this.addknow}>增加</button></li>
			</ul>
			
			<ul className="klist">
			<h2>业务系统</h2>
			 			 <p><span>{this.state.h24}</span>    <button onClick={this.entfn}>修改</button></p> 
			{this.state.know4.map(function(v,i){
				return <li className="clear" key={i}><span>{v.id}</span><p><img src={v.img}/></p><p>{v.tit}</p><p><button onClick={this.kndats}>删除</button><button onClick={this.ades}>修改</button></p></li>
			}.bind(this))}
			<li className="knowss"><button onClick={this.addknow}>增加</button></li>
			</ul>
			
			<div className="knows knbox1">
			<div>
			<h3>修改</h3>
				        	<p>选择要添加的图片   <input type="file" id="knimg" ref="knimg" onChange={this.setFiles.bind(this,this.refs.knimg)}    multiple="multiple"/></p>
				        	<p> <input type="text" id="kntexts"/></p>
				        	<p><button onClick={this.knups}>确定</button><button onClick={this.knclear}>取消</button></p>
			</div>
				</div>
				
				
			<div className="knows knbox2">
			<div>
			<h3>增加</h3>
				        	<p>选择要添加的图片   <input type="file" id="kn2img" ref="kn2img" onChange={this.setFiles.bind(this,this.refs.kn2img)}    multiple="multiple"/></p>
				        	<p> <input type="text" id="kndars"/></p>
				        	<p><button onClick={this.kn2fp}>确定</button><button onClick={this.kn2fo}>取消</button></p>
			</div>
				</div>
				
			<div className="knows knbox3">
			<div>
			<h3>修改</h3>
			<p className="knhead"><input type="text" id="knfsts"/></p> 
			<p> <button onClick={this.knupfs}>确定</button><button onClick={this.knclearzs}>取消</button></p>
			</div>
				</div>
      </div>
		);
	}
}

export default Know;