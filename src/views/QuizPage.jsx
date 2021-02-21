import React from "react";
import "../style/QuizPage.css"

class QuizPage extends React.Component{

    state = {
        quizData : [],
        quizContent : []
    }

    componentDidMount(){
        console.log("Component mounted");
        let newData = [];
        fetch('https://raw.githubusercontent.com/vikasrai19/quiz-data/main/quizdata1.json').then(res => res.json()).then((data) => {
            console.log(data);
            data.map((e,i) => {
                newData.push(
                    <div className="quiz">
                        <h3 className="question-no">{(i+1) + "/" + data.length + " questions"}</h3>
                        <h1 className="question">{e.question}</h1>
                        <div className="options"></div>
                        <div className="buttons"></div>
                    </div>
                );
            })
            this.setState({quizContent: newData})
        })
    }

    render(){
        return(
            <>
                <div className="main-quiz-content">
                    <div className="quiz-container">
                        {this.state.quizContent}
                    </div>
                </div>
            </>
        );
    }
}

export default QuizPage;