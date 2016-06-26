import React, { Component } from 'react';
import MainNavigator from './navigator';
import { connect } from 'react-redux';
import ActivityIndicator from './components/ActivityIndicator';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

class ReactRND extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
        {
          this.props.loading.isLoading &&
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        }
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  loader: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (height / 2) - 40,
    left: (width / 2) - 40,
    borderRadius: 5,
    backgroundColor: 'transparent'
  }
});

export default connect(state => ({
    loading: state.loading
  })
)(ReactRND);
