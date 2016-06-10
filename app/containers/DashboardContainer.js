import { bindActionCreators } from 'redux';
import { styles } from './Styles';
import { listEntries, createEntry } from '../actions/EntryActions';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import { getDayEntries } from '../helpers/TimeHelpers';
import React, {
  Component,
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';


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
    });

    const { dispatch, user } = this.props;
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    dispatch(listEntries(user.asyncKey, startDate, endDate));
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
    return entriesList;
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
                  (this.props.cards.selectedCard) &&
                  <Text style={styles.entriesText}>{this.props.cards.selectedCard.public.name}</Text>
                }
                {
                  (!this.props.cards.selectedCard) &&
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
  }
}

export default connect(state => ({
    loading: state.loading,
    boards: state.boards,
    cards: state.cards,
    entries: state.entries,
    message: state.message,
    user: state.user
  })
)(DashboardContainer);
