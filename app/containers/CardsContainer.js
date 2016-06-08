'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { forms } from '../assets/FormsStyleSheet';
import { connect } from 'react-redux';
import { listCards, selectCard } from '../actions/CardActions';
import Card from '../components/Card';
import BoardTitle from '../components/BoardTitle';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import React, {
  StyleSheet,
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
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
    let lowerSearch  = searchValue.toLowerCase();
    return (
      <View style={styles.pageWrap}>
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
          <BoardTitle board={this.props.cards.board}/>
        }
        <View style={forms.searchInputWrap}>
          <TextInput
            onChangeText={this.handleSearchChange}
            style={forms.searchInput}
            value={this.state.searchValue}/>
        </View>
        <ScrollView style={styles.cardsScrollView}>
          {
            this.props.cards.results.map((card, index) => {
              let lowerCardName = card.public.name.toLowerCase();
              if (lowerSearch === '' || lowerCardName.indexOf(lowerSearch) !== -1) {
                return (
                  <Card key={index} onCardClick={this.handleCardClick} card={card} />
                )
              }
            })
          }
        </ScrollView>
        <Menu router={this.props.router}/>
      </View>
    );
  }

  handleCardClick(card) {
    this.props.dispatch(selectCard(card));
    this.props.router.toCard(this.state);
  }
}

export default connect(state => ({
    loading: state.loading,
    cards: state.cards,
    message: state.message,
    boards: state.boards,
    user: state.user
  })
)(CardsContainer);
