import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarSeparator,ToolbarGroup} from 'material-ui/Toolbar';
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {searchpassword} from '../data/action'

class FormSearch extends Component {
  constructor(props){
    super(props)
    this.state={leng:0,
    value: 'url'}
  }
  handleChange = (e) => {
    let obj={};
    obj.key=this.state.value;
    obj.value=e.target.value;
    if(this.state.leng<e.target.value.length){
      this.props.searchpassword(obj);
      this.setState({
        leng: this.state.leng+1,
      });
    }else {
    this.setState({
      leng: this.state.leng-1,
    });
      this.props.searchpassword(obj);
    }
  };

  handleSelected = (event, index, value) => {
    this.setState({value});
    console.log(value);
  }

  render() {
    return (
      <div >
      <Toolbar style={{backgroundColor:'#00BCD4'}}>
          <ToolbarGroup>
              <TextField hintText="Keyword" hintStyle={{color: '#ffffff'}} inputStyle={{color:'#ffffff'}} fullWidth={true} onChange={this.handleChange.bind(this)} />
              <ToolbarSeparator/>
              <div >
              <SelectField
                floatingLabelText="Search By"
                floatingLabelStyle={{color: '#ffffff'}}
                labelStyle={{color: '#ffffff'}}
                selectedMenuItemStyle={{color:'#00ACC1'}}
                value={this.state.value}
                onChange={this.handleSelected} style={{width:200}}
              >
                <MenuItem value={'url'} primaryText="Url" />
                <MenuItem value={'username'} primaryText="Username" />
                <MenuItem value={'password'} primaryText="Password" />
              </SelectField>
              </div>
          </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchpassword: (value) => {dispatch(searchpassword(value))}
  }
}
export default connect(null,mapDispatchToProps)(FormSearch);
