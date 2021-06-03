import React,{useState,useEffect} from 'react'
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";


const Trivia = ({data,setTimeOut,setQuestionNumber,questionNumber}) => {

	const [question, setQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [className, setClassName] = useState("answer");
	const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);	


  useEffect(() => {
    letsPlay();
  }, [letsPlay]);  

	useEffect(() => {
		if(questionNumber > 15){
			setTimeOut(true)
		}else{
			setQuestion(data[questionNumber - 1]);
		}
		
	}, [data,questionNumber,setTimeOut])


	const delay = (duration,callback) =>{
		setTimeout(()=>{
			callback()
		},duration)
	}

	const handleClick = (a) =>{
		setSelectedAnswer(a);
		setClassName("answer active");
		delay(3000,()=>setClassName(a.correct ? "answer correct" : "answer wrong"))
		delay(6000,()=>{
			if(a.correct){
				correctAnswer()
				delay(1000,()=>{
					setQuestionNumber(prev=>prev + 1);
					setSelectedAnswer(null)
				})
			}else {
				delay(1000,()=>{
					wrongAnswer()
					setTimeOut(true)
				})	
			}
		})
	}

	return (
		<div className="trivia">
			<div className="question">{question?.question}</div>
			<div className="answers">
 			{question?.answers.map((a,i) => (
		          <div key={i}
		            className={selectedAnswer === a ? className : "answer"}
		         onClick={() => !selectedAnswer && handleClick(a)}
		          >
            {a.text}
          </div>
        ))}
			</div>
		</div>
	)
}

export default Trivia