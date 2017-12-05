import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, Dimensions } from 'react-native';

const _themes = Symbol('themes');
const _current = Symbol('current');

class Theme {
  constructor() {
    this[_themes] = {};
    this[_current] = undefined;
  }

  get styles() {
    return this[_themes][this[_current]];
  }

  set current(name) {
    if (!this[_themes][name]) {
      throw `no named ${name} theme could be foud.`;
    }
    this[_current] = name;
  }

  get current() {
    return this[_current];
  }

  add(name, value) {
    if ('string' !== typeof name && name.trim() === '') {
      throw 'please defined theme name';
    }

    let styles = {};
    if ('object' === typeof value) {
      styles = value.default || value;
    } else {
      throw 'the theme passed is not an object';
    }

    if (!this[_themes]['default']) {
      this[_current] = 'default';
      this[_themes]['default'] = value;
    }
    this[_themes][name] = value;
  }

}

const _load = Symbol('load');
const _active = Symbol('active');

class ThemeProvider extends Component {
  static childContextTypes = {
    theme: PropTypes.object.isRequired,
    activeTheme: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.theme = new Theme();

    // add themes
    if (props.themes) {
      Object.keys(props.themes).forEach(name => {
        this.theme.add(name, props.themes[name]);
      });
    }

    this.state = {
      actived: 'default',
    };

    this[_active] = this[_active].bind(this);
    this[_load] = this[_load].bind(this);

    this[_load](props);
  }

  async [_load](props) {
    try {
      const value = await AsyncStorage.getItem('@App:theme');
      if (value !== null && value !== this.state.actived) {
        this[_active](value);
      }
    } catch (error) {
      console.error('load theme error', error);
    }
  }

  getChildContext() {
    return {
      theme: this.theme,
      activeTheme: this[_active],
    };
  }

  [_active](name = 'default') {
    const beforeTheme = JSON.parse(JSON.stringify(this.theme.styles));
    this.theme.current = name;
    requestAnimationFrame(() => {
      this.setState({
        actived: name,
      }, async () => {
        // save to localstorage
        if (this.props.onChange && 'function' === typeof this.props.onChange) {
          this.props.onChange(name, beforeTheme, JSON.parse(JSON.stringify(this.theme.styles)));
        }
        try {
          await AsyncStorage.setItem('@App:theme', name);
        } catch (error) {
          console.error(`set theme ${name} error`, error);
        }
      });
    });
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;
export const { width, height } = Dimensions.get('window');
export { default as applyTheme } from './theme';
