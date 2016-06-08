import React, {
  Component, PropTypes, View, Text,
  TouchableOpacity, TouchableHighlight,
  Image
} from 'react-native';
import Back from '../assets/images/Back.png';
import { styles } from '../assets/StyleSheet';
import { buttonStyles } from '../assets/ButtonsStyleSheet';

const propTypes = {
  onBackClick: PropTypes.func,
  title: PropTypes.string.isRequired
};

class TopBar extends Component {
  render() {
    const { card } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.onBackClick} style={styles.headerCell}>
        {
          this.props.onBackClick &&
          <Image style={buttonStyles.backIcon} source={Back} />
        }
        </TouchableOpacity>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        <View style={styles.headerCell} />
      </View>
    );
  }
}

TopBar.propTypes = propTypes;

export default TopBar;
