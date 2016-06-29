'use strict';

import { bindActionCreators } from 'redux';

import { iconStyles } from '../assets/IconStyles';
import { connect } from 'react-redux';
import { toggleIsLoading } from '../actions/LoadingActions';
import { setErrorMessage, clearMessages } from '../actions/MessageActions';
import pxpLogo from './images/pxpLogo.png';
import config from '../config';
import Success from '../components/alerts/Success';
import Failure from '../components/alerts/Failure';
import LoginService from '../services/LoginService';

import React, {
  ActivityIndicatorIOS,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


class SetRecoverContainer extends Component {
  constructor() {
    super();
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handleKeyInputChange = this.handleKeyInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.state = {
      email: '',
      recover_key: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleEmailInputChange(text) {
    this.setState({
      email: text
    });
  }

  handleKeyInputChange(text) {
    this.setState({
      recover_key: text
    });
  }

  handlePasswordInputChange(text) {
    this.setState({
      password: text,
      password_confirmation: text
    });
  }

  handleSignInClick() {
    this.props.router.toLogin();
  }

  handleSubmitClick() {
    this.props.dispatch(toggleIsLoading(true));
    LoginService.req.setRecoverKey(this.state)
    .then((response) => {
      this.props.dispatch(toggleIsLoading(false));
      this.props.router.toLogin();
    }).catch((err) => {
      this.props.dispatch(toggleIsLoading(false));
      this.props.dispatch(setErrorMessage('Login Failed'));
    });
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
          <Text style={styles.helperText}>Find the recover key sent to you via email and enter it below along with your email address and new password.</Text>
          <View style={styles.formWrapper}>
            <View style={styles.formFieldsWrapper}>
              <View style={styles.inputWrapWithBorder}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={this.handleEmailInputChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/emailIcon.png')} />
              </View>
              <View style={styles.inputWrapWithBorder}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Recover Key"
                  style={styles.textInput}
                  onChangeText={this.handleKeyInputChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
              </View>
              <View>
                <TextInput
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="New Password"
                  style={styles.textInput}
                  onChangeText={this.handlePasswordInputChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonOrange} onPress={this.handleSubmitClick}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonClear} onPress={this.handleSignInClick}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </Image>
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
  helperText: {
    color: colors.WHITE,
    fontSize: 16,
    width: width-50,
    marginBottom: 20
  },
  logoIcon: {
    width: width/2,
    height: width/3
  },
  mainText: {
    color: colors.WHITE,
    fontSize: 30
  },
  formFieldsWrapper: {
    borderRadius: 3,
    height: 162,
    backgroundColor: colors.WHITE,
    borderColor: colors.LIGHTER_GREY,
    borderWidth: 2
  },
  formFieldsWrapperSmall: {
    borderRadius: 3,
    height: 54,
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
    marginBottom: 20,
    backgroundColor: colors.PXP_ORANGE,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16
  },
  orText: {
    color: colors.WHITE,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10
  }
});

export default connect(state => ({
    message: state.message
  })
)(SetRecoverContainer);
