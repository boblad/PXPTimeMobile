import React, { Component, PropTypes } from 'react';
import {
  Image,
  View
} from 'react-native';

import DashboardContainer from './DashboardContainer';
import InvoicesContainer from './InvoicesContainer';
import ReportsContainer from './ReportsContainer';
import SettingsContainer from './SettingsContainer';
import WeekContainer from './WeekContainer';
import { listAllEntries } from '../actions/EntryActions';
import { listAllInvoices } from '../actions/InvoiceActions';

import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';
import moment from 'moment';

import { colors } from '../constants/colors';


class RootTabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTabBar: false,
      selectedTab: 'timer'
    };
  }

  render() {
    return (
      <TabNavigator tabBarStyle={{ backgroundColor: colors.PXP_GREY }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'timer'}
          selectedTitleStyle={{ color: colors.WHITE }}
          title="Timer"
          titleStyle={{ color: colors.BLACK }}
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/timeIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/timeIconLight.png')} />}
          onPress={() => this.setState({ selectedTab: 'timer' })}>
          <DashboardContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'weekly'}
          selectedTitleStyle={{ color: colors.WHITE }}
          title="Weekly"
          titleStyle={{ color: colors.BLACK }}
          renderIcon={() => <Image resizeMode="contain" style={{height: 23}} source={require('./images/weeklyIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 23}} source={require('./images/weeklyIconLight.png')} />}
          onPress={() => {
              const { dispatch, user } = this.props;
              let startDate = moment().day('Monday').hours(0).minutes(0).seconds(0).format('YYYY-MM-DD');
              let endDate = moment().add(2, 'days').format('YYYY-MM-DD');

              dispatch(listAllEntries(user.asyncKey, startDate, endDate));
              this.setState({ selectedTab: 'weekly' })
            }
          }>
          <WeekContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'invoices'}
          selectedTitleStyle={{ color: colors.WHITE }}
          title="Invoices"
          titleStyle={{ color: colors.BLACK }}
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/invoicesIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/invoicesIconLight.png')} />}
          onPress={() => this.setState({ selectedTab: 'invoices' })}>
          <InvoicesContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'reports'}
          selectedTitleStyle={{ color: colors.WHITE }}
          title="Reports"
          titleStyle={{ color: colors.BLACK }}
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/reportsIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/reportsIconLight.png')} />}
          onPress={() => {
              const { dispatch, user } = this.props;
              let startDate = moment().subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
              let endDate = moment().endOf('month').format('YYYY-MM-DD');

              dispatch(listAllInvoices(user.asyncKey, startDate, endDate));
              this.setState({ selectedTab: 'reports' })
            }
          }>
          <ReportsContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'settings'}
          selectedTitleStyle={{ color: colors.WHITE }}
          title="Settings"
          titleStyle={{ color: colors.BLACK }}
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/settingsIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./images/settingsIconLight.png')} />}
          onPress={() => this.setState({ selectedTab: 'settings' })}>
          <SettingsContainer {...this.props} />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

export default connect(state => ({
    boards: state.boards,
    cards: state.cards,
    entries: state.entries,
    message: state.message,
    user: state.user
  })
)(RootTabContainer);
