import { BLUE, MAIN, GREEN, RED } from '../constants/colors';
import { StyleSheet } from 'react-native';

export const alertStyles = StyleSheet.create({
  messageWrap: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  success: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREEN
  },
  error: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED
  },
  messageText: {
    color: BLUE,
    fontSize: 16
  }
})
