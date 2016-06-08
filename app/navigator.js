import React, { Component } from 'react';
import LoginContainer from './containers/LoginContainer';
import MainRouter from './router';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';


var styles = StyleSheet.create({
  container:{
    flex: 1,
    height: 0
  },
});

class MainNavigator extends Component{
  renderScene(route, navigator) {
    this.router = this.router || new MainRouter(navigator);
    if (route.component) {
      return React.createElement(route.component, Object.assign({}, route.props,
        {
          ref: view => this[route.name] = view,
          router: this.router,
        }
      ));
    }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    return (
        <Navigator
          ref={view => this.navigator = view}
          initialRoute={{
            title: 'Time Tracker',
            component: LoginContainer,
            index: 0
          }}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
          />
    );
  }
};

export default MainNavigator;
