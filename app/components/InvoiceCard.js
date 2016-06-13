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

const GREY = 'rgb(240, 240, 240)';
const LIGHT_GREY = 'rgb(238, 238, 238)';
const TEXT_GREY = 'rgb(186, 186, 186)';
const BLUE = 'rgb(23, 108, 230)';
const LIGHT_BLUE = 'rgb(118, 155, 239)';
const TEAL_BLUE = 'rgb(75, 145, 230)';
const WHITE = '#FFFFFF';
const GREY_TEXT = 'rgb(195, 195, 195)';

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
              <View style={styles.savingsCardRow}>
                <Text style={styles.greyCardText}>
                  {invoice.board.public.name}
                </Text>
              </View>
            </View>
            <View style={styles.savingsCardBottom}>
              <View style={styles.savingsCardRow}>
                <Image
                  style={styles.savingsCardIcon}
                  resizeMode="contain"
                  source={require('./images/infoIcon.png')} />
                <Text style={styles.cardDescriptionText}>
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

let cardLenth = ((width * 2) / 3);
let cardHeight = ((height/3) - 100);
let blueHeight = (height/3) + 40;


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
    backgroundColor: WHITE,
    borderRadius: 5
  },
  savingsCard: {
    width: cardLenth,
    height: cardHeight,
    backgroundColor: WHITE,
    borderRadius: 5,
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
    fontWeight: 'bold'
  },
  percentText: {
    color: BLUE
  },
  savingsCardMiddle: {
    height: cardHeight / 3,
    width: cardLenth,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
    savingsCardRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  greyCardText: {
    color: TEXT_GREY,
    marginLeft: 10
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
    borderColor: GREY
  },
  cardDescriptionText: {
    color: TEXT_GREY,
    marginLeft: 10,
    fontSize: 10
  }
});

export default InvoiceCard;
