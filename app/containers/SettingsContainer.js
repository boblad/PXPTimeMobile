'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearUser } from '../actions/LoginActions';
import Menu from '../components/Menu';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

class SettingsContainer extends Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navWrapper}>
          <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>Settings</Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={styles.buttonOrange} onPress={this.handleLogoutClick}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleLogoutClick() {
    this.props.dispatch(clearUser(this.props.router));
  }
}

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARKER_GREY
  },
  navWrapper: {
    width: width,
    height: 60,
    top: 0,
    paddingTop: 29,
    position: 'absolute',
    backgroundColor: colors.DARKER_GREY,
    borderBottomWidth: .5,
    borderBottomColor: colors.PXP_GREY
  },
  navTitle: {
    width: width/2,
    position: 'absolute',
    left: (width/2)-(width/4),
    top: 29,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitleText: {
    color: colors.PXP_ORANGE,
    fontSize: 18
  },
  buttonOrange: {
    height: 46,
    width: width-50,
    marginTop: 20,
    backgroundColor: colors.PXP_ORANGE,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16
  }
});

export default connect(state => ({
    message: state.message,
    entries: state.entries,
    user: state.user
  })
)(SettingsContainer);
