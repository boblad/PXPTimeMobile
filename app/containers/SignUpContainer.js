'use strict';

import { bindActionCreators } from 'redux';

import { iconStyles } from '../assets/IconStyles';
import { connect } from 'react-redux';
import { clearMessages } from '../actions/MessageActions';
import { loginWithKey, loginWithCreds, setApiKey, createUser } from '../actions/LoginActions';
import pxpLogo from './images/pxpLogo.png';
import config from '../config';
import Success from '../components/alerts/Success';
import Failure from '../components/alerts/Failure';
import React, {
  ActivityIndicatorIOS,
  Alert,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import _ from 'lodash';


class SignUpContainer extends Component {
  constructor() {
    super();
    this.hideModalClick = this.hideModalClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTrelloChange = this.handleTrelloChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      handle: '',
      trello_handle: '',
      cell_phone: '555-555-5555',
      password: '',
      password_confirmation: ''
    }
  }

  handleNameChange(value) {
    let nameArray = value.split(' ');
    let first = '';
    let last = '';

    if (nameArray.length === 1) {
      first = nameArray[0];
    }
    if (nameArray.length > 1) {
      first = nameArray[0];
      last = nameArray[1];
    }

    this.setState({
      first_name: first,
      last_name: last
    })
  }

  handleEmailChange(value) {
    this.setState({
      email: value
    })
  }

  handleTrelloChange(value) {
    this.setState({
      handle: value,
      trello_handle: value
    })
  }

  handlePasswordChange(value) {
    this.setState({
      password: value,
      password_confirmation: value
    })
  }

  render() {
    return (
      <Image style={styles.mainContainer} resizeMode="cover" source={require('./images/loginBackground.jpg')}>
        <StatusBar
          barStyle="light-content"
        />
        {
          this.props.message.errorMessage &&
          <Failure
            message={this.props.message.errorMessage}
            hideModalClick={this.hideModalClick} />
        }
        <View style={styles.topContentWrapper}>
          <Image source={pxpLogo} resizeMode="contain" style={styles.logoIcon}/>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.formFieldsWrapper}>
            <View style={styles.inputWrapWithBorder}>
              <TextInput
                autoCorrect={false}
                placeholder="Name"
                style={styles.textInput}
                onChangeText={this.handleNameChange}/>
              <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/userIcon.png')} />
            </View>
            <View style={styles.inputWrapWithBorder}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
                style={styles.textInput}
                onChangeText={this.handleEmailChange}/>
              <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/emailIcon.png')} />
            </View>
            <View style={styles.inputWrapWithBorder}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Trello Handle (username)"
                style={styles.textInput}
                onChangeText={this.handleTrelloChange}/>
              <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/userIcon.png')} />
            </View>
            <View>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={this.handlePasswordChange}/>
              <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
            </View>
          </View>
          <View style={styles.signUpButtonDivider} />
          <TouchableOpacity style={styles.buttonOrange} onPress={this.handleSubmitUser}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }

  hideModalClick() {
    this.props.dispatch(clearMessages());
  }

  handleLoginClick() {
    this.props.router.pop();
  }

  handleSubmitUser() {
    const { dispatch, router } = this.props;
    let invalidFields = 0;
    let user = this.state;
    let numFields = Object.keys(this.state).length;
    _.forEach(Object.keys(this.state), function(key, i) {
      let value = user[key];
      if (value === '') {
        invalidFields++;
      }
      if (i >= numFields-1) {
        if (invalidFields === 0) {
          dispatch(createUser(user, router));
        } else {
          Alert.alert(
            'Error',
            'All fields are requied.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
        }
      }
    })
  }
}

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
  },
  backgroundImage: {
    width: width,
    height: height
  },
  topContentWrapper: {
    width: width,
    height: height/2,
    paddingTop: height/10,
    alignItems: 'center'
  },
  contentWrapper: {
    width: width,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 20
  },
  logoIcon: {
    width: width/2,
    height: width/3
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  formWrapper: {
  },
  formFieldsWrapper: {
    borderRadius: 3,
    height: 216,
    backgroundColor: colors.WHITE,
    borderColor: colors.LIGHTER_GREY,
    borderWidth: 2
  },
  inputWrapWithBorder: {
    height: 54,
    width: width-50,
    borderBottomColor: colors.LIGHTER_GREY,
    borderBottomWidth: 2
  },
  textInput: {
    height: 54,
    backgroundColor: 'transparent',
    width: width-50,
    color: colors.LIGHT_GREY,
    paddingLeft: 46
  },
  basicIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 19,
    left: 15
  },
  buttonClear: {
    height: 46,
    width: width-50,
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderColor: colors.WHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10
  },
  signUpButtonDivider: {
    width: width,
    height: 2,
    marginTop: 20,
    backgroundColor: colors.LIGHTER_GREY
  }
});

export default connect(state => ({
    message: state.message
  })
)(SignUpContainer);
