import React, { Component, PropTypes, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/StyleSheet';

const propTypes = {
  card: PropTypes.object.isRequired,

};

class Card extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { card } = this.props;
    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity style={styles.cardButton} onPress={this.handleClick}>
          <Text style={styles.cardText}>{card.public.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleClick() {
    this.props.onCardClick(this.props.card)
  }
}

Card.propTypes = propTypes;

export default Card;
