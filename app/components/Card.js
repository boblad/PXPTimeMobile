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

const propTypes = {
  card: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

class Card extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { card, selected } = this.props;
    return (
      <TouchableOpacity style={styles.selectListItem} onPress={this.handleClick}>
        { selected &&
          <Image style={styles.selectedIcon} resizeMode="contain" source={require('./images/selectedIcon.png')} />
        }
        { !selected &&
          <View style={styles.selectedIcon}></View>
        }
        <View style={styles.selectListItemTextWrap} onPress={this.handleClick}>
          <Text style={styles.selectListItemText}>{card.public.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleClick() {
    this.props.onCardClick(this.props.card)
  }
}

const { width, height } = Dimensions.get('window');
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  selectListItem: {
    width: width,
    height: 50,
    backgroundColor: colors.DARKER_GREY,
    borderColor: colors.PXP_GREY,
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  selectedIcon: {
    width: width/16,
    height: 25,
    marginRight: 15,
    marginLeft: 15
  },
  selectListItemTextWrap: {
    height: 50,
    width: width-60-(width/16),
    justifyContent: 'center'
  },
  selectListItemText: {
    color: colors.PXP_GREY
  }
});

Card.propTypes = propTypes;

export default Card;
