import React, {Component} from 'react';
import $ from 'jquery';

class Careers extends Component {
	constructor() {
		super();
		this.state = {
			work: [],
			arr: []
		}
	};
	componentDidMount = function() {
		$.ajax({
			type: "get",
			url: "http://192.168.43.25:8100/cebest/careers",
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
					url: "http://192.168.43.25:8100/cebest/careersup",
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
							url: "http://192.168.43.25:8100/cebest/careers",
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
		}
		/* 删除*/
		$.ajax({
			type: "post",
			url: "http://192.168.43.25:8100/cebest/careersclear",
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
                                                 {v.titlea.split("?").map(function (v,i) {
                                                     return <p key={i}>
                                                         <span>{i+1}、</span>{v}
                                                     </p>
                                                 })}
                                                 </div>
                                                 <div>
                                                {v.titleb.split("?").map(function (v,i) {
                                                    return <p key={i}>
                                                        <span>{i+1}、</span>{v}
                                                    </p>
                                                })}
                                            </div>
                                            <div><button className="clearwork" onClick={this.clearworkfn}>删除</button></div>
                                            
                                        </div>
                                    }.bind(this))
                                }
</div>
      </div>
		);
	}
}

export default Careers;