'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearUser } from '../actions/LoginActions';
import Menu from '../components/Menu';
import moment from 'moment';
import Loader from '../components/Loader';
import React, {
  Component,
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
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <View style={styles.navWrapper}>
          <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>Settings</Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={styles.buttonBlue} onPress={this.handleLogoutClick}>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navWrapper: {
    width: width,
    height: 60,
    top: 0,
    paddingTop: 29,
    position: 'absolute',
    backgroundColor: '#0786E7'
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
    color: '#FFFFFF',
    fontSize: 18
  },
  buttonBlue: {
    height: 46,
    width: width-150,
    marginTop: 20,
    backgroundColor: '#0786E7',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16
  }
});

export default connect(state => ({
    loading: state.loading,
    message: state.message,
    entries: state.entries,
    user: state.user
  })
)(SettingsContainer);
