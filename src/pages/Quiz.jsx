import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import QuizM from '../components/QuizM';
import QuizO from '../components/QuizO';

const Quiz = () => {
    const [quizs, setQuizs] = useState([]);
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        fetchRessource();
    }, []);

    const fetchRessource = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/questions');
            setQuizs(response.data.questions);

            if (response.data.questions.length > 0) {
                const rdId = Math.floor(Math.random() * response.data.questions.length);
                setQuiz(response.data.questions[rdId]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des ressources", error);
        }
    };

    return (
        <div className='w-screen'>
            <Navbar link={'quiz'} />
            {quiz.status === 0 ? (
                <QuizM qst_id={quiz.id} id={quiz.article_id} fetchRessource={fetchRessource} />
            ) : (
                <QuizO qst_id={quiz.id} id={quiz.article_id} fetchRessource={fetchRessource} />
            )}
        </div>
    );
}

export default Quiz;
