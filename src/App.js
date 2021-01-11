import React, { useState, useEffect } from "react";
import "./App.css";
import Connexion from "./components/Connexion";
import Home from "./components/Home";
import TasksList from "./components/TasksList";
import NewTask from "./components/NewTask";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  const [connected, setConnected] = useState(false);
  const [taskList, setTaskList] = useState([
    {
      id: 0,
      name: "Envoyer E-mail",
      description: "A toute l'équipe",
      completed: false,
    },
    {
      id: 1,
      name: "Faire l'exercice ",
      description: "React only",
      completed: false,
    },
  ]);

  /* useEffect: cette fonction se lance au chargement de l'interface */
  useEffect(() => {
    let tempList = JSON.parse(localStorage.getItem("myList"));
    if (tempList?.length) setTaskList(tempList);
  }, []);

  return (
    <div className="App">
      {!connected ? (
        <Connexion connected={connected} setConnected={setConnected} />
      ) : (
        <Router>
          <div>
            <AppBar position="static">
              <Toolbar className="titleStyle">
                <Typography variant="h6">
                  <Link to="/">Home</Link>
                </Typography>
                <Typography variant="h6">
                  <Link to="/TasksList">Liste des tâches</Link>
                </Typography>
                <Typography variant="h6">
                  <Link to="/NewTask">Ajouter une tâche</Link>
                </Typography>
                <Typography variant="h6">
                  <Link to="/" onClick={() => setConnected(false)}>
                    Déconnexion
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>
            <hr />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/TasksList">
                <TasksList taskList={taskList} setTaskList={setTaskList} />
              </Route>
              <Route path="/NewTask">
                <NewTask taskList={taskList} setTaskList={setTaskList} />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
