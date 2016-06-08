'use strict';

import { bindActionCreators } from 'redux';
import { styles } from '../assets/StyleSheet';
import { helperStyles } from '../assets/HelperStyles';
import { connect } from 'react-redux';
import { listBoards, selectBoard } from '../actions/BoardActions';
import Board from '../components/Board';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import TopBar from '../components/TopBar';
import React, {
  StyleSheet,
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


class DashboardContainer extends Component {
  constructor() {
    super();
    this.handleBoardClick = this.handleBoardClick.bind(this);
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    AsyncStorage.getItem('apikey').then((value) => {
      dispatch(listBoards(value));
    }).done()
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar title="Dashboard"/>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
        <ScrollView>
          {
            this.props.boards.results.map((board, index) => {
              return (
                <Board key={index} onBoardClick={this.handleBoardClick} board={board}/>
              )
            })
          }
        </ScrollView>
        <Menu router={this.props.router} />
    </View>
    );
  }

  handleBoardClick(board) {
    const { dispatch } = this.props;
    dispatch(selectBoard(board));
    this.props.router.toCards(this.state);

  }
}

export default connect(state => ({
    loading: state.loading,
    boards: state.boards,
    message: state.message,
    user: state.user
  })
)(DashboardContainer);
