import React, {Component} from 'react';
import $ from 'jquery';
import conf from './../config';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			home:[],
			id:null
		}
	};
		componentDidMount = function() {
			$.ajax({
			type: "get",
			url: conf.url+"/cebest/home",
			async: true,
			contentType: false,
			processData: false,
			success: function(e) {
                this.setState({
					home:e
				})
			}.bind(this),
			error: function() {
				console.log("666")
			}
		});	
		}
homecr=function(event){
	var id = event.target.parentElement.firstElementChild.innerHTML
	this.setState({
		id:id
	})
	$(".homens").css("display","block")
}.bind(this)
homeqs=function(){
	$(".homens").css("display","none")
}
homeups=function(){
		var tita = $("#homeatext").val()
		var titEn=$("#homebtext").val()
		if($("#homeatext").val() == "") {
			for(var i = 0; i < this.state.home.length; i++) {
				if(this.state.home[i].id == this.state.id) {
					tita = this.state.home[i].tita
				}
			}
		}
		if($("#homebtext").val() == "") {
			for(var i = 0; i < this.state.home.length; i++) {
				if(this.state.home[i].id == this.state.id) {
					titEn = this.state.home[i].titEn
				}
			}
		}
		console.log(tita,titEn)
			$.ajax({
				type: "post",
				url: conf.url+"/cebest/homeac",
data: {"id": this.state.id,"tita":tita,"titEn":titEn},
				success: function(e) {
					this.setState({
					home:e
				})
				$(".homens").css("display","none")
				}.bind(this),
				error: function() {
					console.log("666")
				}
			});
}.bind(this)
	render() {
		return(
			<div className="home">
			<ul>
			<li><h2> <p>id</p> <p>nav</p>  <p>English</p></h2></li>
			{this.state.home.map(function(v,i){
				return <li key={i}><p>{v.id}</p> <p>{v.tita}</p>  <p>{v.titEn}</p> <button onClick={this.homecr}>修改</button></li>
			}.bind(this))}
			</ul>
			<div className="homens">
			<div>
			<h2>修改</h2>
			<p><input type="text" id="homeatext"/></p>
			<p><input type="text" id="homebtext"/></p>
			<p><button onClick={this.homeups}>确定</button><button onClick={this.homeqs}>取消</button></p>
			</div>
			</div>
      </div>
		);
	}
}

export default Home;