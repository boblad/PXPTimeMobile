import React, { Component, PropTypes, View,
  Text, TouchableOpacity, TouchableHighlight,
  Image } from 'react-native';
import { styles } from '../assets/StyleSheet';
import { buttonStyles } from '../assets/ButtonsStyleSheet';
import Reporting from '../assets/images/Reporting.png';
import Hourglass from '../assets/images/Hourglass.png';
import Invoice from '../assets/images/Invoice.png';
import Statistics from '../assets/images/Statistics.png';
import Settings from '../assets/images/Settings.png';

const propTypes = {

};

class Menu extends Component {
  constructor() {
    super();
  }

  render() {
    const { card } = this.props;
    return (
      <View style={styles.navBar}>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => { this.props.router.toDashboard(this.state) }}>
          <Image style={buttonStyles.menuIcon} source={Reporting} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => { this.props.router.toWeek(this.state) }}>
          <Image style={buttonStyles.menuIcon} source={Hourglass} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => { this.props.router.toInvoices(this.state) }}>
          <Image style={buttonStyles.menuIcon} source={Invoice} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => { this.props.router.toReports(this.state) }}>
          <Image style={buttonStyles.menuIcon} source={Statistics} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => { this.props.router.toSettings(this.state) }}>
          <Image style={buttonStyles.menuIcon} source={Settings} />
        </TouchableHighlight>
      </View>
    );
  }
}

Menu.propTypes = propTypes;

export default Menu;
