import { bindActionCreators } from 'redux';
import { helperStyles } from '../assets/HelperStyles';
import { connect } from 'react-redux';
import _ from 'lodash';
import { listBoards, selectBoard } from '../actions/BoardActions';
import Board from '../components/Board';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import TopBar from '../components/TopBar';
import React, {
  AsyncStorage,
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


class BoardsContainer extends Component {
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
    const { selectedBoard } = this.props.boards;
    return (
      <View style={styles.mainContainer}>
        {
          this.props.loading.isLoading &&
          <Loader/>
        }
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
        <View style={styles.boardListWrapper}>
          <ScrollView>
            {
              this.props.boards.results.map((board, index) => {
                var selected = false;
                if (!_.isUndefined(selectedBoard.public) && selectedBoard.public.apikey === board.public.apikey) {
                  selected = true;
                };
                return (
                  <Board key={index} onBoardClick={this.handleBoardClick} board={board} selected={selected} />
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  handleBoardClick(board) {
    const { dispatch } = this.props;
    dispatch(selectBoard(board));
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
  boardListWrapper: {
    width: width,
    height: height-60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60
  }
});

export default connect(state => ({
    loading: state.loading,
    boards: state.boards,
    message: state.message,
    user: state.user
  })
)(BoardsContainer);
