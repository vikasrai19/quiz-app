import React from 'react';
import '../style/Home.css';

function Home(){

    window.onload = () => {
        console.log("Window loaded");
        const quizBtn = document.getElementById('start-quiz');

        quizBtn.addEventListener('click', () => {
            window.open('/quizStart', '_self')
        })
    }
    return(
        <>
            <div className="mainContent">
                <button className="start-quiz" id="start-quiz">Start Quiz</button>
            </div>
        </>
    );
}

export default Home;