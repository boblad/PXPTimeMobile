import React, { Component, PropTypes, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/StyleSheet';

const propTypes = {
  board: PropTypes.object.isRequired
};

class CardTitle extends Component {
  constructor() {
    super();
  }

  render() {
    const { board } = this.props;
    return (
      <View style={styles.boardTitle}>
          <Text style={styles.buttonText}>{board.public.name}</Text>
      </View>
    );
  }
}

CardTitle.propTypes = propTypes;

export default CardTitle;
