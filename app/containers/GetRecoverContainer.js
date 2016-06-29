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


class GetRecoverContainer extends Component {
  constructor() {
    super();
    this.handleTrelloInputChange = this.handleTrelloInputChange.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleRecoverClick = this.handleRecoverClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.state = {
      username: ''
    }
  }

  handleTrelloInputChange(text) {
    this.setState({
      username: text
    });
  }

  handleSignInClick() {
    this.props.router.toLogin();
  }

  handleRecoverClick() {
    this.props.router.toSetRecover();
  }

  handleSubmitClick() {
    this.props.dispatch(toggleIsLoading(true));
    LoginService.req.getRecoverKey(this.state.username)
    .then((response) => {
      this.props.dispatch(toggleIsLoading(false));
      this.props.router.toSetRecover();
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
          <Text style={styles.helperText}>Enter your Trello username below and an email will be sent to you with a password recover token.</Text>
          <View style={styles.formWrapper}>
            <View style={styles.formFieldsWrapperSmall}>
              <View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Trello Username"
                  style={styles.textInput}
                  onChangeText={this.handleTrelloInputChange}/>
                <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonOrange} onPress={this.handleSubmitClick}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonClear} onPress={this.handleRecoverClick}>
          <Text style={styles.buttonText}>ENTER RECOVER KEY</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>- or -</Text>
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
    height: 108,
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
)(GetRecoverContainer);
