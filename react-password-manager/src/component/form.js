import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import { addpassword,seturl,setusername,setpassword,setid,reset,updatepassword } from '../data/action'
import '../style/css/form.css';

class Form extends Component {
  handleButtonsave = () => {
    let obj={}
    obj.url=this.props.url;
    obj.username=this.props.username;
    obj.password=this.props.password;
    this.props.addpassword(obj);
    this.props.reset();
  }
  handleButtonupdate = () => {
    let obj={}
    obj.id=this.props.id;
    obj.url=this.props.url;
    obj.username=this.props.username;
    obj.password=this.props.password;
    obj.index=this.props.index;
    obj.createdAt=this.props.createdAt;
    this.props.updatepassword(obj);
    this.props.reset();
  }
  handleurl = (event,value) => {
    this.props.seturl(value);
  }
  handleusername = (event,value) => {
    this.props.setusername(value);
  }
  handlepassword = (event,value) => {
    this.props.setpassword(value);
  }

  render() {
    return (
      <div className="col-3 menu" style={{backgroundColor:'black'}}>
        <div style={{marginLeft:'10%'}}>
          <TextField
           floatingLabelText="Url"
           value={this.props.url}
           onChange={this.handleurl}
          /><br/>
          <TextField
           floatingLabelText="Username"
           value={this.props.username}
           onChange={this.handleusername}
          />
          <br/>
          <TextField
           type='password'
           floatingLabelText="Password"
           value={this.props.password}
           onChange={this.handlepassword}
          />
          <br/>
          <br/>
          <RaisedButton label="Save" onTouchTap={this.handleButtonsave}  />
          <RaisedButton label="Update" onTouchTap={this.handleButtonupdate} style={{marginLeft:10}}  />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list_password :state.list_password,
    id :state.id,
    url :state.url,
    username :state.username,
    password :state.password,
    createdAt :state.createdAt,
    index:state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatepassword: (data) => {dispatch(updatepassword(data))},
    addpassword: (data) => {dispatch(addpassword(data))},
    seturl: (data) => {dispatch(seturl(data))},
    setusername: (data) => {dispatch(setusername(data))},
    setpassword: (data) => {dispatch(setpassword(data))},
    setid: (data) => {dispatch(setid(data))},
    reset: () => {dispatch(reset())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);
