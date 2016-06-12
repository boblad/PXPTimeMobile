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
  board: PropTypes.object.isRequired,
  onBoardClick: PropTypes.func.isRequired
};

class Card extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { board, selected } = this.props;
    return (
      <TouchableOpacity style={styles.selectListItem} onPress={this.handleClick}>
        { selected &&
          <Image style={styles.selectedIcon} resizeMode="contain" source={require('./images/selectedIcon.png')} />
        }
        { !selected &&
          <View style={styles.selectedIcon}></View>
        }
        <View style={styles.selectListItemTextWrap}>
          <Text style={styles.selectListItemText}>{board.public.name.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleClick() {
    this.props.onBoardClick(this.props.board)
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  selectListItem: {
    width: width-40,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  selectedIcon: {
    width: width/16,
    height: 25,
    marginTop: 20,
    marginRight: 20
  },
  selectListItemTextWrap: {
    height: 70,
    width: width-60-(width/16),
    borderColor: '#E4E7F0',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  selectListItemText: {
    marginTop: 20,
    color: '#A1A6BB'
  }
});

Card.propTypes = propTypes;

export default Card;
