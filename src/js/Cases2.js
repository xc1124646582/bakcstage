import React, { Component } from 'react';
import $ from 'jquery';

class Cases2 extends Component {
    constructor(){
        super();
        this.state={
            lis2:[],
            imagesww:null
        }
    };
    componentDidMount () {
			
			{/*案例列表二*/}
	        $.ajax({
				type:"get",
				url:"http://localhost:8100/cebest/alcases2",
				async:true,
				contentType:false,
				processData:false,
				success:function(e){	
					this.setState({
						lis2:e
					})	
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});
			
			
			
			
		
		
		$('#addsbtn2').click(function(){
		if($("#text2").val()!=""&&$("#text2s").val()!=""&&this.refs.fils2.files[0]!=undefined){
		$.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/accases2",
				data:{"title1":$("#text2").val(),"title2":$("#text2s").val()},
				success:function(e){				
					alert(e)
			$.ajax({
				type:"get",
				url:"http://localhost:8100/cebest/alcases2",
				async:true,
				contentType:false,
				processData:false,
				success:function(e){
					this.setState({
						lis2:e
					})
					console.log(this.state.lis2)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});		
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});		
			    	}else{
			    		alert("请输入完整")
			    	}
			
		}.bind(this))
		
    };
    
    setFiles=function(element){
    	var files=[]
    	files=element.files[0] 
    	console.log(element)
		  var fd=new FormData();  //表单处理数据的方法
				fd.append('uploadedFile',files)
				//用append方法以键值对的方式保存
		        console.log(fd)
	        $.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/incases1",
				async:true,
				data:fd,
				contentType:false,
				processData:false,
				success:function(e){	
      		},
      		error:function(){
      			console.log("666")
      		}
			});
    	console.log(element.files[0])
		  }
        fn=function(event){
        	
        	var aa=event.target
        	var imgen=null
				var  cid=aa.parentElement.firstElementChild.innerHTML
				for(var i in this.state.lis2){
						if(this.state.lis2[i].cid==cid){
							imgen=this.state.lis2[i].img
						}
				}
			 var imgsrc=imgen.split("/")[imgen.split("/").length-1]
			 console.log(imgsrc)
				{/* 删除*/}
			$.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/dlcases2",
				data:{"cid":cid,"imagesww":"public/images/"+imgsrc},
				success:function(e){				
				alert(e)
				for(var i in this.state.lis2){
						if(this.state.lis2[i].cid==cid){
							var aa=this.state.lis2.splice(i,1)
							this.setState({
								lis2:this.state.lis2
							})
						}
					}
				console.log(this.state.lis2)
      		}.bind(this),
      		error:function(){
      			alert("666")
      		}
			});
    }.bind(this);
    
    revisefn2=function(event){
    	$(".black2").css("display","block")
    	var aa=event.target
		var  cid=aa.parentElement.firstElementChild.innerHTML
		this.setState({
			upes:cid
		})
    }.bind(this)
    confirmfn2=function(){
    	$(".black2").css("display","none")
    	
   			$.ajax({
				type:"get",
				url:"http://localhost:8100/cebest/alcases2",
				async:true,
				contentType:false,
				processData:false,
				success:function(e){
					this.setState({
						lis2:e
					})
					console.log(this.state.lis2)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});	 	
    }.bind(this)
    upfns1=function(event){
 	$.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/upcases2",
				data:{"id":this.state.upes},
				success:function(e){				
				alert(e)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
		});	
    }.bind(this)
    upfns2=function(event){
    	alert(this.state.upes)
    		$.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/upscases2",
				data:{"id":this.state.upes,"title1":$("#huper1").val()},
				success:function(e){				
				alert(e)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});
    }.bind(this)
    upfns3=function(event){
    	alert(this.state.upes)
    		$.ajax({
				type:"post",
				url:"http://localhost:8100/cebest/upscases3",
				data:{"id":this.state.upes,"title2":$("#huper2").val()},
				success:function(e){				
				alert(e)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});
    }.bind(this)
    render() {
        return (
		
<div className="box2">
           <p className="titles">案例列表二</p>
        <p>
        选择要添加的图片     <input type="file" ref="fils2"  onChange={this.setFiles.bind(null,this.refs.fils2)}   multiple="multiple"/>
        title1的内容 : <input type="text" id="text2"/>
        title2的内容 : <input type="text" id="text2s"/>
        <button id="addsbtn2">上传啦</button>
        </p>
		<div className="photo">
			<ul className="list" id="list2">
				<li><span>id</span>  <span>img</span> <span>title1</span> <span>title2</span></li>
				{this.state.lis2.map(function(v,i){
					return <li key={i}>
					<span>{v.cid}</span> 
					<span><img src={v.img} /></span>    
					<span>{v.title1}</span> 
					<span>{v.title2}</span>
					<button className="setbtns2" onClick={this.revisefn2}>修改</button>  
					<button className="clearbtns clearbtns2" onClick={this.fn.bind(null)}>删除</button>
				</li>
				}.bind(this))}
			</ul>
		</div>
		<div className="black black2">
		<div className="cases1-box" id="fixeds2">
		<p className="fixed-title">案例一修改</p>
		 <p>选择要修改的图片</p> 
		<p><input type="file" ref="fixedimg2"  onChange={this.setFiles.bind(null,this.refs.fixedimg2)}    multiple="multiple"/><button id="addsbtn1" onClick={this.upfns1}>上传啦</button></p>
        <p>title1内容 : <input type="text" id="huper1"/><button id="addsbtn1" onClick={this.upfns2}>上传啦</button></p>
        <p>title2内容 : <input type="text" id="huper2"/><button  onClick={this.upfns3}>上传啦</button></p>
        <p><button id="confirm" onClick={this.confirmfn2}>确定</button></p>
		</div>
		</div>

</div>
        )
    };
}
export default Cases2
