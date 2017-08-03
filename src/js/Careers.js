import React, {Component} from 'react';
import $ from 'jquery';

class Careers extends Component {
	constructor() {
		super();
		this.state = {
			work: [],
			arr: [],
			id:null,
			addid:null,
			reps:null
		}
	};
	componentDidMount = function() {
		$.ajax({
			type: "get",
			url: "http://localhost:8100/cebest/careers",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
				console.log(e)
				this.setState({
					work: e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}
	update = function() {
		$(".textbox").css("display", "block")
	}.bind(this)
	upns = function() {
		if($("#work1").val() != "" && $("#work2").val() != "") {
			var aas1 = []
			for(var i = 0; i < $(".work3 input").length; i++) {
				if($($(".work3 input").get(i)).val() != "") {
					aas1.push($($(".work3 input").get(i)).val())
				}
			}
			var str1 = ""
			for(var j = 0; j < aas1.length; j++) {
				str1 += "?" + aas1[j]
			}
			var strs1 = str1.substr(1, str1.length)
			console.log(strs1)

			var aas2 = []
			for(var i = 0; i < $(".work4 input").length; i++) {
				if($($(".work4 input").get(i)).val() != "") {
					aas2.push($($(".work4 input").get(i)).val())
				}
			}
			var str2 = ""
			for(var j = 0; j < aas2.length; j++) {
				str2 += "?" + aas2[j]
			}
			var strs2 = str2.substr(1, str2.length)
			console.log(strs2)

			if(strs1.length <= 253 && strs2.length <= 253) {
				$.ajax({
					type: "post",
					url: "http://localhost:8100/cebest/careersup",
					data: {
						"work": $("#work1").val(),
						"duty": $("#work2").val(),
						"titlea": strs1,
						"titleb": strs2
					},
					success: function(e) {
						alert(e)

						$("#work1").val("")
						$("#work2").val("")
						$(".work3 input").val("")
						$(".work4 input").val("")
						$(".textbox").css("display", "none")
						$.ajax({
							type: "get",
							url: "http://localhost:8100/cebest/careers",
							async: true,
							contentType: false,
							processData: false,
							success: function(e) {
								console.log(e)
								this.setState({
									work: e
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
			} else {
				alert("输入过长，简洁点")
			}

		} else {
			alert("请输入完整")
		}

	}.bind(this)
	ends = function() {
		$(".textbox").css("display", "none")
	}
	clearworkfn = function(event) {
		var aa = event.target
		var rid = null
		var work = aa.parentElement.parentElement.firstElementChild.innerHTML
		for(var i in this.state.work) {
			if(this.state.work[i].work == work) {
				rid = this.state.work[i].rid
			}
		} { /* 删除*/ }
		$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/careersclear",
			data: {
				"rid": rid
			},
			success: function(e) {
				alert(e)
				for(var i in this.state.work) {
					if(this.state.work[i].rid == rid) {
						var bb = this.state.work.splice(i, 1)
						this.setState({
							work: this.state.work
						})
					}
				}
			}.bind(this),
			error: function() {
				alert("666")
			}
		});

	}.bind(this)
	carssn=function(event){
		var arr = []
		var id = event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		var text = event.target.parentElement.firstElementChild.innerHTML
		var index=null
		for(var i=0;i<this.state.work.length;i++){
			if(this.state.work[i].work==id){
				index=this.state.work[i].rid
				arr=this.state.work[i].titlea.split("?")
			}
		}
		for(var j = 0; j < arr.length; j++) {
			if(arr[j] == text) {
				arr.splice(j, 1)
			}
		}
		
		var str = arr.join("?")
$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/careerdlp",
			data: {
				"titlea": str,
				"rid": index
			},
			success: function(e) {
				this.setState({
					work: e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	carssn2=function(event){
				var arr = []
		var id = event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		var text = event.target.parentElement.firstElementChild.innerHTML
		var index=null
		for(var i=0;i<this.state.work.length;i++){
			if(this.state.work[i].work==id){
				index=this.state.work[i].rid
				arr=this.state.work[i].titleb.split("?")
			}
		}
		for(var j = 0; j < arr.length; j++) {
			if(arr[j] == text) {
				arr.splice(j, 1)
			}
		}
		
		var str = arr.join("?")
$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/careerdlp2",
			data: {
				"titleb": str,
				"rid": index
			},
			success: function(e) {
				this.setState({
					work: e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});
	}.bind(this)
	upcarss1=function(event){
		$(".cllearboxs").css("display","block")
		var id = event.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML
		var index
		for(var i=0;i<this.state.work.length;i++){
			if(this.state.work[i].work==id){
				index=this.state.work[i].rid
			}
		}
		this.setState({
			addid:index
		})
		this.setState({
			reps:event.target.id
		})
	}.bind(this)
	carcnn=function(){
		$(".cllearboxs").css("display","none")
	}
	carqds=function(){
		if(this.state.reps=="btns1"){
			var arr = []
			arr = this.state.work[this.state.addid-1].titlea.split("?")
			arr.push($("#carval").val())
			var str = arr.join("?")
			$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/careerhq1",
			data: {
				"titlea": str,
				"rid": this.state.addid
			},
			success: function(e) {
				this.setState({
					work: e
				})
				$(".cllearboxs").css("display","none")
			}.bind(this),
			error: function() {
				console.log("失败了")
			}
		});
		}else if(this.state.reps=="btns2"){
			var arr = []
			arr = this.state.work[this.state.addid-1].titlea.split("?")
			arr.push($("#carval").val())
			var str = arr.join("?")
			$.ajax({
			type: "post",
			url: "http://localhost:8100/cebest/careerhq2",
			data: {
				"titleb": str,
				"rid": this.state.addid
			},
			success: function(e) {
				this.setState({
					work: e
				})
				$(".cllearboxs").css("display","none")
			}.bind(this),
			error: function() {
				console.log("失败了")
			}
		});
		}

	}.bind(this)
	render() {
		return(
			<div className="Careers">
<p className="titles">人才招聘</p>
<p className="btnbox"> <button onClick={this.update}>添加职位</button></p>
<div className="textbox" id="textbox">
<div className="divs  divs-top clear"> <div>职位(work)</div> <div>English</div><div>岗位职责(titlea)</div><div>任职资格(titleb)</div></div>
<div className="divs  divs-top divs-text clear"> <div><input type="text" id="work1"/></div> <div><input type="text" id="work2"/></div>
<div className="work3"><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/></div>
<div className="work4"><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/><br/><input type="text"/></div></div>
<div className="btn"><button onClick={this.upns}>确定</button><button onClick={this.ends}>取消</button></div>
</div>
<div className="carbox">
<div className="divs  divs-top clear"> <div>职位(work)</div> <div>English</div><div>岗位职责(titlea)</div><div>任职资格(titleb)</div></div>
                            {this.state.work.map(function (v,i) {
                                        return <div key={i} className="divs clear">
                                        <div>{v.work}</div>
                                        <div>{v.duty}</div>
                                            <div className="my-detail">
                                            <p className="careersadds"><button onClick={this.upcarss1} id="btns1">添加</button></p>
                                                 {v.titlea.split("?").map(function (v,i) {
                                                     return <p key={i}>
                                                         <span>{i+1}、</span><span><span>{v}</span> <br/><button onClick={this.carssn}>删除</button></span>
                                                     </p>
                                                 }.bind(this))}
                                                 </div>
                                                 <div>
                                                 <p className="careersadds"><button onClick={this.upcarss1} id="btns2">添加</button></p>
                                                {v.titleb.split("?").map(function (v,i) {
                                                    return <p key={i}>
                                                        <span>{i+1}、</span><span><span>{v}</span> <br/><button onClick={this.carssn2}>删除</button></span>
                                                    </p>
                                                }.bind(this))}
                                            </div>
                                            <div><button className="clearwork" onClick={this.clearworkfn}>删除</button></div>
                                            
                                        </div>
                                    }.bind(this))
                                }
</div>
<div className="cllearboxs">
<div>
<h2>添加</h2>
<p><input tupe="text" id="carval"/></p>
<p><button onClick={this.carqds}>确定</button> <button onClick={this.carcnn}>取消</button></p>
</div>
</div>
      </div>
		);
	}
}

export default Careers;