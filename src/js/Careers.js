import React, { Component } from 'react';
import $ from 'jquery';
class Careers extends Component {
	    constructor(){
        super();
        this.state={
            work:[]
        }
    };
	    componentDidMount=function () {
	    	$.ajax({
				type:"get",
				url:"http://localhost:8100/cebest/careers",
				async:true,
				contentType:false,
				processData:false,
				success:function(e){	
					console.log(e)
				this.setState({
					work:e
				})
      		}.bind(this),
      		error:function(){
      			console.log("666")
      		}
			});	
	    }
  render() {
    return (
      <div className="Careers">
<p className="titles">人才招聘</p>
<div className="carbox">
<div className="divs clear"> <div>职位(work)</div> <div>English</div><div>岗位职责</div><div>任职资格</div></div>
                            {this.state.work.map(function (v,i) {
                                        return <div key={i} className="divs clear">
                                        <div>{v.work}</div>
                                        <div>{v.duty}</div>
                                            <div className="my-detail">
                                                <h3>岗位职责：</h3>
                                                 {v.titlea.split("?").map(function (v,i) {
                                                     return <div key={i}>
                                                         <p>{i+1}、<span>{v}</span></p>
                                                     </div>
                                                 })}
                                                 </div>
                                                 <div>
                                                <h3>任职资格：</h3>
                                                {v.titleb.split("?").map(function (v,i) {
                                                    return <div key={i}>
                                                        <p>{i+1}、<span>{v}</span></p>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    })
                                }
</div>
      </div>
    );
  }
}

export default Careers;