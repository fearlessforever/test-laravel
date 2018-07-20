import React, {Component} from 'react'

export default class Player extends Component{
    state ={
        listData:false
    }
    handleClickPage(e){
        e.preventDefault()
        if(typeof this.props.setPage === 'function'){
            this.props.setPage('game')
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
        }else{
            dataTable = <tr >
                <td colSpan={3} ><h4>Tidak ada data</h4></td>
            </tr>
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
                                <h2>Player List</h2>
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
                                    <button className="btn btn-danger">Tambah</button>
                                    &nbsp; <button onClick={this.handleClickPage.bind(this)} className="btn btn-default">Game page</button>
                                </div>
                                <table id="datatablez" className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                            <th> ID Player</th>
                                            <th> Nama Player </th>
                                            <th> Nama Game yang dimainkan </th> 
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