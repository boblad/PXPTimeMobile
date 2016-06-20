import { bindActionCreators } from 'redux';
import { listEntries, createEntry, deleteEntry } from '../actions/EntryActions';
import { setApiKey } from '../actions/LoginActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getDayEntries } from '../helpers/TimeHelpers';
var Swipeout = require('react-native-swipeout')
var dismissKeyboard = require('dismissKeyboard');

import React, {
  Alert,
  AppState,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const GREY = 'rgb(240, 240, 240)';
const LIGHT_GREY = 'rgb(238, 238, 238)';
const TEXT_GREY = 'rgb(186, 186, 186)';
const BLUE = 'rgb(23, 108, 230)';
const LIGHT_BLUE = 'rgb(118, 155, 239)';
const TEAL_BLUE = 'rgb(75, 145, 230)';


const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

class DashboardContainer extends Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.tick = this.tick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearTime = this.handleClearTime.bind(this);
    this.handleTimeTextChange = this.handleTimeTextChange.bind(this);
    this.hideModalClick = this.hideModalClick.bind(this);
    this.handleBoardSelectClick = this.handleBoardSelectClick.bind(this);
    this.handleCardSelectClick = this.handleCardSelectClick.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleAppBackground = this.handleAppBackground.bind(this);
    this.handleAppForeground = this.handleAppForeground.bind(this);
    this.getEntries = this.getEntries.bind(this);
    this.state = {
      timer: '00:00:00',
      startTime: null,
      endTime: null,
      isRunning: false,
      currentAppState: AppState.currentState,
      backgroundTime: ''
    }
  }

  componentWillMount() {
    this.setState({
      searchValue: '',
      isRunning: false
    });
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');

    const { dispatch, user } = this.props;
    if (!_.isUndefined(user.asyncKey) && user.asyncKey !== null) {
      dispatch(listEntries(user.asyncKey, startDate, endDate));
    } else {
      AsyncStorage.getItem('apikey').then((key) => {
        if (key) {
          this.props.dispatch(setApiKey(key));
          dispatch(listEntries(key, startDate, endDate));
        }
      }).done();
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState === 'inactive' || currentAppState === 'background') {
      this.handleAppBackground();
    } else if (currentAppState === 'active') {
      this.handleAppForeground();
    }
    this.setState({ currentAppState, });
  }

  handleAppBackground() {
    if (this.state.isRunning) {
      this.setState({
        backgroundTime: new Date(),
      });
    }
  }

  handleAppForeground() {
    if (this.state.isRunning && this.state.backgroundTime !== '') {
      const { backgroundTime } = this.state;
      let timeDiff = new Date() - backgroundTime;
      let formattedTimeDiff = moment.utc(timeDiff).format("HH:mm:ss");
      let timeDiffArray = formattedTimeDiff.split(':');
      let timeArray = this.state.timer.split(':');

      let hours = (parseInt(timeArray[0]) + parseInt(timeDiffArray[0]))*60*60;
      let minutes = (parseInt(timeArray[1]) + parseInt(timeDiffArray[1]))*60;
      let seconds = (parseInt(timeArray[2]) + parseInt(timeDiffArray[2]));

      let totalTime = moment.utc((hours + minutes + seconds)*1000).format('HH:mm:ss');

      this.setState({
        timer: totalTime,
        backgroundTime: ''
      });
    }
  }

  handleStart() {
    this.setState({
      startTime: !this.state.startTime ? new Date() : this.state.startTime,
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
    const {timer} = this.state;
    let timeArray = timer.split(':');
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timeArray.length === 3) {
      hours = parseInt(timeArray[0])*60*60;
      minutes = parseInt(timeArray[1])*60;
      seconds = parseInt(timeArray[2]);

      let totalSeconds = (hours + minutes + seconds);

      let newTotal = (totalSeconds+1)*1000

      let newTime = moment.utc(newTotal).format("HH:mm:ss");

      let newTimeArray = newTime.split(':');
      hours = parseInt(newTimeArray[0]);
      minutes = parseInt(newTimeArray[1]);
      seconds = parseInt(newTimeArray[2]);
    }

    this.setState({
      timer: `${normalizeTime(hours)}:${normalizeTime(minutes)}:${normalizeTime(seconds)}`,
      hours: hours,
      minutes: minutes,
      seconds: seconds
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
    let timeArray = text.split(':');
    let valid = true;
    timeArray.forEach(function(value, i) {
      if (value.length !== 2) {
        valid = false;
      }
    })
    if (timeArray.length === 3 && valid ) {
      let hours = parseInt(timeArray[0])*60*60;
      let minutes = parseInt(timeArray[1])*60;
      let seconds = parseInt(timeArray[2]);

      let totalSeconds = (hours + minutes + seconds);

      let newTotal = (totalSeconds)*1000

      text = moment.utc(newTotal).format("HH:mm:ss");

      this.setState({
        timer: text,
        hours: parseInt(timeArray[0]),
        minutes: parseInt(timeArray[1])
      })
    } else {
      this.setState({
        timer: text
      })
    }
  }

  handleBoardSelectClick() {
    this.props.router.toBoards();
  }

  handleCardSelectClick() {
    const { selectedBoard } = this.props.boards;
    if (!_.isUndefined(selectedBoard.public)) {
      this.props.router.toCards();
    } else {
      Alert.alert(
        'Warning',
        'You must first select a board.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  }

  handleDeleteEntry(entryApiKey) {
    const { dispatch, user } = this.props;
    dispatch(deleteEntry(user.asyncKey, entryApiKey));
  }

  getEntries() {
    let totalHours = 0;
    let totalMinutes = 0;
    let filteredEntries = getDayEntries(this.props.entries.results, moment());
    let entriesList = filteredEntries.map((ent, index) => {
      var swipeoutBtns = [
        {
          text: 'DELETE',
          backgroundColor: '#EB4E35',
          color: colors.WHITE,
          onPress: this.handleDeleteEntry.bind(this, ent.entry.apikey),
        }
      ]
      totalHours = totalHours + parseInt(ent.entry.hours, 10)
      totalMinutes = totalMinutes + parseInt(ent.entry.minutes, 10)
      return (
        <Swipeout key={index} rowID={index} autoClose={true} style={styles.entriesWrap} right={swipeoutBtns}>
          <View style={styles.entriesWrap}>
            <View style={styles.entries}>
              <View style={styles.iconWrap}>
                <Image style={styles.icon} resizeMode="contain" source={require("./images/timeIconLight.png")}/>
              </View>
              <View style={styles.leftInfoWrap}>
                <Text style={styles.entriesText}>{ent.client.public.name}</Text>
                <Text style={styles.entriesText}>{ent.board.public.name}</Text>
              </View>
              <View style={styles.rightInfoWrap}>
                <Text style={styles.entriesText}>{ent.entry.hours} hrs</Text>
                <Text style={styles.entriesText}>{ent.entry.minutes} mins</Text>
              </View>
            </View>
          </View>
        </Swipeout>
      )
    });
    if (filteredEntries.length > 0) {
      return entriesList;
    } else {
      return (
        <View style={styles.noEntriesWrap}>
          <Text style={styles.entriesText}>No entries found.</Text>
        </View>
      )
    }
  }

  render() {
    return (
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View style={styles.timerInputWrap}>
              <TextInput
                ref="Timer"
                style={styles.timerInput}
                value={this.state.timer}
                keyboardType="numbers-and-punctuation"
                underlineColorAndroid="transparent"
                onChangeText={this.handleTimeTextChange}/>
            </View>
            <View style={styles.timerActionsWrapper}>
              <View style={styles.timerActionsSection}>
                {
                  !this.state.isRunning &&
                  <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleStart}>
                    <Text style={styles.timerActionText}>START</Text>
                  </TouchableOpacity>
                }
                {
                  this.state.isRunning &&
                  <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleStop}>
                    <Text style={styles.timerActionText}>STOP</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.timerActionsSection}>
                <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleSubmit}>
                  <Text style={styles.timerActionText}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.resetButtonWrapper}>
            {
              (this.state.timer !== "00:00:00" && this.state.isRunning === false) &&
              <TouchableOpacity style={styles.resetButton} onPress={this.handleClearTime}>
                <Text style={styles.resetButtonText}>RESET</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.buttonClear} onPress={this.handleBoardSelectClick}>
              {
                (Object.keys(this.props.boards.selectedBoard).length > 0) &&
                <Text style={styles.buttonText}>{this.props.boards.selectedBoard.public.name}</Text>
              }
              {
                (Object.keys(this.props.boards.selectedBoard).length === 0) &&
                <Text style={styles.buttonText}>Choose a Board</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClear} onPress={this.handleCardSelectClick}>
              {
                (!_.isUndefined(this.props.cards.selectedCard.public)) &&
                <Text style={styles.buttonText}>{this.props.cards.selectedCard.public.name}</Text>
              }
              {
                (_.isUndefined(this.props.cards.selectedCard.public)) &&
                <Text style={styles.buttonText}>Choose a Card</Text>
              }
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.dayBar}>
              <Text style={styles.dayBarText}>TODAY</Text>
            </View>
            <ScrollView>
              <View>
                { this.getEntries() }
              </View>
            </ScrollView>
          </View>
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
    const { selectedCard } = this.props.cards;
    const { dispatch, user } = this.props;
    if (!_.isEmpty(selectedCard) && !_.isUndefined(this.state.timer !== '00:00:00')) {
      let body = {
        hours: this.state.hours,
        minutes: this.state.minutes,
        client_apikey: selectedCard.client.public.apikey,
        board_apikey: selectedCard.board.public.apikey,
        card_apikey: selectedCard.public.apikey
      }
      dispatch(createEntry(user.asyncKey, body));
      this.handleClearTime();
      this.refs.Timer.blur();
    } else {
      Alert.alert(
        'Warning',
        'You must first track time, select a board and a card before submitting time.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  }
}

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.DARKER_GREY,
    width: width,
    height: height
  },
  topContainer: {
    width: width,
    height: height/3,
  },
  timerInputWrap: {
    width: width,
    height: height/4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.PXP_GREY,
    borderBottomWidth: .5
  },
  timerInput: {
    fontSize: 45,
    color: colors.PXP_ORANGE,
    width: width/1.5,
    textAlign: 'center'
  },
  timerActionsWrapper: {
    flexDirection: 'row',
    width: width,
    height: height/9
  },
  timerActionsSection: {
    width: width/2,
    height: height/9,
    borderColor: colors.PXP_GREY,
    borderRightWidth: .5,
    borderBottomWidth: .5,
    marginLeft: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerActionText: {
    color: colors.PXP_ORANGE,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  resetButtonWrapper: {
    width: width
  },
  resetButton: {
    width: width,
    height: 50,
    backgroundColor: '#EB4E35',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetButtonText: {
    color: colors.WHITE,
    fontSize: 16
  },
  bottomContent: {
    width: width,
    height: (height - ((height/3) + 40) - 50)
  },
  buttonWrap: {
    width: width,
    alignItems: 'center',
    marginTop: 15
  },
  buttonClear: {
    height: 46,
    width: width-50,
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderColor: colors.WHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16
  },
  dayBar: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.PXP_GREY
  },
  dayBarText: {
    fontSize: 16,
    color: colors.WHITE
  },
  noEntriesWrap: {
    width: width-40,
    height: 20,
    margin: 20
  },
  entriesWrap: {
    width: width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: .5,
    alignItems: 'center',
    borderColor: colors.PXP_GREY,
    backgroundColor: colors.DARKER_GREY
  },
  entries: {
    width: width,
    height: 40,
    flexDirection: 'row',
    paddingRight: 10
  },
  iconWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  leftInfoWrap: {
    width: width - 50 - 100,
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  rightInfoWrap: {
    width: 80,
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  entriesText: {
    fontSize: 12,
    color: colors.WHITE
  }
});

export default connect(state => ({
    boards: state.boards,
    cards: state.cards,
    entries: state.entries,
    message: state.message,
    user: state.user
  })
)(DashboardContainer);
