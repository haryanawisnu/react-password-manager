import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux'
import tgl from 'tgl'
import FlatButton from 'material-ui/FlatButton';

import { reset,seedpassword,addpassword,deletepassword,seturl,setusername,setpassword,setid,setindex,setcreated } from '../data/action'

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      obj:{}
    };
  }
  componentDidMount(){
    this.props.seedpassword()
  }
  handleOpen = (e,id) => {
    let obj={};
    obj.id=e;
    obj.index=id;
    this.setState({open: true,obj});
  };

  handleClose1 = () => {
    this.setState({open: false});
  };
  handleClose2 = () => {
    this.props.deletepassword(this.state.obj);
    this.setState({open: false});
  };
  handleselect = (event) => {
    if(event.length>0){
      this.props.setid(this.props.list_password[event[0]].id);
      this.props.seturl(this.props.list_password[event[0]].url);
      this.props.setusername(this.props.list_password[event[0]].username);
      this.props.setpassword(this.props.list_password[event[0]].password);
      this.props.setcreated(this.props.list_password[event[0]].createdAt);
      this.props.setindex(event[0]);
    }else {
      this.props.reset();
    }
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose1}
        backgroundColor='#00BCD4' hoverColor='#80DEEA' labelStyle={{color:'#ffffff'}}
        style={{marginRight:5}}
      />,
      <FlatButton
        label="Delete"
        onTouchTap={this.handleClose2}
        backgroundColor='#00BCD4' hoverColor='#80DEEA' labelStyle={{color:'#ffffff'}}
      />,
    ];
    return (
        <div style={{border:'2px solid #00BCD4'}}>
        <Table fixedHeader={true} height='430'  multiSelectable={false} onRowSelection={this.handleselect}  >
          <TableHeader adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{color:'#00BCD4'}} >URL</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#00BCD4'}}>Username</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#00BCD4'}}>Password</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#00BCD4'}}>CreatedAt</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#00BCD4'}}>UpdateAt</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#00BCD4'}}>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} style={{overflow:'visible'}} >
          {
            this.props.list_password.map((password,index) =>{
              return(
            <TableRow key={password.id} >
              <TableRowColumn style={{color:'#757575'}}>{password.url}</TableRowColumn>
              <TableRowColumn style={{color:'#757575'}}>{password.username}</TableRowColumn>
              <TableRowColumn style={{color:'#757575'}}>{password.password}</TableRowColumn>
              <TableRowColumn style={{color:'#757575'}}>{tgl.kapan(new Date(password.createdAt))}</TableRowColumn>
              <TableRowColumn style={{color:'#757575'}}>{password.updatedAt ? tgl.kapan(new Date(password.updatedAt)) : '-'}</TableRowColumn>
              <TableRowColumn><FlatButton label="Delete" backgroundColor='#00BCD4' hoverColor='#80DEEA' labelStyle={{color:'#ffffff'}} onTouchTap={this.handleOpen.bind(this,password.id,index)}/></TableRowColumn>
          </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        <Dialog
          title="DELETE!" titleStyle={{color:'#00838F'}} actions={actions}  modal={false} open={this.state.open} onRequestClose={this.handleClose} bodyStyle={{color:'#ffffff'}} >
          <div style={{color:'#00ACC1'}}>Delete this Password?</div>
        </Dialog>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list_password :state.list_password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    seedpassword: () => {dispatch(seedpassword())},
    setindex: (data) => {dispatch(setindex(data))},
    addpassword: (data) => {dispatch(addpassword(data))},
    seturl: (data) => {dispatch(seturl(data))},
    setusername: (data) => {dispatch(setusername(data))},
    setpassword: (data) => {dispatch(setpassword(data))},
    setcreated: (data) => {dispatch(setcreated(data))},
    setid: (data) => {dispatch(setid(data))},
    deletepassword: (data) => {dispatch(deletepassword(data))},
    reset: (data) => {dispatch(reset(data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
