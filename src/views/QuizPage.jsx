import React from "react";
import "../style/QuizPage.css"

class QuizPage extends React.Component {

    state = {
        quizData: [],
        quizContent: [],
        quizValue: 0,
        isCalled: false,
        quizMarks: 0,
        selectedAns: ''
    }

    componentDidMount() {
        let newData = []
        fetch('https://raw.githubusercontent.com/vikasrai19/quiz-data/main/quizdata1.json').then(res => res.json()).then((data) => {
            // console.log(data);
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
            // data.map((e,i) => {
        }).catch((e) => {
            console.log(e)
        })
    }

    componentDidUpdate() {

        if (this.state.quizData.length != 0 && this.state.isCalled == false) {
            this.startQuiz()
            this.state.isCalled = true
        }
    }

    startQuiz() {
        const nextBtn = document.getElementById('nextButton')
        const skipBtn = document.getElementById('skipButton')

        nextBtn.addEventListener('click', () => {
            if (this.state.selectedAns == '') {
                alert("Please select an option before continuing")
                this.state.quizValue -= 1;
            }
            else if (this.state.selectedAns == this.state.quizData[this.state.quizValue].answer) {
                console.log('Correct')
                this.state.quizMarks += 1
            } else {
                console.log("False")
            }
            console.log("Your marks is " + this.state.quizMarks)
            this.quizValues()
            for (let j = 0; j < options.length; j++) {
                options[j].className = "option"
            }
            this.state.selectedAns = ''
        })

        // let selectedAns = '';
        const options = document.getElementsByClassName('option')
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener('click', () => {
                this.state.selectedAns = options[i].innerText.slice(3)
                for (let j = 0; j < options.length; j++) {
                    options[j].className = "option"
                }
                options[i].className = "option active"
            })
        }

        skipBtn.addEventListener('click', () => {
            this.quizValues()
        })
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
        } else {
            console.log("End of quiz")
            localStorage.setItem("quizScore", this.state.quizMarks)
            window.open("/quizScore", "_self")
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