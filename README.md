# Angular mount React

Angular directive to integrate React components into angular application

[![Build Status](https://travis-ci.org/fabioelizandro/angular-mount-react.svg?branch=master)](https://travis-ci.org/fabioelizandro/angular-mount-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/0112ae320c19fb5b8c9d/maintainability)](https://codeclimate.com/github/fabioelizandro/angular-mount-react/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0112ae320c19fb5b8c9d/test_coverage)](https://codeclimate.com/github/fabioelizandro/angular-mount-react/test_coverage)

## How to use

```js
const HelloComponent = ({ name, upperCase }) => {
  return (
    <span>
      {upperCase(`Hello ${name}`)}
    </span>
  );
};

angular.module('app', [mountReact().name])
  .factory('upperCase', () => {
    return (string) => string.toUpperCase()
  })
  .component('hello', {
    template: `
      <mount-react component="$ctrl.component" props="{name: $ctrl.name}" inject="['upperCase']">
      </mount-react>
    `,
    controller: () => {
      return {
        component: HelloComponent
      };
    },
    bindings: {
      name: '@'
    }
  });
```

[For a full example](https://github.com/fabioelizandro/angular-mount-react-example)
