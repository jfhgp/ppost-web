import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

// context
const StoreContext = createContext();

export class StoreProvider extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  constructor(props) {
    super(props);

    this.store = {};

    this.state = {
      get: key => this.getValue(key),
      set: (key, value) => this.setValue(key, value),
      setWithRender: (key, value) => this.setValueWithRender(key, value),
      remove: key => this.removeValue(key),
      removeWithRender: key => this.removeValueWithRender(key),
      setMultiWithRender: obj => this.setMultipleWithRender(obj),

      setToStore: (key, value) => this.setToStore(key, value),
      getFromStore: key => this.getFromStore(key),
      removeMultipleFromStore: arr => this.removeMultipleFromStore(arr)
    };
  }

  getValue(key) {
    return this.state[key];
  }

  setValue(key, value) {
    // eslint-disable-next-line
    this.state[key] = value;
  }

  setValueWithRender(key, value) {
    this.setState({ [key]: value });
  }

  setMultipleWithRender(state) {
    this.setState(state);
  }

  removeValue(key) {
    delete this.state[key];
  }

  removeValueWithRender(key) {
    this.setState(prevState => {
      delete prevState[key];
      return prevState;
    });
  }

  setToStore = (key, value) => {
    this.store[key] = value;
  };

  getFromStore = key => {
    return this.store[key];
  };

  removeMultipleFromStore = arr => {
    arr.forEach(key => {
      delete this.store[key];
    });
  };

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

// provide store to component
export const withStore = WrappedComponent => {
  return function WithStoreComponent(props) {
    return (
      <StoreContext.Consumer>
        {context => <WrappedComponent {...props} store={context} />}
      </StoreContext.Consumer>
    );
  };
};
