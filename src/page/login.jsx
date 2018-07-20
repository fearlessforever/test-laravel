import React, {Component} from 'react'
import queryString from 'qs'

import Alert from '../part/alert'

class Login extends Component{
    componentWillUnmount(){
        document.body.removeAttribute("class");
    }
    state={
        pageRegister:false,
        inputISdisabled:false,
        loading:false,
        errorList:false,
        successList:false,
    }

    handleOnClick(e){
        e.preventDefault()
        this.setState({
            pageRegister:!this.state.pageRegister
        });
    }
    handleSubmitLogin(e){
        e.preventDefault()
        this.setState({
            inputISdisabled:true,
            loading:true,
            errorList:false,
        })
        fetch(window.helmi.api+'api/v1/login',{
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
            },
            method:'POST',
            body: queryString.stringify({
              username:this.refs.usernamel.value,
              password:this.refs.passwordl.value,
            })
        }).then( res => res.json() )
        .then( res => {
            this.setState({inputISdisabled:false,loading:false});
           if(res.status === 'success'){
                return Promise.resolve(res);
           }else if(res.status === 'error'){
               if(!res.data){
                res.data ={
                    alert:[res.message]
                }
               }
               return Promise.reject(res);
           }
            
        })
        .then( res => {
             if(res.user && typeof this.props.setUser === 'function'){
                this.setState({
                    successList:['You are logged in']
                })
                setTimeout(()=>{
                    this.props.setUser(res.user,'game')
                },3000)
                
                
             }
        })
        .catch( res =>{
            if(typeof res.data !== 'undefined')
            this.setState({
                errorList:res.data,
            })
        })

    }

    handleSubmitRegister(e){
        e.preventDefault()
        this.setState({
            inputISdisabled:true,
            loading:true,
            errorList:false,
        })
        fetch(window.helmi.api+'api/v1/register',{
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
            },
            method:'POST',
            body: queryString.stringify({
              name:this.refs.name.value,
              username:this.refs.username.value,
              password:this.refs.password.value,
              password_confirmation:this.refs.password_confirmation.value,
            })
        }).then( res => res.json() )
        .then( res => {
            this.setState({inputISdisabled:false,loading:false});
           if(res.status === 'success'){
                return Promise.resolve(res);
           }else if(res.status === 'error'){
               if(!res.data){
                res.data ={
                    alert:[res.message]
                }
               }
               return Promise.reject(res);
           }
            
        })
        .then( res => {
             if(res.data && typeof this.props.setUser === 'function'){
                this.setState({
                    successList:['New user registered and You are logged in']
                })
                setTimeout(()=>{
                    this.props.setUser(res.data,'game')
                },3000)
                
                
             }
        })
        .catch( res =>{
            if(typeof res.data !== 'undefined')
            this.setState({
                errorList:res.data,
            })
        })

    }

    removeAlert(){
        this.setState({
            errorList:false
        })
    }

    render(){
        console.log(this.state)
        let errorList=[],k,no=0;
        if(typeof this.state.errorList === 'object'){
            for( k in this.state.errorList ){
                errorList[++no]=  <Alert remove={this.removeAlert.bind(this)} key={k} option={{
                    messageBold:'Error',
                    message:this.state.errorList[k][0] ? this.state.errorList[k][0] : '',
                    className:'alert alert-danger'
                }} />
            }
        }
        let successList;
        if(this.state.successList)
        successList = this.state.successList.map( (val,k) =>{
            return <Alert remove={this.removeAlert.bind(this)} key={k} option={{
                    messageBold:'Success',
                    message:val ? val : '',
                    className:'alert alert-success'
                }} />
        })

        let cssNew ={
            pertama:'',
            kedua:'',
        };
        if(this.state.pageRegister){
            cssNew.pertama ={ display:'none',opacity:0}
            cssNew.kedua ={ display:'block',opacity:1}
        }else{
            cssNew.pertama ={ display:'block',opacity:1}
            cssNew.kedua ={ display:'none',opacity:0}
        }
        return(
            <div className="login_wrapper">
                <div className="animate form login_form" style={cssNew.pertama}>
                <section className="login_content">
                    <form onSubmit={this.handleSubmitLogin.bind(this)}>
                    <h1>Login Form</h1>
                    <div>
                        <input type="text" ref="usernamel" disabled={this.state.inputISdisabled} className="form-control" placeholder="Username" required="" />
                    </div>
                    <div>
                        <input type="password" ref="passwordl" disabled={this.state.inputISdisabled} className="form-control" placeholder="Password" required="" />
                    </div>
                    <div>
                        <button className="btn btn-default submit" type="submit" >Log in</button>
                    </div>
                    <div className="row"  data-id="div-alert"> </div>
                    
                    <div className="clearfix"></div>

                    <div className="separator">
                        <p className="change_link"> 
                        <a href="#signup" className="to_register" onClick={this.handleOnClick.bind(this)}> Create Account </a>
                        </p>

                        <div className="clearfix"></div>
                        <br />
                        <div >
                            {successList}
                        </div>
                        <div >
                            {errorList}
                        </div>
                        <div>
                        <h1><i className="fa fa-paw"></i> Laravel (API) + react </h1>
                        <p>Made by Helmi</p>
                        </div>
                    </div>
                    </form>
                </section>
                </div>

                <div id="register" className="animate form registration_form" style={cssNew.kedua}>
                <section className="login_content">
                    <form id="registerForm" onSubmit={this.handleSubmitRegister.bind(this)}>
                    <h1>Create Account</h1>
                    <div>
                        <input type="text" ref="name" disabled={this.state.inputISdisabled} className="form-control" placeholder="Nama" required="" />
                    </div>
                    <div>
                        <input type="text" ref="username" disabled={this.state.inputISdisabled} className="form-control" placeholder="Username" required="" />
                    </div>
                    <div>
                        <input type="text" ref="password" disabled={this.state.inputISdisabled} className="form-control" placeholder="Password" required="" />
                    </div>
                    <div>
                        <input type="text" ref="password_confirmation" disabled={this.state.inputISdisabled} className="form-control" placeholder="Repeat Password" required="" />
                    </div>
                    <div>
                        <button className="btn btn-default submit" type="submit">Submit</button>
                    </div>
                    <div className="row"  data-id="div-alert2"> </div>
                    <div className="clearfix"></div>

                    <div className="separator">
                        <p className="change_link">Already a member ?
                        <a href="#signin" className="to_register" onClick={this.handleOnClick.bind(this)}> Log in </a>
                        </p>

                        <div className="clearfix"></div>
                        <br />
                        <div >
                            {successList}
                        </div>
                        <div >
                            {errorList}
                        </div>
                        <div>
                        <h1><i className="fa fa-paw"></i> Laravel (API) + react </h1>
                        <p>Made by Helmi</p>
                        </div>
                    </div>
                    </form>
                </section>
                </div> 
            </div>
        );
    }
}

export default Login;