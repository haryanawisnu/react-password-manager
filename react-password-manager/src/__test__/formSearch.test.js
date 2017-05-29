import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import TextField from 'material-ui/TextField';

import store from '../data/store';
import FormSearch from '../component/formSearch'

describe('FormSearch',()=>{
  it('should render div',()=>{
      const wrapper =shallow(<FormSearch store={store}/>);
      expect(wrapper.containsAllMatchingElements([
          <div></div>
      ])).to.be.false
  })
})
