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
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleTrelloChange = this.handleTrelloChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      handle: '',
      trello_handle: '',
      cell_phone: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleFirstNameChange(value) {
    this.setState({
      first_name: value
    })
  }

  handleLastNameChange(value) {
    this.setState({
      last_name: value
    })
  }

  handleEmailChange(value) {
    this.setState({
      email: value
    })
  }

  handleUsernameChange(value) {
    this.setState({
      handle: value
    })
  }

  handleTrelloChange(value) {
    this.setState({
      trello_handle: value
    })
  }

  handlePhoneChange(value) {
    this.setState({
      cell_phone: value
    })
  }

  handlePasswordChange(value) {
    this.setState({
      password: value
    })
  }

  handlePasswordConfirmChange(value) {
    this.setState({
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
        <ScrollView>
          <View style={styles.contentWrapper}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View style={styles.formWrapper}>
              <View>
                <TextInput
                  autoCorrect={false}
                  placeholder="First Name"
                  style={styles.textInput}
                  onChangeText={this.handleFirstNameChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/userIcon.png')} />
              </View>
              <View>
                <TextInput
                  autoCorrect={false}
                  placeholder="Last Name"
                  style={styles.textInput}
                  onChangeText={this.handleLastNameChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/userIcon.png')} />
              </View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Email"
                  style={styles.textInput}
                  onChangeText={this.handleEmailChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/emailIcon.png')} />
              </View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Username"
                  style={styles.textInput}
                  onChangeText={this.handleUsernameChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/userIcon.png')} />
              </View>
              <View>
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
                  placeholder="Cell Phone #"
                  style={styles.textInput}
                  onChangeText={this.handlePhoneChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/phoneIcon.png')} />
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
              <View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={this.handlePasswordConfirmChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
              </View>
            </View>
            <TouchableOpacity style={styles.buttonBlue} onPress={this.handleSubmitUser}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>- or -</Text>
            <TouchableOpacity style={styles.buttonClear} onPress={this.handleLoginClick}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  contentWrapper: {
    width: width,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  titleWrap: {
    width: width,
    marginTop: 40,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  formWrapper: {
  },
  textInput: {
    height: 54,
    backgroundColor: '#FFFFFF',
    width: width-50,
    borderRadius: 5,
    color: '#A1A6BB',
    paddingLeft: 46,
    marginTop: 20
  },
  basicIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 39,
    left: 15
  },
  buttonClear: {
    height: 46,
    width: width-150,
    marginBottom: 60,
    backgroundColor: 'transparent',
    borderRadius: 23,
    borderColor: 'rgba(255, 255, 255, .6)',
    borderWidth: .5,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10
  }
});

export default connect(state => ({
    message: state.message
  })
)(SignUpContainer);
