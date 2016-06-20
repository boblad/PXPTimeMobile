import moment from 'moment';
import React, {
  Component,
  Dimensions,
  Image,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

class InvoiceCard extends Component {
  render() {
    const { invoice } = this.props;
    return (
      <View style={styles.barChartWrap}>
        <View style={styles.savingsCardWrap}>
          <View style={styles.savingsCard}>
            <View style={styles.savingsCardTop}>
              <Text style={styles.boldText}>
                {`Invoice ${invoice.public.invnum}`}
              </Text>
              <Text style={styles.percentText}>
                ${invoice.public.amount}
              </Text>
            </View>
            <View style={styles.savingsCardMiddle}>
              <View style={styles.savingsCardRow}>
                <Text style={styles.greyCardText}>
                  {invoice.client.public.name}
                </Text>
              </View>
              <View>
                <Text style={styles.greyCardText}>
                  {invoice.board.public.name}
                </Text>
              </View>
            </View>
            <View style={styles.savingsCardBottom}>
              <View style={styles.savingsCardRow}>
                <Text style={styles.greyCardText}>
                  {moment(invoice.public.created_at).format('MMMM Do YYYY')}
                </Text>
              </View>
              <View>
                <Text style={styles.greyCardText}>
                  {invoice.public.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

let cardLenth = ((width - 50));
let cardHeight = ((height/3) - 100);
let blueHeight = (height/3) + 40;

import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  barChartWrap: {
    width: width,
    height: cardHeight + 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  savingsCardWrap: {
    width: cardLenth,
    height: cardHeight,
    backgroundColor: colors.PXP_GREY
  },
  savingsCard: {
    width: cardLenth,
    height: cardHeight,
    backgroundColor: colors.PXP_GREY,
    flex: 3,
    flexDirection: 'column'
  },
  savingsCardTop: {
    height: cardHeight / 3,
    width: cardLenth,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boldText: {
    color: colors.WHITE
  },
  percentText: {
    color: colors.WHITE
  },
  savingsCardMiddle: {
    height: cardHeight / 3,
    width: cardLenth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center'
  },
    savingsCardRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: width/2
  },
  greyCardText: {
    color: colors.WHITE
  },
  savingsCardIcon: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forwardIcon: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  savingsCardBottom: {
    height: cardHeight / 3,
    width: cardLenth,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.LIGHTER_GREY
  }
});

export default InvoiceCard;
