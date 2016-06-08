import LoginContainer from './containers/LoginContainer';
import CardContainer from './containers/CardContainer';
import CardsContainer from './containers/CardsContainer';
import DashboardContainer from './containers/DashboardContainer';
import TodayContainer from './containers/TodayContainer';
import InvoicesContainer from './containers/InvoicesContainer';
import ReportsContainer from './containers/ReportsContainer';
import SettingsContainer from './containers/SettingsContainer';

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

  toDashboard(props) {
    this.push(props, {
      title: 'Dashboard',
      component: DashboardContainer
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

  toToday(props) {
    this.push(props, {
      title: 'Today',
      component: TodayContainer
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
