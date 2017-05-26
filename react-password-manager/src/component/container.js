import React, { Component } from 'react';
import{Route} from 'react-router-dom';

import FormSearch from './formSearch'
import List from './list'

import '../style/css/form.css';

class Container extends Component {
  render() {
    return (
      <div className="col-9">
        <FormSearch/>
        <List/>
      </div>
    );
  }
}

export default Container;
