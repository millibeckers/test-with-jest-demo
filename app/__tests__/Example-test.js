import 'react-native';
import React from 'react';

import API from '../api';
import Example from '../Example';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

jest.mock('../api', () => {
  return {
    fetch: jest.fn().mockResolvedValue('some very cool data'),
  };
});

describe('Example', () => {
  it('renders correctly when not annoyed', () => {
    const example = renderer.create(<Example />);
    expect(example.getInstance().state.annoyed).toBeFalsy();
    expect(example.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when annoyed', (done) => {
    expect.assertions(1);

    const example = renderer.create(<Example />);
    example.getInstance().setState({annoyed: true}, () => {
      expect(example.toJSON()).toMatchSnapshot();
      done();
    });
  });
});

describe('componentDidMount', () => {
  it('calls _fetchData', () => {
    const example = renderer.create(<Example />).getInstance();

    const spy = jest.spyOn(example, '_fetchData');
    expect(spy).not.toHaveBeenCalled();

    example.componentDidMount();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('_onPress', () => {
  it('updates state.annoyed to true', () => {
    const example = renderer.create(<Example />).getInstance();

    expect(example.state).toHaveProperty('annoyed', false);

    const spy = jest.spyOn(example, 'setState');
    expect(spy).not.toHaveBeenCalled();

    example._onPress();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenLastCalledWith({annoyed: true});

    spy.mockRestore();
  });
});


describe('_fetchData', () => {
  it('calls API.fetch and updates the data when fetch resolves', (done) => {
    expect.assertions(4);
    const example = renderer.create(<Example />).getInstance();
    API.fetch.mockClear();
    expect(example.data).toEqual('Not yet...');
    expect(API.fetch).not.toHaveBeenCalled();
    API.fetch.mockResolvedValueOnce('It works!');

    example._fetchData().then(() => {
      expect(API.fetch).toHaveBeenCalled();
      expect(example.data).toEqual('It works!');
    }).finally(() => {
      API.fetch.mockClear();
      done();
    });
  });
});
