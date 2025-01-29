import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import PartX from '../components/PartX'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {CheckCircle} from 'lucide-react'
import {fetchData, postData} from '../api'
import ConfirmPage from '../components/ConfirmPage'
import {X} from 'lucide-react'

const AddArticle = () => {
    const [success , setSucess] = useState(false)
    const [error, setError] = useState(false)
    const [livreId, setlivreId] = useState(null)
    const [article, setArticle] = useState({
        'numero' : '',
        'nom' : '',
        'contenu' : '',
        'titre_id' : '',
        'chapitre_id' : '' ,
        'section_id' : '',
    })
    const [livres, setLivres] = useState([])
    const [titres, setTitres] = useState([])
    const [chapitres, setChapitres] = useState([])
    const [sections , setSections] = useState([])
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
       fetchUser();
    }, []);
    

    const fetchUser = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const id = localStorage.getItem('user_id');
        try {
            const response = await fetchData('/api/users/' + id);
            const fetchedUser = response.user;
            setUser(fetchedUser);
            if (!accessToken || fetchedUser.status !== 2) {
                navigate('/notFound');
                return;
            }
            fetchLivres();
        } catch (error) {
            console.error('Message', error);
            navigate('/notFound');
        }
    };


    const fetchLivres = async () => {
        try {
            const response = await fetchData('/api/livres')
            setLivres(response.livres) 
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    }
    const handleLivreClick = async (e) => {
        try {
            const livreId = parseInt(e.target.value)
            setlivreId(livreId) 
            const result = await fetchData(`/api/livres/${livreId}/titres`)
            setTitres(result.titres)
            if(result.titres.length=== 0){
                setChapitres([])
                setSections([])
            }
        } catch (error) {
            console.error('Problem :', error)   
        }
    }
    const handleTitreClick = async (e) => {
        try {
            handleChange(e)
            const titreId = parseInt(e.target.value)
            const result = await fetchData(`/api/titres/${titreId}/chapitres`)
            setChapitres(result.chapitres)
        } catch (error) {
            console.error('Problem :', error) 
        }
    }
    const handleChapitreClick = async (e) => {
        try {
            handleChange(e)
            const chapitreId = parseInt(e.target.value)
            const result = await fetchData(`/api/chapitres/${chapitreId}/sections`)
            setSections(result.sections)
        } catch (error) {
            console.error('Problem :', error) 
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
      }

    const handleClick = async (e) => {
        e.preventDefault()
        setShow(!show)
    }
    const handleBack = async (e) => {
        setShow(!show)
    }
    const handleSetSuccess = () => {
        setSucess(!success)
    }
    const handleSetError = () => {
        setError(!error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await postData('/api/articles', article); 
            setSucess('L\' article '+article.numero +' a été bien enrégistrer !')
            setShow(!show)
        } catch (error) {
            console.error('Message', error)
            setError('L\' article '+article.numero +' n\'a pas été bien enrégistrer ! Veillez vérifier les informations entrer')
            setShow(!show)
        }   
    }

  return (
    <div className='h-full overflow-hidden'>
      <Navbar link={'articles'} />
      <div className="flex flex-row">
        <div className='lg:w-[75%] w-[70%] md:w-[80%] h-auto p-4 max-h-[80vh] overflow-y-auto'>
            {
                show ? (
                    <>
                        <ConfirmPage nom={article.nom} contenu={article.contenu} numero={article.numero} livre_id={livreId} titre_id={article.titre_id} chapitre_id={article.chapitre_id} section_id={article.section_id} />
                        <div className="w-full flex flex-row items-center justify-between px-10 mt-8">
                            <button  onClick={(e) => handleBack(e)} className='px-3 py-2 text-sm text-white font-bold bg-gray-400 rounded-md hover:bg-gray-600 transition-colors'>Modifier</button>
                            <button  onClick={(e) => handleSubmit(e)} className='flex flex-row items-center gap-2 px-3 py-2 text-sm text-white font-bold bg-green-400 rounded-md hover:bg-green-600 transition-colors'>
                                Enrégistrer
                                <CheckCircle className="h-4 w-4 inline "/>
                            </button>

                        </div>
                    </>
                ) : 
                (
                    <div className='flex flex-col space-y-2 px-6 py-2 items-center justify-center w-full'>
                        {
                            success && (
                                <div className='flex flex-col sm:flex-row space-y-1 items-center justify-center mb-2 w-full py-3 px-3 bg-green-300 rounded-sm'>
                                    <div className="text-sm font-semibold ">{success}</div>
                                    <X onClick={handleSetSuccess} className='text-sm hover:cursor-pointer text-gray-700' />
                                </div>
                            ) 
                        }
                        {
                            error && (
                                <div className='flex flex-col sm:flex-row space-y-1 items-center justify-between mb-2 w-full py-3 px-3 bg-red-300 rounded-sm'>
                                    <div className="text-sm font-semibold">{error}</div>
                                    <X onClick={handleSetError} className='text-sm hover:cursor-pointer  text-gray-700' />
                                </div>
                            ) 
                        }
                        <div className="flex flex-col items-center justify-center text-lg font-bold mb-4">
                            Article
                        </div>
                        <form method="post" className='flex flex-col justify-center items-center w-full sm:w-[50%] '>
                            <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2 ">
                                <label for='livre' className='text-black font-semibold text-md'>Livre</label>
                                <select onChange={(e) => handleLivreClick(e)} name='livre_id' placeholder='Livre' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3'>
                                    <option>Livres</option>
                                    {
                                        livres.map((item) => (
                                            <option value={item.id}>{'Livre '+ item.id+' : '+ item.nom}</option>
                                        ))
                                    }
                                </select> 
                            </div>
                            <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2 ">
                                <label for='titre' className='text-black font-semibold text-md'>Titre</label>
                                <select  onChange={(e) => handleTitreClick(e)} name='titre_id' placeholder='Titre' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3'>
                                    <option>Titres</option>
                                    {
                                    titres.length > 0 && (
                                            titres.map((item) => (
                                                <option value={item.id}>{'Titre '+item.numero+' : '+ item.nom }</option>
                                            ))
                                    )
                                    }
                                </select> 
                            </div>
                            {
                                chapitres.length > 0 ? (
                                    <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2 ">
                                        <label for='chapitre' className='text-black font-semibold text-md'>Chapitre</label>
                                        <select onChange={(e) => handleChapitreClick(e)} name='chapitre_id' placeholder='Chapitre' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3'>
                                            <option>Chapitres</option>
                                            {
                                                chapitres.map((item) => {
                                                    return (
                                                        <option value={item.id}>{'Chapitre '+ item.numero + ' : ' +item.nom}</option>
                                                    )
                                                })
                                            }
                                        </select> 
                                    </div>
                                ) : <div></div>
                            }
                            {
                                sections.length > 0 ? (
                                    <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2 ">
                                        <label for='section' className='text-black font-semibold text-md'>Section</label>
                                        <select name='section_id' value={article.section_id} onChange={e => handleChange(e)} placeholder='Livre' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3'>
                                            <option>Sections</option>
                                            {
                                                sections.map((item) => (
                                                    <option value={item.id}>{'Section '+item.numero+' : '+item.nom}</option>
                                                ))
                                            }
                                        </select> 
                                    </div>
                                ) : <div></div>
                            }
                            <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                                <label for='numero' className='text-black font-semibold text-md'>Numéro</label>
                                <input name='numero' value={article.numero} onChange={e => handleChange(e)} placeholder='Numéro' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3' required/>
                            </div>
                            <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                                <label for='intitulé' className='text-black font-semibold text-md'>Intitulé</label>
                                <input name='nom' value={article.nom} onChange={e => handleChange(e)} placeholder='Intitulé' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3' required/>
                            </div>
                            
                            <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                                <label for='contenu' className='text-black font-semibold text-md'>Contenu</label>
                                <textarea name='contenu' value={article.contenu} onChange={e => handleChange(e)} rows={10} placeholder='Contenu' className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3' required/>
                            </div>

                            <div className='flex flex-col items-center py-1 mt-2'>
                                <button type="submit" onClick={(e) => handleClick(e)} className='px-3 py-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-[#6acde5] transition-colors'>Soumettre</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
        <PartX title={'Récément Ajouter'} type={'redacteur'} reload={success ? true : false} />
      </div>
    </div>
  )
}

export default AddArticle
