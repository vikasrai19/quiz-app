import React from "react";
import "../style/QuizPage.css"

class QuizPage extends React.Component {

    state = {
        quizData: [],
        quizContent: [],
        quizValue: 0,
        isCalled: false,
        quizMarks: 0
    }

    componentDidMount() {
        let newData = []
        console.log("Component mounted");
        fetch('https://raw.githubusercontent.com/vikasrai19/quiz-data/main/quizdata1.json').then(res => res.json()).then((data) => {
            console.log(data);
            let options = []
            for (let j = 0; j < data[0].options.length; j++) {
                options.push(
                    <p className="option">
                        {(j + 1) + ". " + data[0].options[j]}
                    </p>
                )
            }
            newData.push(
                <div className="quiz">
                    <h3 className="question-no">{(this.state.quizValue + 1) + "/" + data.length + " questions"}</h3>
                    <h1 className="question">{data[0].question}</h1>
                    <div className="options">
                        {options}
                    </div>
                    <div className="buttons">
                        <button className="nextButton" id="nextButton">Next</button>
                        <button className="skipButton" id="skipButton">Skip</button>
                    </div>
                </div>
            );
            // })
            this.setState({ quizContent: newData })
            this.setState({ quizData: data })
            console.log("Quiz Data")
            console.log(this.state.quizData)
            // data.map((e,i) => {
        }).catch((e) => {
            console.log(e)
        })
    }

    componentDidUpdate() {

        if (this.state.quizData.length != 0 && this.state.isCalled == false) {
            console.log("Quiz Data is not empty");
            this.startQuiz()
            this.state.isCalled = true
        }
    }

    startQuiz() {
        const nextBtn = document.getElementById('nextButton')
        const skipBtn = document.getElementById('skipButton')
        console.log("Start quiz method")

        nextBtn.addEventListener('click', () => {
            console.log("Next button clicked")
            this.quizValues()

            // Selecting as answer from the options
            let selectedAns = ""
            const options = document.getElementsByClassName('option')
            options[0].addEventListener('click', () => {
                console.log("Hello World");
            })


        })
        skipBtn.addEventListener('click', () => {
            this.quizValues()
        })
        console.log("This will be added at last")
    }

    quizValues() {
        if (this.state.quizValue < this.state.quizData.length - 1) {

            this.state.quizValue += 1;
            let newData = []
            let options = []

            // Adding options from the json data to the ui tree
            for (let i = 0; i < this.state.quizData[this.state.quizValue].options.length; i++) {
                options.push(
                    <p className="option">
                        {(i + 1) + ". " + this.state.quizData[this.state.quizValue].options[i]}
                    </p>
                )
            }


            // pushing the data into the tree
            newData.push(
                <div className="quiz">
                    <h3 className="question-no">{(this.state.quizValue + 1) + "/" + this.state.quizData.length + " questions"}</h3>
                    <h1 className="question">{this.state.quizData[this.state.quizValue].question}</h1>
                    <div className="options">
                        {options}
                    </div>
                    <div className="buttons">
                        <button className="nextButton" id="nextButton">Next</button>
                        <button className="skipButton" id="skipButton">Skip</button>
                    </div>
                </div>
            )

            // Setting the state of the quizContent to render in the ui tree
            this.setState({ quizContent: newData })
            console.log("This is from quizValue function")
        } else {
            console.log("End of quiz")
            //TODO: Go out of the loop
        }
    }

    render() {


        return (
            <>
                <div className="main-quiz-content">
                    <div className="title">
                        <h1 className="title">
                            Quiz
                        </h1>
                    </div>
                    <div className="quiz-container">
                        {this.state.quizContent}
                    </div>
                </div>
            </>
        );
    }
}

export default QuizPage;