import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import { listEntries, clearEntries } from '../actions/EntryActions';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import Loader from '../components/Loader';
import timeIcon from './images/timeIcon.png';
import { getDayEntries, toTimeString } from '../helpers/TimeHelpers';
import React, {
  View, Text, StyleSheet, ScrollView,
  TouchableHighlight, Image, Dimensions,
  Component, StatusBar, Animated, LayoutAnimation,
  TouchableOpacity, TextInput,
  UIManager
} from 'react-native';


const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

const baseEntry = {
  entry: {
    minutes: 0,
    hours: 0
  },
  dayString: "..."
};

class WeekContainer extends Component {
  constructor() {
    super();
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch(clearEntries());
    let startDate = moment().day('Monday').hours(0).minutes(0).seconds(0).format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    let weeklyEntries = [];
    for (let i = 0; i < 7; i++) {
      weeklyEntries[i] = baseEntry;
      weeklyEntries[i].dayString = moment().weekday(i).format('ddd');
    }
    this.setState({
      startDate: startDate,
      endDate: endDate,
      weeklyEntries: weeklyEntries
    })
    dispatch(listEntries(user.asyncKey, startDate, endDate));
  }

  render() {
    const { results } = this.props.entries;
    let weeklyEntries = [];
    for (let i = 0; i < 7; i++) {
      weeklyEntries[i] = getDayEntries(results, moment(this.state.startDate).add(i, 'd'))
    }
    LayoutAnimation.spring();
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.statsWrap}>
          <View style={styles.navBarWrap}>
            <View style={styles.navBar}>
              <View style={styles.navBarTitle}>
                <Text style={styles.currentBalenceText}>Weekly</Text>
              </View>
            </View>
          </View>
          <View style={styles.barChartWrap}>
            {
              weeklyEntries.map((weekDay, index) => {
                let graphStyle = {};
                let barText = {}
                if (index < moment().day() - 1) {
                  graphStyle = styles.bar;
                  barText = styles.barText;
                } else if (index === moment().day() - 1) {
                  graphStyle = styles.selectedBar;
                  barText = styles.selectedText;
                } else {
                  graphStyle = styles.futureBar;
                  barText = styles.futureText;
                }
                let minutes = 0;
                let hours = 0;
                _.forEach(weekDay, function(value) {
                  minutes = minutes + value.entry.minutes;
                  hours = hours + value.entry.hours;
                })
                let timeHeight = ((60 * hours) + minutes) / 5;
                if (timeHeight === 0) timeHeight = 15;
                return (
                  <View key={index} style={styles.barItemWrap}>
                    <Text style={barText}>
                      {toTimeString(hours, minutes)}
                    </Text>
                    <View style={[graphStyle, {height:  timeHeight}]}/>
                    <Text style={barText}>
                      {weekDay.dayString}
                    </Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View style={styles.bottomContent}>
          <ScrollView>
            {
              weeklyEntries.map((day, index) => {
                return (
                  <View key={index}>
                    <View style={styles.dayBar}>
                      <Text style={styles.dayBarText}>{day.longDayString}</Text>
                    </View>
                    {
                      day.map((ent, i) => {
                        return (
                          <View key={`bar-${i}`} style={styles.purchaseWrap}>
                            <View style={styles.purchase}>
                              <View style={styles.iconWrap}>
                                <Image
                                  style={styles.icon}
                                  resizeMode="contain"
                                  source={timeIcon}/>
                              </View>
                              <View style={styles.leftInfoWrap}>
                                <Text style={styles.purchaseText}>
                                  {ent.board.public.name}
                                </Text>
                                <Text style={styles.purchaseText}>
                                  {ent.card.public.name}
                                </Text>
                              </View>
                              <View style={styles.rightInfoWrap}>
                                <Text style={styles.priceText}>
                                  {toTimeString(ent.entry.hours, ent.entry.minutes)}
                                </Text>
                                <Text style={styles.purchaseText}>
                                  {ent.entry.status} >
                                </Text>
                              </View>
                            </View>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
};

export default connect(state => ({
    loading: state.loading,
    message: state.message,
    entries: state.entries,
    user: state.user
  })
)(WeekContainer);

const GREY = 'rgb(240, 240, 240)';
const LIGHT_GREY = 'rgb(238, 238, 238)';
const TEXT_GREY = 'rgb(186, 186, 186)';
const BLUE = 'rgb(23, 108, 230)';
const LIGHT_BLUE = 'rgb(118, 155, 239)';
const TEAL_BLUE = 'rgb(75, 145, 230)';
const WHITE = '#FFFFFF';
const { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: width,
    height: height
  },
  navBarWrap: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  navBar: {
    width: width,
    height: 30,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarBack: {
    width: width/3,
    height: 30,
    justifyContent: 'flex-start'
  },
  navBarTitle: {
    width: width/3,
    height: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarSpacer: {
    width: width,
    height: 30
  },
  navBarText: {
    fontSize: 12,
    color: WHITE
  },
  currentBalenceText: {
    color: WHITE,
    fontSize: 20
  },
  statsWrap: {
    width: width,
    height: (height/3) + 40,
    backgroundColor: BLUE
  },
  barChartWrap: {
    width: width,
    height: (height/3) - 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'flex-end'
  },
  barItemWrap: {
    width: 30,
    height: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  barText: {
    fontSize: 10,
    color: LIGHT_BLUE
  },
  bar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: LIGHT_BLUE,
    marginBottom: 10,
    marginTop: 10
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
  purchaseWrap: {
    width: width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: .5,
    alignItems: 'center',
    borderColor: GREY
  },
  purchase: {
    width: width,
    height: 40,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  iconWrap: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
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
  purchaseText: {
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
  bottomBarWrap: {
    width: width,
    height: 50,
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuImage: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuText: {
    marginTop: 5,
    fontSize: 10
  },
  selectedBar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: WHITE,
    marginBottom: 5,
    marginTop: 5
  },
  selectedText: {
    fontSize: 10,
    color: WHITE
  },
  futureBar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: TEAL_BLUE,
    marginBottom: 5,
    marginTop: 5
  },
  futureText: {
    fontSize: 10,
    color: TEAL_BLUE
  },
  backIcon: {
    width: 25,
    height: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10
  },
  priceText: {
    fontSize: 14
  }
});
