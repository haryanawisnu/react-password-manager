import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { addpassword,seturl,setusername,setpassword,setid,reset,updatepassword } from '../data/action'
import '../style/css/form.css';

class Form extends Component {
  constructor(props){
    super(props)
    this.state={
      valid1:false,
      valid2:false,
      valid3:false,
      valid4:false,
      valid5:false,
      confrimPassword:'',
      validUrl:'',
      validUsername:'',
      validPassword:'',
      open: false
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };
  validation = () => {
    this.setState({
      validUrl:'',
      validUsername:'',
      validPassword:''
    });
    if (this.props.url==='') {
      this.setState({
        validUrl:'this required!'
      });
    }else if (this.props.username==='') {
      this.setState({
        validUsername:'this required!'
      });
    }else if (this.props.password==='') {
      this.setState({
        validUsername:'this required!'
      });
    }else if (this.props.password===this.state.confrimPassword) {
        if (this.state.valid1&&this.state.valid2&&this.state.valid3&&this.state.valid4&&this.state.valid5) {
          return true;
        }else {
          this.setState({
            validPassword:'Check format password'
          });
          return false;
        }
    }else {
      this.setState({
        validPassword:'Not match'
      });
      return false;
    }
  }
  handleButtonsave = () => {
    if (this.validation()) {
      let obj={}
      obj.url=this.props.url;
      obj.username=this.props.username;
      obj.password=this.props.password;
      this.props.addpassword(obj);
      this.setState({
        confrimPassword:''
      });
      this.props.reset();
    }
  }
  handleButtonupdate = () => {
    if (this.validation()) {
      if(this.props.id){
        let obj={}
        obj.id=this.props.id;
        obj.url=this.props.url;
        obj.username=this.props.username;
        obj.password=this.props.password;
        obj.index=this.props.index;
        obj.createdAt=this.props.createdAt;
        this.props.updatepassword(obj);
        this.setState({
          confrimPassword:''
        });
        this.props.reset();
      }else {
        this.setState({open: true});
      }
    }
  }
  handleurl = (event,value) => {
    this.props.seturl(value);
  }
  handleusername = (event,value) => {
    this.props.setusername(value);
  }
  handleConfirmpassword = (event,value) => {
    this.setState({
      confrimPassword:value
    });
  }
  handlepassword = (event,value) => {
    let pattern='';
    pattern = /[a-z]/;
    if(pattern.test(value)) {
      this.setState({
        valid1:true
      });
    }else {
      this.setState({
        valid1:false
      });
    }
    pattern = /[A-Z]/;
    if(pattern.test(value)) {
      this.setState({
        valid2:true
      });
    }else {
      this.setState({
        valid2:false
      });
    }
    pattern = /[0-9]/;
    if(pattern.test(value)) {
      this.setState({
        valid3:true
      });
    }else {
      this.setState({
        valid3:false
      });
    }
    pattern = /[#?!@$%^&*-]/;
    if(pattern.test(value)) {
      this.setState({
        valid4:true
      });
    }else {
      this.setState({
        valid4:false
      });
    }
    if(value.length>5) {
      this.setState({
        valid5:true
      });
    }else {
      this.setState({
        valid5:false
      });
    }
    this.props.setpassword(value);
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
        backgroundColor='#00BCD4' hoverColor='#80DEEA' labelStyle={{color:'#ffffff'}}
      />
    ];
    return (
      <div className="col-3 menu" >
        <div style={{marginLeft:'10%'}}>
          <TextField
           floatingLabelText="Url"
           errorText={this.state.validUrl}
           floatingLabelStyle={{color:'#00BCD4'}}
           inputStyle={{color:'#757575'}}
           value={this.props.url}
           onChange={this.handleurl}
          />
          <TextField
           floatingLabelText="Username"
           errorText={this.state.validUsername}
           floatingLabelStyle={{color:'#00BCD4'}}
           inputStyle={{color:'#757575'}}
           value={this.props.username}
           onChange={this.handleusername}
          />
          <PasswordField
           type='password'
           floatingLabelText="Password"
           errorText={this.state.validPassword}
           floatingLabelStyle={{color:'#00BCD4'}}
           inputStyle={{color:'#757575'}}
           value={this.props.password}
           onChange={this.handlepassword}
          />
          <PasswordField
           type='password'
           floatingLabelText="Confrim Password"
           errorText={this.state.validPassword}
           floatingLabelStyle={{color:'#00BCD4'}}
           inputStyle={{color:'#757575'}}
           value={this.state.confrimPassword}
           onChange={this.handleConfirmpassword}
          />
          <br/>
          <br/>
          <RaisedButton label="Save" onTouchTap={this.handleButtonsave} backgroundColor='#00BCD4'  labelColor='#ffffff' />
          <RaisedButton label="Update" onTouchTap={this.handleButtonupdate} backgroundColor='#00BCD4' labelColor='#ffffff' style={{marginLeft:10}}  />
          <Toggle
            label="At least one lowercase"
            labelStyle={{color:'#00BCD4'}}
            style={{marginBottom: 16,marginTop:20}}
            checked={this.state.valid1}
          />
          <Toggle
            label="At least one uppercase"
            labelStyle={{color:'#00BCD4'}}
            style={{marginBottom: 16}}
            checked={this.state.valid2}
          />
          <Toggle
            label="At least one number"
            labelStyle={{color:'#00BCD4'}}
            style={{marginBottom: 16}}
            checked={this.state.valid3}
          />
          <Toggle
            label="At least special character!"
            labelStyle={{color:'#00BCD4'}}
            style={{marginBottom: 16}}
            checked={this.state.valid4}
          />
          <Toggle
            label="At least length > 5 !"
            labelStyle={{color:'#00BCD4'}}
            style={{marginBottom: 16}}
            checked={this.state.valid5}
          />
          <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <div style={{color:'#00ACC1'}}>Select Table First!</div>
          </Dialog>
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
