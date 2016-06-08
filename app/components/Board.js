import React, { Component, PropTypes, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/StyleSheet';

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
    const { board } = this.props;
    return (
      <View style={styles.inputWrap}>
        <TouchableOpacity style={styles.boardButton} onPress={this.handleClick}>
          <Text style={styles.buttonText}>{board.public.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleClick() {
    this.props.onBoardClick(this.props.board)
  }
}

Card.propTypes = propTypes;

export default Card;
