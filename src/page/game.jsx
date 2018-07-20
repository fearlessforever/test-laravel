import React, {Component} from 'react'
import queryString from 'qs'

export default class Game extends Component{
    state ={
        listData:[],
    }
    componentDidMount(){
        let {userInfo} = this.props;
        fetch(window.helmi.api+'api/v1/game/datatable',{
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization':'Bearer '+ userInfo.api_token,
            },
            method:'GET', 
        }).then( res => res.json() )
        .then( res => { 
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
             if(res.data){
                this.setState({listData:res.data})
             }
        })
        .catch( res =>{
             
        })
    }
    handleClickPage(e){
        e.preventDefault()
        if(typeof this.props.setPage === 'function'){
            this.props.setPage('player')
        }
    }
    render(){
        let dataTable
        if(this.state.listData){
            dataTable = this.state.listData.map( val =>{
                return <tr key={val.id}>
                   <td>{val.id}</td> 
                   <td>{val.game_name}</td> 
                   <td>
                       <button className="btn btn-default">delete</button>
                       <button className="btn btn-info">edit</button>
                    </td> 
                </tr>
            })
        }
        return(
            <div className="container body">
            <div className="main_container">
                <div className="col-md-12 left_col">
                
                    <div className="right_col" role="main">
                    <div className="row">
                    <div className="clearfix"></div>
                        <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                            <div className="x_title">
                                <h2>Game List</h2>
                                    <ul className="nav navbar-right panel_toolbox">
                                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                </li> 
                                <li><a className="close-link"><i className="fa fa-close"></i></a>
                                </li>
                                </ul>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                            <div className="row">
                                <div>
                                    <button className="btn btn-primary">Tambah</button>
                                    &nbsp; <button onClick={this.handleClickPage.bind(this)} className="btn btn-default">Player page</button>
                                </div>
                                <table id="datatablez" className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                            <th> ID </th>
                                            <th> Nama Game </th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataTable}
                                        </tbody>
                                </table>
                            </div>


                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div> 
            </div> 
            </div>
            </div> 
        );
    }
}