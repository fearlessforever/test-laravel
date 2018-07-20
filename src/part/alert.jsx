import React, { Component } from 'react';

class Alert extends Component {
    //<div dangerouslySetInnerHTML={{__html: this.props.pesan_error}} className={this.showHide()} />
    
	handleClick(){
        if(typeof this.props.remove === 'function')
            this.props.remove()
		/* this.setState({
            remove:true
        }) */
	}

	render() {
		let {option} = this.props,OPTION=Object.assign({},{message:'',className:'alert alert-default',messageBold:'Error '} , option);

    	return (    		
    		<div className={OPTION.className}>
                <strong>
                    {OPTION.messageBold} 
                </strong> 
                    &nbsp; {OPTION.message} 
                <button onClick={this.handleClick.bind(this) } className="close" data-dismiss="alert">&times;</button>
    		</div>
    	);
  	}
}

export default Alert;