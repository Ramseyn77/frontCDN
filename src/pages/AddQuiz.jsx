import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AddQuiz = () => {
    const [question, setQuestion] = useState({
        'contenu' : null,
        'article_id' : null, 
        'status' : null
    })
    const navigate = useNavigate()
    const [reponses, setReponses] = useState([
        {
            'contenu' : '',
            'question_id' : '' ,
            'status' : ''
        },
        {
            'contenu' : '',
            'question_id' : '' ,
            'status' : ''
        },
        {
            'contenu' : '',
            'question_id' : '' ,
            'status' : ''
        },
        {
            'contenu' : '',
            'question_id' : '' ,
            'status' : ''
        },
])
    const [user, setUser] = useState([])
    const [articles, setArticles] = useState([])
    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    }
    const handleReponseChange = (index, field, value) => {
        const newReponses = [...reponses];
        newReponses[index][field] = value;
        setReponses(newReponses);
    };
    const fetchUser = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const id = localStorage.getItem('user_id');
        try {
            const response = await axios.get('http://localhost:8000/api/users/' + id);
            const fetchedUser = response.data.user;
            setUser(fetchedUser);
            if (!accessToken || fetchedUser.status !== 2) {
                navigate('/notFound');
                return;
            }
        } catch (error) {
            console.error('Message', error);
            navigate('/notFound');
        }
    };
    useEffect(() => {
        fetchUser()
        fetchArticles()
    }, [])
    const fetchArticles = async () => {
        try{
            const results = await axios.get('http://localhost:8000/api/articles') 
            setArticles(results.data.articles)
        }catch(error){
            console.error('Something went wrp,g ', error)
        }
    }

    const [errors,setErrors] = useState({})
    const [errorMessage,setErrorMessage] = useState()

    const validateQuestion = () => {
        let tempErrors = {};
        if (!question.contenu) tempErrors.contenu = true;
        if (!question.article_id) tempErrors.article_id = true;
        if (!question.status) tempErrors.status = true;
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handlePass = (type) => {
        const validationErrors = validateQuestion();
        if (!validationErrors) {
            setErrors(validationErrors);
            setErrorMessage('Veillez bien remplir les champs')
            setShow(false);
        } else {
            setErrors({});
            setErrorMessage(null)
            if(type === 'pass'){
                setShow(true)
            }else {
                setQuestion({})
                setShow(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const questionResponse = await axios.post('http://localhost:8000/api/questions', question);
          const questionId = questionResponse.data.question.id
          const reponsesWithQuestionId = reponses.map(reponse => ({ ...reponse, question_id: questionId }))
          
          console.log(reponsesWithQuestionId)          
            if(question.status == 1) {
                   reponsesWithQuestionId[0].status = 1
                const result = await axios.post('http://localhost:8000/api/reponses', reponsesWithQuestionId[0])
            }else {
                reponsesWithQuestionId.map(async (reponse) => {
                    const resuts = await axios.post('http://localhost:8000/api/reponses', reponse)
                })
            }
          navigate('/sucess')
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
              } else {
                console.error(error);
              }
        }     
    }

  return (
    <div className='w-full'>
      <Navbar link={'quiz'} />
      <div className="w-full flex flex-col items-center justify-center p-4">
        <div className='w-full flex justify-center items-center text-2xl font-bold'>
            Ajouter un Quiz
        </div>
        {
            errorMessage && (
                <div className=' py-3 mt-2 w-full sm:w-[50%] flex justify-center items-center text-md sm:text-lg font-semibold bg-red-300 text-white rounded-sm '>
                    {errorMessage}
                </div>
            )
        }
        {show ? (
            <form method="post" className='flex flex-col justify-center items-center w-full mt-6 sm:w-[50%] '>
                {
                   question.status == 1 ? (
                    <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                        <label for='contenu' className='text-black font-semibold text-md'>Reponse</label>
                        <input name='contenu' value={reponses[0].contenu} onChange={(e) => handleReponseChange(0, 'contenu', e.target.value)} placeholder='Contenu'  className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3' required/>
                        <input type='hidden' name='status' value={1} />
                    </div>
                   ) : (
                    reponses.map((item, i) => (
                        <div key={i} className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                            <label for='contenu' className='text-black font-semibold text-md'>{ 'Reponse '+(i+1)}</label>
                            <div key={i} className="flex flex-row items-center justify-between gap-2 py-1 w-full mb-2">
                                <input name='contenu' value={item.contenu} onChange={(e) => handleReponseChange(i, 'contenu', e.target.value)} placeholder='Contenu' className={`w-[75%] outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.contenu ? 'border-red-300' : ''}`} required/>
                                <select name='status' value={item.status} onChange={(e) => handleReponseChange(i, 'status', e.target.value)} className={`w-[25%] outline-none border border-2 py-0 pl-2 pr-7 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.contenu ? 'border-red-300' : ''}`} required>
                                    <option>La question est ?</option>
                                    <option value={0}>Incorrecte</option>
                                    <option value={1}>Correcte</option>
                                </select>
                            </div>
                        </div>
                    ))
                   )
                }
                <div className=' w-full flex flex-col gap-3 sm:flex-row  items-center justify-between py-1 mt-2'>
                    <button type="button" onClick={(e) => handlePass('annul')} className='px-3 py-2 flex items-center gap-2 text-sm text-white font-bold bg-red-400 rounded-md hover:bg-red-300 transistion-colors'>
                        Annuler
                        <X className='h-4 w-4' />
                    </button>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className='px-3 py-2 flex items-center gap-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-[#6acde5] transition-colors'>
                        Terminé
                        <CheckCircle className='h-4 w-4' />
                    </button>                  
                </div>
            </form>
        ) : (
            <form className='flex flex-col justify-center items-center w-full mt-6 sm:w-[50%] '>
                <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2 ">
                    <label for='article' className='text-black font-semibold text-md'>Article</label>
                    <select onChange={(e) => handleChange(e)} name='article_id' placeholder='Articles' className={`w-full outline-none border py-0 pl-2 pr-7 border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.article_id ? 'border-red-300': '' } `}>
                        <option>Articles</option>
                        {
                            articles.map((item) => (
                                <option value={item.id}>{'Article '+ item.numero+' : '+ item.nom}</option>
                            ))
                        }
                    </select> 
                </div>
                <div className='flex flex-col space-y-2 px-2 py-1 w-full mb-2 '>
                    <label for='status' className='text-black font-semibold text-md'>Type de question</label>
                    <select onChange={(e) => handleChange(e)} name='status' placeholder='Articles' className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.status ? 'border-red-300': '' } `}>
                        <option> Type de questiopn </option>
                        <option value={0}> A choix multiples</option>
                        <option value={1}> Ouverte </option>
                    </select> 
                </div>
                <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                    <label for='contenu' className='text-black font-semibold text-md'>Contenu</label>
                    <input name='contenu' value={question.contenu} onChange={e => handleChange(e)} placeholder='Contenu' className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.contenu ? 'border-red-300': '' } `} required/>
                </div>
                <div className='flex flex-col items-center py-1 mt-2'>
                    <button type="button" onClick={(e) => handlePass('pass')} className='px-3 py-2 flex items-center gap-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-[#6acde5] transition-colors'>
                        Suivant
                        <ArrowRight className='h-4 w-4' />
                    </button>
                </div>           
            </form>
        )
            
        }
      </div>
    </div>
  )
}

export default AddQuiz
