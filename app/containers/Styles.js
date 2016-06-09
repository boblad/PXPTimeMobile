import { Dimensions, StyleSheet } from 'react-native';

const GREY = 'rgb(240, 240, 240)';
const LIGHT_GREY = 'rgb(238, 238, 238)';
const TEXT_GREY = 'rgb(186, 186, 186)';
const BLUE = 'rgb(23, 108, 230)';
const LIGHT_BLUE = 'rgb(118, 155, 239)';
const TEAL_BLUE = 'rgb(75, 145, 230)';
const WHITE = '#FFFFFF';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height
  },
  topContainer: {
    width: width,
    height: height/3,
  },
  timerInputWrap: {
    width: width,
    height: height/4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E4E7F0',
    borderBottomWidth: .5
  },
  timerInput: {
    fontSize: 45,
    color: WHITE,
    width: width/1.8,
    textAlign: 'center'
  },
  timerActionsWrapper: {
    flexDirection: 'row',
    width: width,
    height: height/9
  },
  timerActionsSection: {
    width: width/2,
    height: height/9,
    borderColor: '#E4E7F0',
    borderRightWidth: .5,
    marginLeft: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerActionText: {
    color: WHITE
  },
  resetButtonWrapper: {
    width: width
  },
  resetButton: {
    width: width,
    height: 50,
    backgroundColor: '#EB4E35',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetButtonText: {
    color: WHITE
  },
  empty: {

  },
  bottomContent: {
    width: width,
    height: (height - ((height/3) + 40) - 50)
  },
  dayBar: {
    width: width,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: GREY,
    borderBottomWidth: .5,
    borderColor: GREY
  },
  dayBarText: {
    marginLeft: 20,
    fontSize: 12
  },
  entriesWrap: {
    width: width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: .5,
    alignItems: 'center',
    borderColor: GREY
  },
  entries: {
    width: width,
    height: 40,
    flexDirection: 'row',
    paddingRight: 10
  },
  iconWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  leftInfoWrap: {
    width: width - 50 - 100,
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  rightInfoWrap: {
    width: 80,
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  entriesText: {
    fontSize: 12,
    color: TEXT_GREY
  },
  bottomBar: {
    width: width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: LIGHT_GREY
  },
  hoursText: {
    fontSize: 14
  }
});
