import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { HomePage, AboutPage, ContactPage, SearchPage } from './pages';
import Nav from './components/Nav';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("App --> Render");
    return (
      <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact-us" component={ContactPage} />
            <Route path="/search" component= {SearchPage} />
          </Switch>
          <Footer />
      </Fragment>
    );
  }
}

export default App;
