import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import Cases from './js/Cases';
import Cases2 from './js/Cases2';
import Careers from './js/Careers';
import Contact from './js/Contact';
import './css/admin.css';
import './css/css.css';
import './css/cases.css';
import './css/careers.css';
import './css/contact.css';
class App extends Component {
	    componentDidMount=function () {
	  $(".leftnav h2").click(function(){
	  $(this).next().slideToggle(200);	
	  $(this).toggleClass("on"); 
  })
  $(".leftnav ul li a").click(function(){
	    $("#a_leader_txt").text($(this).text());
  		$(".leftnav ul li a").removeClass("on");
		$(this).addClass("on");
  })
    $("#cases").click(function(){
    	$(".admin").children().hide()
    	$(".cases").show()
    	$(".bread li:nth-child(2)").text("案例一")
  })
        $("#cases2").click(function(){
    	$(".admin").children().hide()
    	$(".cases2").show()
    	$(".bread li:nth-child(2)").text("案例二")
  })
      $("#careers").click(function(){
    	$(".admin").children().hide()
    	$(".careers").show()
    	$(".bread li:nth-child(2)").text("人才招聘")
  })
        $("#contact").click(function(){
    	$(".admin").children().hide()
    	$(".contact").show()
    	$(".bread li:nth-child(2)").text("联系")
  })
	    }
  render() {
    return (
      <div className="App">
    	<div className="header bg-main">
  <div className="logo margin-big-left fadein-top">
    <h1>后台管理中心</h1>
  </div>
</div>
<div className="leftnav">
  <div className="leftnav-title"><strong><span className="icon-list"></span>菜单列表</strong></div>
  <h2><span className="icon-user"></span>基本设置</h2>
  <ul>
    <li><a><span className="icon-caret-right"></span>网站设置</a></li>
    <li><a><span className="icon-caret-right"></span>单页管理</a></li>
    <li><a><span className="icon-caret-right"></span>栏目管理</a></li>
  </ul>   
  <h2><a><span className="icon-pencil-square-o"></span>栏目管理</a></h2>
  <ul>
    <li><a><span className="icon-caret-right"></span>内容管理</a></li>
    <li><a><span className="icon-caret-right"></span>添加内容</a></li>
    <li><a><span className="icon-caret-right"></span>分类管理</a></li> 
    <li id="cases"><a><span className="icon-caret-right"></span>案例一</a></li>   
    <li id="cases2"><a><span className="icon-caret-right"></span>案例二</a></li>  
    <li id="careers"><a><span className="icon-caret-right"></span>人才招聘</a></li>   
    <li id="contact"><a><span className="icon-caret-right"></span>联系</a></li>   
  </ul>  
</div>
<ul className="bread">
  <li> 首页</li>
  <li>网站信息</li>
</ul>
<div className="admin">
<div className="cases"><Cases></Cases></div>
<div className="cases2"><Cases2></Cases2></div>
<div className="careers"><Careers></Careers></div>
<div className="contact"><Contact></Contact></div>
<p>啊实打实的</p>
</div>
      </div>
    );
  }
}

export default App;
