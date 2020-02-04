import * as React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

 const Bar = () => <h1>Bar Page</h1>;

export class App extends React.Component {
  render() {
    
    return (
      <Router>
        <div>
          <nav>
            <Link to="/bar">Bar</Link>
          </nav>
          <Switch>
            <Route exact path="/bar" component={Bar} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// render(<App />, document.getElementById('root'));
