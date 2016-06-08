import { BLUE, MAIN, GREEN, RED, T_GREY, T_DARK_GREY } from '../constants/colors';
import { StyleSheet } from 'react-native';

export const activityStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: T_GREY
  },
  messageWrap: {
    flex: 1,
    backgroundColor: T_DARK_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  success: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  failure: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
