import React from 'react';
import {
  Component,
  Image,
  View
} from 'react-native';

import DashboardContainer from './DashboardContainer';
import InvoicesContainer from './InvoicesContainer';
import ReportsContainer from './ReportsContainer';
import SettingsContainer from './SettingsContainer';
import TodayContainer from './TodayContainer';

import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';


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
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'timer'}
          title="Timer"
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./timeIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./timeIcon.png')} />}
          onPress={() => this.setState({ selectedTab: 'timer' })}>
          <DashboardContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'weekly'}
          title="Weekly"
          renderIcon={() => <Image resizeMode="contain" style={{height: 23}} source={require('./weeklyIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 23}} source={require('./weeklyIcon.png')} />}
          onPress={() => this.setState({ selectedTab: 'weekly' })}>
          <TodayContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'invoices'}
          title="Invoices"
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./invoicesIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./invoicesIcon.png')} />}
          onPress={() => this.setState({ selectedTab: 'invoices' })}>
          <InvoicesContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'reports'}
          title="Reports"
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./reportsIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./reportsIcon.png')} />}
          onPress={() => this.setState({ selectedTab: 'reports' })}>
          <ReportsContainer {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'settings'}
          title="Settings"
          renderIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./settingsIcon.png')} />}
          renderSelectedIcon={() => <Image resizeMode="contain" style={{height: 25}} source={require('./settingsIcon.png')} />}
          onPress={() => this.setState({ selectedTab: 'settings' })}>
          <SettingsContainer {...this.props} />
        </TabNavigator.Item>
      </TabNavigator>
    )
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
)(RootTabContainer);
