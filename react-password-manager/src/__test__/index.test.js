import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import Main from '../component'
import Header from '../component/header'
import Form from '../component/form'
import Container from '../component/container'

describe('Main',()=>{
  it('should render FormSearch and List',()=>{
      const wrapper =shallow(<Main />);
      expect(wrapper.containsAllMatchingElements([
        <Header/>,
        <Form/>,
        <Container/>
      ])).to.be.true
  })
})
