import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarSeparator,ToolbarGroup} from 'material-ui/Toolbar';
import { connect } from 'react-redux'


class FormSearch extends Component {
  // constructor(props){
  //   super(props)
  //   this.state={leng:0}
  // }
  // handleChange = (e) => {
  //   if(this.state.leng<e.target.value.length){
  //     this.props.searchitem(e.target.value);
  //     this.setState({
  //       leng: this.state.leng+1,
  //     });
  //   }else {
  //   this.setState({
  //     leng: this.state.leng-1,
  //   });
  //     this.props.seeditem();
  //   }
  // };
  render() {
    return (
      <div >
      <Toolbar>
            <TextField hintText="Keyword" hintStyle={{color: 'white'}} fullWidth={true}  />
      </Toolbar>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     seeditem: () => {dispatch(seeditem())},
//     searchitem: (value) => {dispatch(searchitem(value))}
//   }
// }
// connect(null,mapDispatchToProps)(FormSearch)
export default FormSearch;
