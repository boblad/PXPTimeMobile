'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { iconStyles } from '../assets/IconStyles';
import { activityStyles } from '../assets/ActivityStyle';
import { connect } from 'react-redux';
import { clearMessages } from '../actions/MessageActions';
import { loginWithKey, loginWithCreds, setApiKey } from '../actions/LoginActions';
import Pxplogo from '../assets/images/Pxplogo.png';
import config from '../config';
//import ActivityIndicator from '../Common/ActivityIndicator/';
import Loader from '../components/Loader';
import Success from '../components/alerts/Success';
import Failure from '../components/alerts/Failure';
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Modal,
  ActivityIndicatorIOS
} from 'react-native';


class LoginContainer extends Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleAlternateClick = this.handleAlternateClick.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTokenInputChange = this.handleTokenInputChange.bind(this);
    this.hideModalClick = this.hideModalClick.bind(this);
    this.state = {
      email: '',
      password: '',
      showTokenLogin: false,
      signInType: 'Api Key'
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('apikey').then((key) => {
      if (key) {
        this.props.dispatch(setApiKey(key));
        this.props.router.toDashboard(this.state);
      }
    }).done();
    this.setState({
      email: '',
      password: '',
      showTokenLogin: false
    })
  }

  handleUserNameChange(text) {
    this.setState({
      email: text
    })
  }

  handlePasswordChange(text) {
    this.setState({
      password: text
    })
  }

  handleTokenInputChange(text) {
    this.setState({
      tokenInput: text
    })
  }

  handleAlternateClick() {
    if (this.state.showTokenLogin === false) {
      this.setState({
        showTokenLogin: true,
        signInType: 'Credentials'
      })
    } else {
      this.setState({
        showTokenLogin: false,
        signInType: 'Api Key'
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.message.errorMessage &&
          <Failure
            message={this.props.message.errorMessage}
            hideModalClick={this.hideModalClick} />
        }
        <Image source={Pxplogo} style={iconStyles.logoIcon}/>
        <Text>Welcome to pxp time.</Text>
        {
          this.state.showTokenLogin &&
          <View style={styles.inputWrap}>
            <Text sytle={styles.inputLabel}>Api Key</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChangeText={this.handleTokenInputChange}/>
          </View>
        }
        {
          !this.state.showTokenLogin &&
          <View style={styles.inputWrap}>
            <Text sytle={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChangeText={this.handleUserNameChange}/>
            <Text sytle={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChangeText={this.handlePasswordChange}/>
          </View>
        }
        <View style={styles.inputWrap}>
          <TouchableOpacity style={styles.button} onPress={this.handleLoginClick}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleAlternateClick}>
          <Text>Or Sign In with {this.state.signInType}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  hideModalClick() {
    this.props.dispatch(clearMessages());
  }

  handleLoginClick() {
    if (this.state.showTokenLogin) {
      this.props.dispatch(loginWithKey(this.state.tokenInput, this.props.router))
    } else {
      const { email, password } = this.state;
      this.props.dispatch(loginWithCreds(email, password, this.props.router));
    }
  }
}

export default connect(state => ({
    loading: state.loading,
    message: state.message
  })
)(LoginContainer);
