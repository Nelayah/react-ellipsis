# React Ellipsis 

[![npm](https://img.shields.io/npm/dm/react-d3-tree.svg)](https://www.npmjs.com/package/react-d3-tree)

React Ellipsis is a [React](http://facebook.github.io/react/) component that lets Cross-browser multiline text ellipsis.

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)

## Installation
```bash
npm i --save-dv react-ellipsis
```


## Usage
```jsx
import React from 'react';
import Ellipsis from 'react-ellipsis';

class MyComponent extends React.Component {
  render() {
    return (
      <Ellipsis>
        {`Apple
          Banana
          Orange`}
      </Ellipsis>
    );
  }
}
```
#### Output:
```
Apple...
```


## Props
Property | Type | Default| Description
-|-|-|-
lines | number | 1 | Submitting a number controls the number of lines that should be displayed.
suffix | string | '...' | 	The suffix string for the text.
style | React.CSSProperties | {wordBreak: 'break-all'} | Submitting a React CSSProperties that will overwrite the default one.
custom | (ellipsisText: React.ReactNode \| string, isEllipsis: boolean) => React.ReactNode | undefined | The function will return a React Component that overwrites the default one.
