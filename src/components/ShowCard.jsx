import React, { useState, useEffect } from 'react';
import profil from '../uploads/profile.png';
import { useNavigate, useParams } from 'react-router-dom';
import {Mic, MessageCircle, Share} from 'lucide-react'

const ShowCard = ({ onShowForm, content, numero, name }) => {
  const [show, setShow] = useState(false);
  const [showLangage, setShowLangage] = useState(false);
  const [copy, setCopy] = useState(false) 
  const [voices, setVoices] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        const voices = synth.getVoices();
        setVoices(voices);
      };
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleSpeak = (selectedVoice) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(content);
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        speech.voice = voice;
      }
      window.speechSynthesis.speak(speech);
      setShowLangage(false)
    } else {
      alert('Speech Synthesis not supported in this browser.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText("http://localhost:3000/articles/show/"+id)
      .then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 2000); 
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleVis = () => {
    setShowLangage(!showLangage)
  }

  const navigate  = useNavigate()
  const handleButtonClick = (text) => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user')

    if (!accessToken && !user) {
      navigate('/login');
      return;
    }
    onShowForm(text);
    setShow(false);
  };

  return (
    <div className='flex flex-col w-full border-2 border-gray-200 rounded-sm mb-2'>
      <div className="flex flex-row space-x-2 items-center p-3 bg-[#6acde5]">
        <div className="text-white font-bold text-lg">{'Article '+ numero + ' :'}</div>
        <div className="text-white font-semibold text-md">{name}</div>
      </div>
      <div className="flex flex-grow justify-center p-3 max-h-[300px] overflow-y-auto">
        {content}
      </div>
      <div className='flex flex-row items-center justify-between py-3 px-4 bg-gray-200'>
        <div className="items-center justify-center flex flex-col relative group">
          <button onClick={handleVis}>
            <Mic className='flex flex-col items-center justify-center font-semibold text-violet-500' size={23} />
          </button>
            {showLangage && (
              <div className="absolute overflow-y-auto w-60 max-h-[100px] top-0 left-10 w-auto bg-white border border-gray-300 shadow-lg 
              rounded-md py-2 gap-2">
                {voices.map((voice) => (
                  <button onClick={(e) => handleSpeak(voice.name)} 
                  className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>
                  {voice.name} ({voice.lang})</button>
                ))}
              </div>
            )}
        </div>
        <div className="items-center justify-center flex flex-row relative group">
          <button onClick={handleShow}>
            <MessageCircle className='flex flex-col items-center justify-center font-semibold text-blue-500' size={23} />
          </button>
          {show && (
            <div className="absolute top-0 left-10 w-32 bg-white border border-gray-300 shadow-lg rounded-md py-2 gap-2">
              <button onClick={() => handleButtonClick('Commentaire')} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Commentaire</button>
              <button onClick={() => handleButtonClick('Fait')} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Fait</button>
            </div>
          )}
        </div>
        <div className="items-center justify-center flex flex-col relative group">
          <button className='h-8 w-8 items-center' onClick={handleShare}>
            <Share className='flex flex-col items-center justify-center font-semibold text-red-500' size={23} />
          </button>
          {copy && <div className='absolute top-10 left-0 right-10 w-12 bg-white border border-gray-300 shadow-lg rounded-md py-2 gap-2'>Copié!</div>}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;