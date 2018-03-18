const React = require('react');
const ReactDOM = require('react-dom');
const angular = require('angular');
const angularMocks = require('angular-mocks/ngMock');
const mountReactDirective = require('./mount-react-directive');

describe('mount react directive', () => {
  beforeEach(() => {
    angular.module('test', [angularMocks])
      .value('myContainerItem', 'Robert')
      .directive('mountReact', mountReactDirective());
  });

  beforeEach(() => angular.mock.module('test'));

  it('renders react components', angular.mock.inject(($compile, $rootScope) => {
    const HelloComponent = () => React.createElement('span', {}, 'Hello World');

    const scope = $rootScope.$new();
    scope.component = HelloComponent;

    const element = $compile('<mount-react component="component"></mount-react>')(scope);
    scope.$digest();

    expect(element.text()).toEqual('Hello World');
  }));

  it('unmount component on destroy', angular.mock.inject(($compile, $rootScope) => {
    const HelloComponent = () => React.createElement('span', {}, 'Hello World');

    const scope = $rootScope.$new();
    scope.component = HelloComponent;

    const element = $compile('<mount-react component="component"></mount-react>')(scope);
    scope.$digest();

    scope.$destroy();

    expect(element.text()).toEqual('');
  }));

  it('pass props attribute to component', angular.mock.inject(($compile, $rootScope) => {
    const HelloComponent = ({name}) => React.createElement('span', {}, `Hello ${name}`);

    const scope = $rootScope.$new();
    scope.component = HelloComponent;

    const element = $compile(`<mount-react component="component" props="{name: 'Bob'}"></mount-react>`)(scope);
    scope.$digest();

    expect(element.text()).toEqual('Hello Bob');
  }));


  it('injects angular services into component', angular.mock.inject(($compile, $rootScope) => {
    const HelloComponent = ({myContainerItem}) => React.createElement('span', {}, `Hello ${myContainerItem}`);

    const scope = $rootScope.$new();
    scope.component = HelloComponent;

    const element = $compile(`<mount-react component="component" inject="['myContainerItem']"></mount-react>`)(scope);
    scope.$digest();

    expect(element.text()).toEqual('Hello Robert');
  }));
});
