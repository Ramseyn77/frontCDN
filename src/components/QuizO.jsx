import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const QuizO = ({ id, qst_id, fetchRessource }) => {
    const [article, setArticle] = useState({});
    const [question, setQuestion] = useState({});
    const [reponse, setReponse] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctReponse, setCorrectReponse] = useState('');

    useEffect(() => {
        fetchArticle();
        fetchReponse();
    }, []);

    const fetchArticle = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/questions/' + qst_id);
            const result = await axios.get('http://localhost:8000/api/articles/' + id);
            setArticle(result.data.article);
            setQuestion(response.data.question);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article ou de la question", error);
        }
    };

    const fetchReponse = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/questions/' + qst_id + '/reponses/');
            setReponse(response.data.reponses);
            const correct = response.data.reponses.find(rep => rep.status === 1);
            setCorrectReponse(correct.contenu);
        } catch (error) {
            console.error("Erreur lors de la récupération des réponses", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim().toLowerCase() === correctReponse.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextClick = () => {
        fetchRessource();
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="sm:w-[75%] w-[100%] h-auto p-4 flex flex-col gap-4  max-h-[80vh] overflow-y-auto">
                <div className="w-full flex flex-col border rounded-md p-4 gap-2 ">
                    <div className="title text-md w-full flex font-semibold "> Article {article.numero} </div>
                    <div className="text-md w-full">{article.contenu}</div>
                </div>
                <div className="question flex items-start flex flex-col gap-2 mb-2 ">
                    <div className="text-xl font-bold">? Question :</div>
                    <div className="text-md "> {question.contenu} </div>
                </div>
                <form className='flex flex-row items-center gap-1' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className={`w-full outline-none border-2 rounded-lg text-gray-300 text-sm focus:text-gray-900 px-2 py-3 ${
                            isCorrect === false ? 'border-red-500' : 'border-gray-300'
                        }`} 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required 
                    />
                    <button 
                        className={`p-3 rounded-md text-white font-semibold ${
                            isCorrect === false ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    >
                        <ArrowRight /> 
                    </button>
                </form>
                {isCorrect === false && (
                    <div className="w-full bg-green-500 text-white font-semibold py-3 px-2 flex items-start rounded-md">
                        {correctReponse}
                    </div>
                )}
                <div className='w-full flex justify-center'>
                    <button 
                        onClick={handleNextClick} 
                        className='rounded-md bg-blue-500 hover:bg-blue-400 px-3 py-2 w-[30%] sm:w-[15%] text-md text-white font-semibold'>
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizO;
