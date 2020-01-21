# React Ellipsis 

React Ellipsis is a [React](http://facebook.github.io/react/) component that lets Cross-browser multiline text ellipsis.

[![NPM](https://img.shields.io/npm/v/react-ellipsis-pjs.svg)](https://www.npmjs.com/package/react-ellipsis-pjs)

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)

## Installation
```bash
npm i --save-dev react-ellipsis-pjs
```


## Usage

### Example01:
```jsx
import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';

class MyComponent extends React.Component {
  render() {
    const {value} = this.props;
    return (
      <Ellipsis lines={1}>
        {value}
      </Ellipsis>
    );
  }
}
```
#### Render:

If `MyComponent.props.value` :

```
Apple
Banana
Orange
```
It render:
```
Apple...
```

### Example02:
```jsx
import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';

class MyComponent extends React.Component {
  render() {
    const {value} = this.props;
    const props = {
      lines: 2,
      suffix: '......',
      custom: (ellipsisText, isEllipsis) => {
        if (!isEllipsis) return ellipsisText;
        return (
          <div title={value} style={{whiteSpace: 'pre-wrap'}}>{ellipsisText}</div>
        );
      }
    };
    return (
      <Ellipsis {...props} >
        {value}
      </Ellipsis>
    );
  }
}
```
#### Render:

e.g.1

If `MyComponent.props.value` :
```
Apple
```
It render:
```
Apple
```

e.g.2

If `MyComponent.props.value` :

```
Apple
Banana
Orange
```
It render:
```
<div title="Apple\nBanana\nOrange">
  Apple
  Banana......
<div>
```

## Props
Property | Type | Default| Description
-|-|-|-
lines | number | 1 | Submitting a number controls the number of lines that should be displayed.
suffix | string | '...' | 	The suffix string for the text.
style | React.CSSProperties | {wordBreak: 'break-all', whiteSpace: 'pre-wrap'} | Submitting React CSSProperties that will overwrite the default one.
custom | (ellipsisText: React.ReactNode \| string, isEllipsis: boolean) => React.ReactNode | undefined | The function will return a ReactNode that overwrites the default one.
