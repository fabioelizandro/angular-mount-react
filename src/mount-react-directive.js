const React = require('react');
const ReactDOM = require('react-dom');

const directive = ($injector) => {
  const mapServices = (serviceKeys = []) => {
    return serviceKeys.reduce((servicesMap, serviceKey) => {
      return {...servicesMap, [serviceKey]: $injector.get(serviceKey)};
    }, {});
  };

  const link = ($scope, $element) => {
    const Component = React.createElement($scope.component, {
      ...$scope.props,
     ...mapServices($scope.inject)
    });

    ReactDOM.render(Component, $element[0]);

    $scope.$on('$destroy', () => ReactDOM.unmountComponentAtNode($element[0]));
  }

  return {
    link,
    scope: {
      component: '<',
      props: '<',
      inject: '<'
    }
  }
}

module.exports = () => ['$injector', directive];
