import React, { Component } from 'react';
import $ from 'jquery';
class Gengduo extends Component {
	    constructor(){
        super();
        this.state={
            gengduo:[]
        }
    };
	    componentDidMount=function () {
	    	$.ajax({
				type:"get",
				url:"http://localhost:8100/cebest/gengduo",
				async:true,
				contentType:false,
				processData:false,
				success:function(e){	
					console.log(e)
				this.setState({
					gengduo:e
				})
				console.log(this.state.gengduo)
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});	
	    }


  render() {
    return (
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
						return <p key={i}>{v} <button>删除</button></p>
					})}
					
					</p>
					<button className="setbtns1" onClick={this.faser}>修改</button>  
				</li>
				}.bind(this))}</ul>		
</div>
      </div>
    );
  }
}

export default Gengduo;