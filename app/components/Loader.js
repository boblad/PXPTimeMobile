import React, { Component, Modal, ActivityIndicatorIOS, View } from 'react-native';
import { activityStyles } from '../assets/ActivityStyle';
import { BLUE } from '../constants/colors';

class Loader extends Component {

  render() {
    return (
      <Modal
        animated={false}
        transparent={true}
        visible={true}>
        <View style={activityStyles.center}>
          <ActivityIndicatorIOS
            animating={true}
            color={BLUE}
            size="large"/>
        </View>
      </Modal>
    );
  }
}

export default Loader;
