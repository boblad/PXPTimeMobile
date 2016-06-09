import { BLUE, MAIN, GREEN, RED, T_GREY } from '../constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN
  },
  text: {
    fontSize: 20
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3a945b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonTextNew: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  boardButton: {
    width: 250,
    height: 60,
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  boardTitle: {
    width: 375,
    height: 50,
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardButton: {
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BLUE,
    borderWidth: .5
  },
  cardWrap: {
    width: 375,
    height: 50
  },
  row: {
    width: 375,
    height: 50,
    flexDirection: 'row'
  },
  navBar: {
    width: 375,
    height: 50,
    borderWidth: 1,
    borderColor: BLUE,
    flexDirection: 'row'
  },
  stopButton: {
    width: 190,
    height: 60,
    backgroundColor: '#cf2a0e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerWrap: {
    width: 400,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row'
  },
  startButton: {
    width: 190,
    height: 60,
    backgroundColor: '#368A55',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: MAIN
  },
  cardText: {
    fontSize: 14,
    color: BLUE
  },
  scrollView: {
    backgroundColor: BLUE,
    height: 470,
    paddingTop: 20,
    paddingBottom: 20
  },
  inputWrap: {
    justifyContent: 'center',
    padding: 10
  },
  inputLabel: {
    justifyContent: 'center',
    fontSize: 16
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLUE,
    margin: 10,
    padding: 10
  },
  pageWrap: {
    paddingTop: 20
  },
  menuItem: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: 375,
    height: 40,
    backgroundColor: BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    flexDirection: 'row',
    textAlign: 'center'
  },
  basicScroll: {
    width: 375,
    height: 500
  },
  invoiceScroll: {
    width: 375,
    height: 500
  },
  invoiceWrap: {
    width: 375,
    height: 100,
    backgroundColor: MAIN,
    padding: 10,
    borderColor: BLUE,
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    borderWidth: 1
  },
  invoiceText: {
    fontSize: 12
  },
  invoiceLabel: {
    color: MAIN,
    fontSize: 20,
    justifyContent: 'space-between'
  },
  cardsScrollView: {
    height: 480,
    width: 375
  },
  cardView: {
    height: 510,
    width: 375
  },
  totalWrap: {
    width: 375,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE
  },
  totalText: {
    color: MAIN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fitContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 375,
    height: 557
  },
  todayInputWrap: {
    width: 350,
    height: 60,
    backgroundColor: MAIN,
    borderRadius: 10,
    padding: 5,
    marginTop: 20
  },
  todayLeftSide: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  todayRightSide: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  todayInput: {
    fontSize: 10
  },
  headerCell: {
    flex: 3,
    width: 100,
    height: 20,
    justifyContent: 'center'
  }
});
