const angular = require('angular');
const mountReactDirective = require('./mount-react-directive');

module.exports = () => {
  return angular.module('mount-react', [])
    .directive('mountReact', mountReactDirective());
};
