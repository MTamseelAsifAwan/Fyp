import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tasks from './components/Tasks';
import TaskDetailsPage from './pages/TaskDetailsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Tasks} />
        <Route path="/task/:taskId" component={TaskDetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;