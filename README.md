# React Ellipsis PJS

React Ellipsis PJS is a [React](http://facebook.github.io/react/) component that lets Cross-browser multiline text ellipsis.

[![NPM](https://img.shields.io/npm/v/react-ellipsis-pjs.svg)](https://www.npmjs.com/package/react-ellipsis-pjs)

## Installation

react-ellipsis-pjs@2 requires React v16.8.0 or higher with React Hooks support.

```bash
npm i --save-dev react-ellipsis-pjs
```

The react-ellipsis-pjs@1 using React Class supports React v16.0.0 or higher.

```bash
npm i --save-dev react-ellipsis-pjs@1.0.0
```
The V1 documentation can be found in the [README_v1](README_v1.md)

## Basic Usage

```jsx
import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';

const text = `React makes it painless to create interactive UIs
Design simple views for each state in your application,
and React will efficiently update and render just the right`;

<Ellipsis text={text} /> 

// Render: React makes it painless to create interactive UIs...
```

## Custom Suffix And Lines

```jsx
<Ellipsis text={text} lines={2} suffix=" - For detail..." /> 

// Render: 
// React makes it painless to create interactive UIs
// Design simple views for each state in your application, - For detail...
```

## Custom Text Ellipsis Or Not

```jsx
import { Tooltip } from 'antd';

<Ellipsis
  text={text}
  render={(ellipsisText, isEllipsis) => {
    if (!isEllipsis) return ellipsisText;
    return (
      <Tooltip title={text}>{ellipsisText}</Tooltip>
    );
  }}
/>
```

## Props
Property | Type | Default | Description
-|-|-|-
text | string | - | Current value
suffix | string | '...' | When the text ellipsis, the suffix string for the text.
lines | number | 1 | Submitting a number controls the number of lines that should be displayed.
render | (ellipsisText: string, isEllipsis: boolean) => React.ReactNode | - | The function that returns a ReactNode will overwrite the default one.
style | React.CSSProperties | - | Change React Ellipsis PJS Componen Style
