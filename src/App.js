import React from 'react';
import Home from "./views/Home"
import {Switch, Route, Link, Redirect} from "react-router-dom";
import QuizPage from "./views/QuizPage";

class App extends React.Component {
	
	render(){
		return(
			<>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/quizStart" component={QuizPage} />
                </Switch>
			</>
		);
	}
}


export default App;