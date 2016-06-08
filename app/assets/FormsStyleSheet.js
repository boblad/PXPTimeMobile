import { BLUE, MAIN } from '../constants/colors';
import { StyleSheet } from 'react-native';

export const forms = StyleSheet.create({
  timerInputWrap: {
    backgroundColor: MAIN,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: BLUE,
    height: 120
  },
  timerInput: {
    width: 300,
    height: 50,
    width: 300,
    fontSize: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    color: BLUE,
    textAlign: 'center'
  },
  searchInputWrap: {
    backgroundColor: BLUE,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  searchInput: {
    width: 300,
    height: 50,
    backgroundColor: MAIN,
    borderRadius: 5,
    borderColor: BLUE,
    borderWidth: 1
  }
})
