'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { connect } from 'react-redux';
import { listInvoices, listReactBoard } from '../actions/InvoiceActions';
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
    dispatch(listReactBoard(user.asyncKey));
  }

  render() {
    let total = 0;
    let pending = 0;
    let received = 0;
    let html = this.props.invoices.results.map((invoice, index) => {
      if (invoice.public.status === 'open' || invoice.public.status === 'billed') {
        pending = pending + parseInt(invoice.public.amount, 10);
      }
      if (invoice.public.status === 'paid') {
        received = received + parseInt(invoice.public.amount, 10);
      }
      total = total + parseInt(invoice.public.amount, 10);
    });
    return (
      <View style={styles.container}>
        <TopBar title="Reports"/>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <View style={styles.fitContent}>
          <View style={styles.inputWrap}>
            <Text sytle={styles.inputLabel}>Pending: ${pending}</Text>
            <Text sytle={styles.inputLabel}>Recieved: ${received}</Text>
            <Text sytle={styles.inputLabel}>Total: ${total}</Text>
            <Text sytle={styles.inputLabel}>Save for taxes (%30): ${Math.floor(total * .3)}</Text>
          </View>
        </View>
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
