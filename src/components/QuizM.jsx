import React, { useEffect, useState } from 'react';
import {fetchData} from '../api'

const QuizM = ({ id, qst_id, fetchRessource  }) => {
    const [article, setArticle] = useState({});
    const [question, setQuestion] = useState({});
    const [reponses, setReponses] = useState([]);
    const [selectedReponse, setSelectedReponse] = useState(null);
    const [correctReponse, setCorrectReponse] = useState(null);

    useEffect(() => {
        fetchArticle();
        fetchReponses();
    }, []);

    const fetchArticle = async () => {
        try {
            const response = await fetchData(`/api/questions/${qst_id}`);
            const result = await fetchData(`/api/articles/${id}`);
            setArticle(result.article);
            setQuestion(response.question);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article ou de la question", error);
        }
    };

    const fetchReponses = async () => {
        try {
            const response = await fetchData(`/api/questions/${qst_id}/reponses/`);
            setReponses(response.reponses);
            const correct = response.reponses.find(rep => rep.status === 1);
            setCorrectReponse(correct);
        } catch (error) {
            console.error("Erreur lors de la récupération des réponses", error);
        }
    };

    const handleReponseClick = (reponse) => {
        setSelectedReponse(reponse);
    };

    const handleNextClick = () => {
        fetchRessource();
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="sm:w-[75%] w-[100%] h-auto p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                <div className="w-full flex flex-col shadow-md rounded-md p-4 gap-2 ">
                <div className="text-blue-400 text-md w-full flex font-semibold "> Article {article.numero} : {article.nom} </div>
                    <div className="text-md w-full">{article.contenu}</div>
                    <div className="text-md w-full">{article.contenu}</div>
                    <div className="text-md w-full">{article.contenu}</div>
                    <div className="text-md w-full">{article.contenu}</div>
                </div>
                <div className="question flex items-start flex flex-col gap-2 mb-2 ">
                    <div className=" text-blue-400 text-xl font-bold">? Question :</div>
                    <div className="text-md "> {question.contenu} </div>
                </div>
                <div className='responses w-full flex flex-col rounded-md gap-2 mb-2 '>
                    {reponses.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleReponseClick(item)}
                            className={`w-full py-3 px-2 flex items-start rounded-md 
                            ${selectedReponse
                                ? selectedReponse === item
                                    ? item.status === 1
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                    : item.status === 1
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {item.contenu}
                        </button>
                    ))}
                </div>
                <div className='w-full flex justify-center'>
                    <button 
                        onClick={handleNextClick} 
                        className=' rounded-md bg-blue-400 hover:bg-blue-500 px-3 py-2 w-[30%] sm:w-[15%] text-md text-white font-semibold'>
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizM;
