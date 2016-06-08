import React, { Component } from 'react';
import MainNavigator from './navigator';
import {
  StyleSheet,
  View
} from 'react-native';

class ReactRND extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});

export default ReactRND;
