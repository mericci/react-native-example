import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../../src/screens/home/Home';
import { Provider } from 'react-redux'
import store from '../../src/store/Store'

describe('<Home />', () => {
  
  it('has 4 child', () => {
    const tree = renderer.create(<Provider store={store}><Home /></Provider>).toJSON();
    expect(tree.children.length).toBe(4);
  });
});