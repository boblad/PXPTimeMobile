import { BLUE, MAIN, GREEN, RED } from '../constants/colors';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  menuIcon: {
    width: 20,
    height: 20
  },
  timerButtonWrap: {
    width: 375,
    justifyContent: 'space-around',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center'
  },
  startButton: {
    width: 115,
    backgroundColor: GREEN,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stopButton: {
    width: 115,
    backgroundColor: RED,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    width: 115,
    backgroundColor: BLUE,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: MAIN,
  },
  backIcon: {
    width: 20,
    height: 20
  }
})
