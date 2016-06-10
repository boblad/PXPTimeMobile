'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { connect } from 'react-redux';
import { listInvoices } from '../actions/InvoiceActions';
import { helperStyles } from '../assets/HelperStyles';
import moment from 'moment';
import Loader from '../components/Loader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import React, {
  StyleSheet,
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';


class InvoicesContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch(listInvoices(user.asyncKey));
  }

  render() {
    let total = 0;
    let pending = 0;
    let received = 0;
    let html = this.props.invoices.results.map((invoice, index) => {
      return (
        <View key={index} style={styles.todayInputWrap}>
          <Text style={styles.todayInput}>Invoice #: {invoice.public.invnum}</Text>
          <Text style={styles.todayInput}>
            {moment(invoice.public.created_at).format('MMMM Do YYYY')}
          </Text>
          <Text style={styles.todayInput}>{invoice.client.public.name}</Text>
          <Text style={styles.todayInput}>{invoice.board.public.name}</Text>
          <Text style={styles.todayInput}>${invoice.public.amount}</Text>
          <Text style={styles.todayInput}>{invoice.public.status}</Text>
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <TopBar
          title="Invoices"
          onBackClick={() => this.props.router.pop()} />
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <ScrollView style={styles.invoiceScroll}>
          <View style={styles.container}>
          { html }
          </View>
        </ScrollView>
        <Menu router={this.props.router}/>
      </View>
    );
  }
}

export default connect(state => ({
    loading: state.loading,
    message: state.message,
    invoices: state.invoices,
    user: state.user
  })
)(InvoicesContainer);
