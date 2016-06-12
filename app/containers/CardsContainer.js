import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCards, selectCard } from '../actions/CardActions';
import _ from 'lodash';
import Card from '../components/Card';
import BoardTitle from '../components/BoardTitle';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import React, {
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


class CardsContainer extends Component {
  constructor() {
    super();
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    const { boards, user, dispatch } = this.props;
    dispatch(listCards(user.asyncKey, boards.selectedBoard.public.apikey));
    this.setState({
      searchValue: '',
      stopWatch: ''
    })
  }

  handleSearchChange(text) {
    this.setState({
      searchValue: text
    })
  }

  handleStart() {
    this.setState({
      startTime: new Date(),
      interval: setInterval(this.tick, 1000)
    })

  }

  handleStop() {
    this.setState({
      endTime: new Date(),
      interval: clearInterval(this.state.interval)
    })
  }

  tick() {
    const {stopWatch} = this.state;
    let time = Math.floor((new Date() - this.state.startTime)/ 1000);
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / (60 * 60));
    this.setState({
      timer: `${hours}:${minutes}:${seconds}`,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    })
  }

  render() {
    const { searchValue } = this.state;
    const { cards } = this.props;
    const { selectedCard } = cards;
    let lowerSearch  = searchValue.toLowerCase();
    return (
      <View style={styles.mainContainer}>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        {
          !this.props.cards.board.public &&
          <View style={styles.boardTitle}/>
        }
        {
          this.props.cards.board.public &&
          <View style={styles.navWrapper}>
            <TouchableOpacity
              onPress={() => this.props.router.pop()}
            >
              <Image style={styles.backIcon} resizeMode="contain" source={require('./images/backIcon.png')} />
            </TouchableOpacity>
            <View style={styles.navTitle}>
              <Text style={styles.navTitleText}>Boards</Text>
            </View>
          </View>
        }
        <View style={styles.searchInputWrap}>
          <TextInput
            onChangeText={this.handleSearchChange}
            placeholder="Filter"
            style={styles.searchInput}
            value={this.state.searchValue}/>
        </View>
        <View style={styles.boardListWrapper}>
          <ScrollView>
            {
              this.props.cards.results.map((card, index) => {
                let lowerCardName = card.public.name.toLowerCase();
                let selected = false;
                if (!_.isUndefined(selectedCard.public) && selectedCard.public.apikey === card.public.apikey) {
                  selected = true;
                };
                if (lowerSearch === '' || lowerCardName.indexOf(lowerSearch) !== -1) {
                  return (
                    <Card key={index} onCardClick={this.handleCardClick} card={card} selected={selected}/>
                  )
                }
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  handleCardClick(card) {
    this.props.dispatch(selectCard(card));
    this.props.router.pop();
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navWrapper: {
    width: width,
    height: 60,
    top: 0,
    paddingTop: 29,
    position: 'absolute',
    backgroundColor: '#0786E7'
  },
  navTitle: {
    width: width/2,
    position: 'absolute',
    left: (width/2)-(width/4),
    top: 29,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitleText: {
    color: '#FFFFFF',
    fontSize: 18
  },
  backIcon: {
    height: 22
  },
  searchInputWrap: {
    position: 'absolute',
    top: 60,
    width: width,
    height: 70
  },
  searchInput: {
    backgroundColor: 'rgb(240, 240, 240)',
    height: 30,
    width: width-40,
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  boardListWrapper: {
    width: width,
    height: height-130,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 130
  }
});

export default connect(state => ({
    loading: state.loading,
    cards: state.cards,
    message: state.message,
    boards: state.boards,
    user: state.user
  })
)(CardsContainer);
