'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { connect } from 'react-redux';
import { clearUser } from '../actions/LoginActions';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import moment from 'moment';
import Loader from '../components/Loader';
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

class TodayContainer extends Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <TopBar title="Settings"/>
          <View style={styles.fitContent}>
            <View style={styles.inputWrap}>
              <TouchableOpacity style={styles.button} onPress={this.handleLogoutClick}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        <Menu router={this.props.router}/>
      </View>
    );
  }

  handleLogoutClick() {
    this.props.dispatch(clearUser());
  }
}

export default connect(state => ({
    loading: state.loading,
    message: state.message,
    entries: state.entries,
    user: state.user
  })
)(TodayContainer);
