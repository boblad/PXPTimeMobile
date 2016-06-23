'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listInvoices } from '../actions/InvoiceActions';
import moment from 'moment';
import React, {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


class InvoicesContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    let startDate = moment().subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
    let endDate = moment().endOf('month').format('YYYY-MM-DD');

    dispatch(listInvoices(user.asyncKey, startDate, endDate));
  }

  formatCurrency(num) {
    let x = 3;
    let n = 0;
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return num.toFixed(n).replace(new RegExp(re, 'g'), '$&,');
  }

  render() {
    let total = 0;
    let open = 0;
    let billed = 0;
    let paid = 0;
    let html = this.props.invoices.results.map((invoice, index) => {
      if (invoice.public.status === 'open') {
        open = open + parseInt(invoice.public.amount, 10);
      }
      if (invoice.public.status === 'billed') {
        billed = billed + parseInt(invoice.public.amount, 10);
      }
      if (invoice.public.status === 'paid') {
        paid = paid + parseInt(invoice.public.amount, 10);
      }
      total = total + parseInt(invoice.public.amount, 10);
    });
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navWrapper}>
          <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>Reports</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.sectionOpen}>
            <Text style={styles.reportLabel}>Open</Text>
            <Text style={styles.reportAmount}>${this.formatCurrency(open)}</Text>
          </View>
          <View style={styles.sectionBilled}>
              <Text style={styles.reportLabel}>Billed</Text>
              <Text style={styles.reportAmount}>${this.formatCurrency(billed)}</Text>
          </View>
          <View style={styles.sectionPaid}>
            <Text style={styles.reportLabel}>Paid</Text>
            <Text style={styles.reportAmount}>${this.formatCurrency(paid)}</Text>
          </View>
          <View style={styles.sectionTotal}>
            <Text style={styles.reportLabel}>Total</Text>
            <Text style={styles.reportAmount}>${this.formatCurrency(total)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  contentContainer: {
    height: height-60-49,
    width: width,
    marginTop: 60,
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.DARKER_GREY
  },
  sectionTotal: {
    width: width-40,
    height: (height-60-49-40)/4,
    backgroundColor: '#AAAAAA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionOpen: {
    width: width-40,
    height: (height-60-49-40)/4,
    backgroundColor: colors.PXP_ORANGE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionBilled: {
    width: width-40,
    height: (height-60-49-40)/4,
    backgroundColor: '#008DE7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionPaid: {
    width: width-40,
    height: (height-60-49-40)/4,
    backgroundColor: '#00B871',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportLabel: {
    fontSize: 34,
    color: '#FFFFFF'
  },
  reportAmount: {
    fontSize: 26,
    color: '#FFFFFF'
  }
});

export default connect(state => ({
    message: state.message,
    invoices: state.invoices,
    user: state.user
  })
)(InvoicesContainer);
