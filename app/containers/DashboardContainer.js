import { bindActionCreators } from 'redux';
import { listEntries, createEntry } from '../actions/EntryActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from '../components/Loader';
import { getDayEntries } from '../helpers/TimeHelpers';
import React, {
  Component,
  Dimensions,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const GREY = 'rgb(240, 240, 240)';
const LIGHT_GREY = 'rgb(238, 238, 238)';
const TEXT_GREY = 'rgb(186, 186, 186)';
const BLUE = 'rgb(23, 108, 230)';
const LIGHT_BLUE = 'rgb(118, 155, 239)';
const TEAL_BLUE = 'rgb(75, 145, 230)';
const WHITE = '#FFFFFF';


const { width, height } = Dimensions.get('window');

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
    this.state = {
      timer: '00:00:00',
      startTime: null,
      endTime: null,
      isRunning: false
    }
  }

  componentWillMount() {
    this.setState({
      searchValue: '',
      isRunning: false
    });

    const { dispatch, user } = this.props;
    if (!_.isUndefined(user.asyncKey) && user.asyncKey !== null) {
      let startDate = moment().format('YYYY-MM-DD');
      let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
      dispatch(listEntries(user.asyncKey, startDate, endDate));
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
      hours = parseInt(newTimeArray[0])*60*60;
      minutes = parseInt(newTimeArray[1])*60;
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
    this.props.router.toCards();
  }

  getEntries() {
    let totalHours = 0;
    let totalMinutes = 0;
    let filteredEntries = getDayEntries(this.props.entries.results, moment());
    let entriesList = filteredEntries.map((ent, index) => {
      totalHours = totalHours + parseInt(ent.entry.hours, 10)
      totalMinutes = totalMinutes + parseInt(ent.entry.minutes, 10)
      return (
        <View key={index} style={styles.entriesWrap}>
          <View style={styles.entries}>
            <View style={styles.iconWrap}>
              <Image style={styles.icon} resizeMode="contain" source={require("./images/timeIcon.png")}/>
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
          {
            this.props.loading.isLoading &&
            <Loader/>
          }
          <LinearGradient colors={['#008DE7', '#3B55E7']}>
            <View style={styles.topContainer}>
              <View style={styles.timerInputWrap}>
                <TextInput
                  style={styles.timerInput}
                  value={this.state.timer}
                  underlineColorAndroid="transparent"
                  onChangeText={this.handleTimeTextChange}/>
              </View>
              <View style={styles.timerActionsWrapper}>
                <View style={styles.timerActionsSection}>
                  {
                    !this.state.isRunning &&
                    <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleStart}>
                      <Text style={styles.timerActionText}>Start</Text>
                    </TouchableOpacity>
                  }
                  {
                    this.state.isRunning &&
                    <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleStop}>
                      <Text style={styles.timerActionText}>Stop</Text>
                    </TouchableOpacity>
                  }
                </View>
                <View style={styles.timerActionsSection}>
                  <TouchableOpacity style={styles.timerActionsSection} onPress={this.handleSubmit}>
                    <Text style={styles.timerActionText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.resetButtonWrapper}>
              {
                (this.state.timer !== "00:00:00" && this.state.isRunning === false) &&
                <TouchableOpacity style={styles.resetButton} onPress={this.handleClearTime}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              }
            </View>
          </LinearGradient>
            <TouchableOpacity style={styles.entries} onPress={this.handleBoardSelectClick}>
              <View style={styles.iconWrap}>
                <Image style={styles.icon} resizeMode="contain" source={require("./images/cardIcon.png")}/>
              </View>
              <View style={styles.leftInfoWrap}>
                {
                  (Object.keys(this.props.boards.selectedBoard).length > 0) &&
                  <Text style={styles.entriesText}>{this.props.boards.selectedBoard.public.name}</Text>
                }
                {
                  (Object.keys(this.props.boards.selectedBoard).length === 0) &&
                  <Text style={styles.entriesText}>Choose a Board</Text>
                }
              </View>
              <View style={styles.rightInfoWrap}>
                <Text style={styles.entriesText}>></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entries} onPress={this.handleCardSelectClick}>
              <View style={styles.iconWrap}>
                <Image style={styles.icon} resizeMode="contain" source={require("./images/cardIcon.png")}/>
              </View>
              <View style={styles.leftInfoWrap}>
                {
                  (!_.isUndefined(this.props.cards.selectedCard.public)) &&
                  <Text style={styles.entriesText}>{this.props.cards.selectedCard.public.name}</Text>
                }
                {
                  (_.isUndefined(this.props.cards.selectedCard.public)) &&
                  <Text style={styles.entriesText}>Choose a Card</Text>
                }
              </View>
              <View style={styles.rightInfoWrap}>
                <Text style={styles.entriesText}>></Text>
              </View>
            </TouchableOpacity>
          <View style={styles.bottomContent}>
            <View style={styles.dayBar}>
              <Text style={styles.dayBarText}>Today</Text>
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
    this.handleClearTime();
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderColor: '#E4E7F0',
    borderBottomWidth: .5
  },
  timerInput: {
    fontSize: 45,
    color: WHITE,
    width: width/1.8,
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
    borderColor: '#E4E7F0',
    borderRightWidth: .5,
    marginLeft: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerActionText: {
    color: WHITE,
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
    color: WHITE
  },
  bottomContent: {
    width: width,
    height: (height - ((height/3) + 40) - 50)
  },
  dayBar: {
    width: width,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: GREY,
    borderBottomWidth: .5,
    borderColor: GREY
  },
  dayBarText: {
    marginLeft: 20,
    fontSize: 12
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
    borderColor: GREY
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
    color: TEXT_GREY
  },
  bottomBar: {
    width: width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: LIGHT_GREY
  },
  hoursText: {
    fontSize: 14
  }
});

export default connect(state => ({
    loading: state.loading,
    boards: state.boards,
    cards: state.cards,
    entries: state.entries,
    message: state.message,
    user: state.user
  })
)(DashboardContainer);
