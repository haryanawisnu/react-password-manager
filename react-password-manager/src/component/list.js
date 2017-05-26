import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux'
import tgl from 'tgl'
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';

import { seedpassword,addpassword,deletepassword,seturl,setusername,setpassword,setid,setindex,setcreated } from '../data/action'

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
      console.log(event[0]);
    }
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose1}
        backgroundColor	='white' labelStyle={{color:'black'}}
        style={{marginRight:5}}
        hoverColor='#F8BBD0'
      />,
      <FlatButton
        label="Discard"
        onTouchTap={this.handleClose2}
        backgroundColor	='white' labelStyle={{color:'black'}}
        hoverColor='#F8BBD0'
      />,
    ];
    return (
        <div>
        <Table multiSelectable={false} onRowSelection={this.handleselect} selected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
            <TableRow>
              <TableHeaderColumn>URL</TableHeaderColumn>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Password</TableHeaderColumn>
              <TableHeaderColumn>CreatedAt</TableHeaderColumn>
              <TableHeaderColumn>UpdateAt</TableHeaderColumn>
              <TableHeaderColumn>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
          {
            this.props.list_password.map((password,index) =>{
              return(
            <TableRow key={password.id}>
              <TableRowColumn>{password.url}</TableRowColumn>
              <TableRowColumn>{password.username}</TableRowColumn>
              <TableRowColumn>{password.password}</TableRowColumn>
              <TableRowColumn>{tgl.kapan(new Date(password.createdAt))}</TableRowColumn>
              <TableRowColumn>{password.updatedAt ? tgl.kapan(new Date(password.updatedAt)) : '-'}</TableRowColumn>
              <TableRowColumn><FlatButton backgroundColor="#D50000" hoverColor="#FF1744" icon={<FontAwesome name='trash' size='2x'/>} onTouchTap={this.handleOpen.bind(this,password.id,index)}/></TableRowColumn>
          </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        <Dialog actions={actions}  modal={false} open={this.state.open} onRequestClose={this.handleClose} bodyStyle={{color:'white'}}>
            Discard this chart?
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
    deletepassword: (data) => {dispatch(deletepassword(data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
