# react-theme-provider

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

[npm-image]: https://badge.fury.io/js/react-native-theme-provider.svg
[npm-url]: https://npmjs.org/package/react-native-theme-provider
[travis-image]: https://travis-ci.org/WhatAKitty/react-native-theme-provider.svg?branch=master
[travis-url]: https://travis-ci.org/WhatAKitty/react-native-theme-provider

Theme provider for react-native

## Example

![Preview](https://github.com/WhatAKitty/react-native-theme-provider-example/raw/master/toggle-theme.gif)

https://github.com/WhatAKitty/react-native-theme-provider-example

## Usage

If you want to use this module, you should first install a react native babel dependence:
```shell
yarn add babel-plugin-transform-decorators-legacy
# or npm
# npm install babel-plugin-transform-decorators-legacy --save
```

And then, create a file named `.babelrc` contains:
```
{
  "presets": [
    "react-native"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

All right, then you can use this module in an easy way:

* install `react-native-theme-provider`
```shell
yarn add react-native-theme-provider
# or npm
# npm install react-native-theme-provider --save
```

* import package
```js
import ThemeProvider, { applyTheme } from 'react-native-theme-provider';
```

* wrap app under ThemeProvider and put themes in it
```js
<ThemeProvider
  themes={{
    'default': {
      color: '#333333',
    },
    'red': {
      color: 'red',
    },
  }}   {/* you can use require('/path/to/your/themefile') also, import is not support current. */}

  onChange={(name, before, after) => {
    console.log(before)
    console.log(after)
    // persist new theme into redux or something else.
    // this module will persist theme key into localstorage defaultly that key named `@App:theme`
  }}   {/* listen changes while theme changed */}
>
  <App />
</ThemeProvider>
```

* use theme styles from props by @applyTheme()

```js
@applyTheme()
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        {/* this.props.theme.styles is the theme styles object passed by yourself in ThemeProvider Component */}
        <Text style={[styles.instructions, this.props.theme.styles]}>
          {instructions}
        </Text>
        <Button
          title="Toggle Theme"
          onPress={() => {
            this.props.activeTheme(this.props.theme.current === 'default' ? 'red' : 'default');
          }}
        />
      </View>
    );
  }
}
```

## Properties

| Property Name  | Description |
| -------------  | ------------- |
| themes         | object of all themes or require function  |
| onChange       | listen for theme changed  |

## LICENSE

MIT
