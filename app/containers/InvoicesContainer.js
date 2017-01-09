import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listInvoices } from '../actions/InvoiceActions';
import { helperStyles } from '../assets/HelperStyles';
import moment from 'moment';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import InvoiceCard from '../components/InvoiceCard';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');


class InvoicesContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    let startDate = moment().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().endOf('month').format('YYYY-MM-DD');

    dispatch(listInvoices(user.asyncKey, startDate, endDate));
  }

  render() {
    let total = 0;
    let pending = 0;
    let received = 0;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.invoiceScroll}>
          <View style={styles.mainContainer}>
            {
              this.props.invoices.results.map((invoice, index) => {
                return ( <InvoiceCard key={index} invoice={invoice} /> )
              })
            }
          </View>
        </ScrollView>
        <View style={styles.navWrapper}>
          <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>Invoices</Text>
          </View>
        </View>
      </View>
    );
  }
}

import { colors } from '../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARKER_GREY
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARKER_GREY,
    paddingTop: 60
  },
  invoiceScroll: {
    width: width,
    height: height
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
  }
});

export default connect(state => ({
    message: state.message,
    invoices: state.invoices,
    user: state.user
  })
)(InvoicesContainer);
