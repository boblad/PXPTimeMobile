'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { connect } from 'react-redux';
import { listEntries } from '../actions/EntryActions';
import { helperStyles } from '../assets/HelperStyles';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import moment from 'moment';
import Loader from '../components/Loader';
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const normalizeTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

class TodayContainer extends Component {

  componentWillMount() {
    const { dispatch, user } = this.props;
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    dispatch(listEntries(user.asyncKey, startDate, endDate));
  }

  render() {
    let totalHours = 0;
    let totalMinutes = 0;
    let html = this.props.entries.results.map((ent, index) => {
      totalHours = totalHours + parseInt(ent.entry.hours, 10)
      totalMinutes = totalMinutes + parseInt(ent.entry.minutes, 10)
        return (
          <View key={index} style={styles.todayInputWrap}>
            <Text style={styles.todayInput}>
              {moment(ent.entry.created_at).format('MMMM Do YYYY')}
            </Text>
            <Text style={styles.todayInput}>{ent.client.public.name}</Text>
            <Text style={styles.todayInput}>{ent.board.public.name}</Text>
            <Text style={styles.todayInput}>{ent.card.public.name}</Text>
            <Text style={styles.todayInput}>{ent.entry.hours}:{ent.entry.minutes}</Text>
            <Text style={styles.todayInput}>{ent.entry.status}</Text>
          </View>
        )
      });
      let extraHours = Math.floor(totalMinutes/60);
      totalHours = totalHours + extraHours;
      totalMinutes = totalMinutes % 60;
      totalHours = normalizeTime(totalHours);
      totalMinutes = normalizeTime(totalMinutes);
    return (
      <View style={styles.container}>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <TopBar
          title="Today"
          onBackClick={() => this.props.router.toDashboard(this.state)} />
        <ScrollView style={styles.basicScroll}>
          { html }
        </ScrollView>
        {
          html &&
          <View style={styles.totalWrap}>
            <Text style={styles.totalText}>Total: {totalHours}:{totalMinutes}</Text>
          </View>
        }
        <Menu router={this.props.router}/>
      </View>
    );
  }
}

export default connect(state => ({
    loading: state.loading,
    message: state.message,
    entries: state.entries,
    user: state.user
  })
)(TodayContainer);
