import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import { listEntries, clearEntries } from '../actions/EntryActions';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import Loader from '../components/Loader';
import timeIcon from './images/timeIconLight.png';
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
          <View style={styles.navWrapper}>
            <View style={styles.navTitle}>
              <Text style={styles.navTitleText}>Settings</Text>
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
                      <Text style={styles.dayBarText}>{day.longDayString.toUpperCase()}</Text>
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
                                <Text style={styles.purchaseText}>
                                  {ent.entry.hours} hrs
                                </Text>
                                <Text style={styles.purchaseText}>
                                  {ent.entry.minutes} mins
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

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    width: width,
    height: height,
    backgroundColor: colors.DARKER_GREY
  },
  navWrapper: {
    width: width,
    height: 60,
    top: 0,
    paddingTop: 29,
    position: 'absolute',
    backgroundColor: colors.DARKER_GREY,
    borderBottomWidth: .5,
    borderBottomColor: colors.PXP_GREY
  },
  navTitle: {
    width: width/2,
    position: 'absolute',
    left: (width/2)-(width/4),
    top: 29,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitleText: {
    color: colors.PXP_ORANGE,
    fontSize: 18
  },
  navBarWrap: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: .5,
    borderBottomColor: colors.PXP_GREY
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
  navTitleText: {
    fontSize: 18,
    color: colors.PXP_ORANGE
  },
  statsWrap: {
    width: width,
    height: (height/3) + 40,
    backgroundColor: colors.DARKER_GREY
  },
  barChartWrap: {
    width: width,
    height: (height/3) + 40,
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
    color: colors.PXP_GREY
  },
  bar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: colors.PXP_GREY,
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.PXP_GREY
  },
  dayBarText: {
    color: colors.WHITE,
    fontSize: 16
  },
  purchaseWrap: {
    width: width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: .5,
    alignItems: 'center',
    borderColor: colors.PXP_GREY,
    backgroundColor: colors.DARKER_GREY
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
    color: colors.WHITE
  },
  selectedBar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    marginBottom: 5,
    marginTop: 5
  },
  selectedText: {
    fontSize: 10,
    color: colors.WHITE
  },
  futureBar: {
    width: 14,
    height: 1,
    borderRadius: 8,
    backgroundColor: colors.PXP_GREY,
    marginBottom: 5,
    marginTop: 5
  },
  futureText: {
    fontSize: 10,
    color: colors.PXP_GREY
  },
  backIcon: {
    width: 25,
    height: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10
  },
  priceText: {
    fontSize: 14,
    color: colors.WHITE
  }
});
