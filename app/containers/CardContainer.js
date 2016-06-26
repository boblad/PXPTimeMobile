'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { forms } from '../assets/FormsStyleSheet';
import { buttonStyles } from '../assets/ButtonsStyleSheet';
import { alertStyles } from '../assets/AlertStyleSheet';
import { connect } from 'react-redux';
import { listCards, selectCard } from '../actions/CardActions';
import { createEntry } from '../actions/EntryActions';
import { clearMessages } from '../actions/MessageActions';
import Card from '../components/Card';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import Success from '../components/alerts/Success';
import Failure from '../components/alerts/Failure';
import LinearGradient from 'react-native-linear-gradient';
import React, {
  StyleSheet,
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';

const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};


class CardContainer extends Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.tick = this.tick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearTime = this.handleClearTime.bind(this);
    this.handleTimeTextChange = this.handleTimeTextChange.bind(this);
    this.hideModalClick = this.hideModalClick.bind(this);
    this.state = {
      stopWatch:'',
      timer: '00:00:00',
      startTime: null,
      endTime: null,
      isRunning: false,
      plainTime: null
    }
  }

  componentWillMount() {
    this.setState({
      searchValue: '',
      stopWatch: '',
      isRunning: false,
      plainTime: null
    })
  }

  handleStart() {
    this.setState({
      startTime: new Date(),
      interval: setInterval(this.tick, 1000),
      isRunning: true
    })

  }

  handleStop() {
    this.setState({
      endTime: new Date(),
      interval: clearInterval(this.state.interval),
      isRunning: false
    })
  }

  tick() {
    const {stopWatch} = this.state;
    let time = Math.floor((new Date() - this.state.startTime)/ 1000)
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / (60 * 60));
    this.setState({
      timer: `${normalizeTime(hours)}:${normalizeTime(minutes)}:${normalizeTime(seconds)}`,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      plainTime: time
    })
  }

  handleClearTime() {
    this.setState({
      interval: clearInterval(this.state.interval),
      isRunning: false,
      timer: "00:00:00",
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  }

  handleTimeTextChange(text) {
    this.setState({
      timer: text
    })
  }

  render() {
    const { searchValue } = this.state;
    const { cards } = this.props;
    let lowerSearch  = searchValue.toLowerCase();
    return (
      <View style={styles.container}>
        {
          this.props.message.errorMessage &&
          <Failure hideModalClick={this.hideModalClick} />
        }
        {
          this.props.message.successMessage &&
          <Success hideModalClick={this.hideModalClick} />
        }
        <LinearGradient colors={['#000000', '#CCCCCC']} style={styles.linearGradient}>
          <TopBar title="Timer" onBackClick={() => { this.props.router.pop() }}/>
          {
            cards.selectedCard &&
            <View style={styles.row}>
              <Card card={cards.selectedCard} onCardClick={() => {}}/>
            </View>
          }
          {
            cards.selectedCard &&
            <View style={styles.cardView}>
              <View style={forms.timerInputWrap}>
                <TextInput
                  style={forms.timerInput}
                  value={this.state.timer}
                  onChangeText={this.handleTimeTextChange}/>
              </View>
              <View style={buttonStyles.timerButtonWrap}>
                <TouchableOpacity style={buttonStyles.submitButton} onPress={this.handleSubmit}>
                  <Text style={buttonStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {
                  !this.state.isRunning &&
                  <TouchableOpacity style={buttonStyles.startButton} onPress={this.handleStart}>
                    <Text style={buttonStyles.buttonText}>Start</Text>
                  </TouchableOpacity>
                }
                {
                  this.state.isRunning &&
                  <TouchableOpacity style={buttonStyles.stopButton} onPress={this.handleStop}>
                    <Text style={buttonStyles.buttonText}>Stop</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={buttonStyles.timerButtonWrap}>
                {
                  (this.state.timer !== "00:00:00" && this.state.isRunning === false) &&
                  <TouchableOpacity style={buttonStyles.submitButton} onPress={this.handleClearTime}>
                    <Text style={buttonStyles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          }
        </LinearGradient>
      </View>
    );
  }

  hideModalClick() {
    if (this.props.message.successMessage) {
        this.handleClearTime()
    }
    this.props.dispatch(clearMessages());
  }

  handleSubmit() {
    const {selectedCard} = this.props.cards;
    const { dispatch, user } = this.props;
    let body = {
      hours: this.state.hours,
      minutes: this.state.minutes,
      client_apikey: selectedCard.client.public.apikey,
      board_apikey: selectedCard.board.public.apikey,
      card_apikey: selectedCard.public.apikey
    }
    dispatch(createEntry(user.asyncKey, body));
  }
}

export default connect(state => ({
    cards: state.cards,
    message: state.message,
    user: state.user
  })
)(CardContainer);
