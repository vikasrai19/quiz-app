import React from "react"
import "../style/QuizMarks.css"

class QuizMarks extends React.Component{

    state = {
        quizScore: 0
    }

    componentDidMount(){
        const score = localStorage.getItem('quizScore')
        this.setState({quizScore: score})
    }

    render(){
        return(
            <>
                <div className="marks-container">
                    <h2 className="marks-title">Hurray! You completed your Quiz</h2>
                    <div className="score-board">
                        <h3 className="marks-desc">Your final marks is </h3>
                        <h3 className="marks">&nbsp;&nbsp;{ this.state.quizScore}</h3>
                    </div>
                </div>
            </>
        );
    }
}

export default QuizMarks;