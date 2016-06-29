import LoginContainer from './containers/LoginContainer';
import BoardsContainer from './containers/BoardsContainer';
import CardContainer from './containers/CardContainer';
import CardsContainer from './containers/CardsContainer';
import DashboardContainer from './containers/DashboardContainer';
import WeekContainer from './containers/WeekContainer';
import InvoicesContainer from './containers/InvoicesContainer';
import ReportsContainer from './containers/ReportsContainer';
import SettingsContainer from './containers/SettingsContainer';
import RootTabContainer from './containers/RootTabContainer';
import SignUpContainer from './containers/SignUpContainer';
import GetRecoverContainer from './containers/GetRecoverContainer';
import SetRecoverContainer from './containers/SetRecoverContainer';

export default class MainRouter {
  constructor(navigator) {
    this.navigator = navigator;
  }

  push(props, route) {
    const routesList = this.navigator.getCurrentRoutes();
    const nextIndex = routesList[routesList.length - 1].index + 1;
    route.props = props;
    route.index = nextIndex;
    this.navigator.push(route);
  }

  pop() {
    this.navigator.pop();
  }

  toLogin(props) {
    this.push(props, {
      title: 'Login',
      component: LoginContainer
    });
  }

  toSignUp(props) {
    this.push(props, {
      title: 'Sign Up',
      component: SignUpContainer
    })
  }

  toGetRecover(props) {
    this.push(props, {
      title: 'Recover Password',
      component: GetRecoverContainer
    })
  }

  toSetRecover(props) {
    this.push(props, {
      title: 'Set Password',
      component: SetRecoverContainer
    })
  }

  toRootTab(props) {
    this.push(props, {
      title: 'Dashboard',
      component: RootTabContainer
    })
  }

  toBoards(props) {
    this.push(props, {
      title: 'Boards',
      component: BoardsContainer
    })
  }

  toCard(props) {
    this.push(props, {
      title: 'Card',
      component: CardContainer
    })
  }

  toCards(props) {
    this.push(props, {
      title: 'Cards',
      component: CardsContainer
    })
  }

  toWeek(props) {
    this.push(props, {
      title: 'Today',
      component: WeekContainer
    })
  }

  toInvoices(props) {
    this.push(props, {
      title: 'Invoices',
      component: InvoicesContainer
    })
  }

  toReports(props) {
    this.push(props, {
      title: 'Reports',
      component: ReportsContainer
    })
  }

  toSettings(props) {
    this.push(props, {
      title: 'Settings',
      component: SettingsContainer
    })
  }
}
