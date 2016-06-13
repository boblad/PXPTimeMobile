'use strict';

import { bindActionCreators } from 'redux';

import { iconStyles } from '../assets/IconStyles';
import { activityStyles } from '../assets/ActivityStyle';
import { connect } from 'react-redux';
import { clearMessages } from '../actions/MessageActions';
import { loginWithKey, loginWithCreds, setApiKey } from '../actions/LoginActions';
import pxpLogo from './images/pxpLogo.png';
import config from '../config';
//import ActivityIndicator from '../Common/ActivityIndicator/';
import Loader from '../components/Loader';
import Success from '../components/alerts/Success';
import Failure from '../components/alerts/Failure';
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
        this.props.router.toRootTab();
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
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
        />
        <Image style={styles.backgroundImage} source={require('./images/loginBackground.jpg')} />
        {
          this.props.message.errorMessage &&
          <Failure
            message={this.props.message.errorMessage}
            hideModalClick={this.hideModalClick} />
        }

        <View style={styles.contentWrapper}>
          <Image source={pxpLogo} resizeMode="contain" style={styles.logoIcon}/>
          <View style={styles.formWrapper}>
            {
              this.state.showTokenLogin &&
              <View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="API Key"
                  style={styles.textInput}
                  onChangeText={this.handleTokenInputChange}/>
              </View>
            }
            {
              !this.state.showTokenLogin &&
              <View>
                <View>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="E-mail"
                    style={styles.textInput}
                    onChangeText={this.handleUserNameChange}/>
                  <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/emailIcon.png')} />
                </View>
                <View>
                  <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={this.handlePasswordChange}/>
                  <Image style={styles.basicIcon} resizeMode="contain" source={require('./images/lockIcon.png')} />
                </View>
              </View>
            }
          </View>
          <TouchableOpacity style={styles.buttonBlue} onPress={this.handleLoginClick}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>- or -</Text>
          <TouchableOpacity style={styles.buttonClear} onPress={this.handleAlternateClick}>
            <Text style={styles.buttonText}>Sign In with {this.state.signInType}</Text>
          </TouchableOpacity>
        </View>
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

const { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    width: width,
    height: height
  },
  contentWrapper: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
    loading: state.loading,
    message: state.message
  })
)(LoginContainer);
