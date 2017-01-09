import React, { Component } from 'react';
import LoginContainer from './containers/LoginContainer';
import RootTabContainer from './containers/RootTabContainer';
import MainRouter from './router';

import {
  AsyncStorage,
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';


var styles = StyleSheet.create({
  container:{
    flex: 1,
    height: 0
  },
});

class MainNavigator extends Component{
  constructor(props) {
    super(props);
    this.loadInitState = this.loadInitState.bind(this)
    this.state = {
      initialRoute: null
    };
  }

  componentWillMount () {
    this.loadInitState().done()
  }

  loadInitState = async () => {
    let initialRoute = {
      title: 'Dashboard',
      component: RootTabContainer
    };
    try {
      let value = await AsyncStorage.getItem('apikey');
      if (value === null) {
        initialRoute = {
          title: 'Time Tracker',
          component: LoginContainer,
          index: 0
        };
      }
      this.setState({
        initialRoute,
      })
    } catch (err) {
      console.log('er', err)
    }

  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress',
      this.handleBackAndroid.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress',
      this.handleBackAndroid.bind(this));
  }

  handleBackAndroid() {
    this.router.pop();
    return true;
  }

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
    if (this.state.initialRoute !== null) {
      return (
        <Navigator
          ref={view => this.navigator = view}
          initialRoute={this.state.initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
          />
      );
    } else {
      return (
        <View></View>
      )
    }
  }
};

export default MainNavigator;
