
import { useState, useEffect } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { countries } from '@/utils/countries';
import Select from "@/components/Select"

import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import axios from 'axios';

export default function Home() {

  const [languageCountries, setLanguageCountries] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);

  const [fromLang, setFromLang] = useState('pt-PT');
  const [toLang, setToLang] = useState('en-GB');

  const [translatedValue, setTranslatedValue] = useState('');

  const [inputValue, setInputValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setInputValue(result);
    },
  });

  const onEnd = () => {
    handleStopSpeaking();
  }

  const { speak, voices, cancel } = useSpeechSynthesis({onEnd});

  const handleSpeak = () => {
    speak({ text: translatedValue , voice: voices[selectedVoice] });
  }
  const handleStopSpeaking = () =>{
    cancel();
  }

  const handleStartListening = ()=>{
    listen({ lang: fromLang });
  }

  const handleSelectToLang = (lang) =>{
    const selectedLang = voices.findIndex((voice)=> voice.lang == lang)
    setSelectedVoice(selectedLang)
    setToLang(lang)
  }

  const handleSelectFromLang = (lang) =>{
    setFromLang(lang)
  }


  const handleTranslate = async ()=>{
    const from = fromLang.slice(0,2)
    const to = toLang.slice(0,2)

    const url = `https://api.mymemory.translated.net/get?q=${inputValue}&langpair=${from}|${to}`
 
    const { data } = await axios.get(url)
    setTranslatedValue(data.matches[0].translation)

  }

  useEffect(() => {
    const langs = Object.entries(countries).filter((countrie)=> voices.some((voice)=> countrie[0] == voice.lang))
    setLanguageCountries(langs)
  }, [voices])


  useEffect(() => {
    if(!listening && inputValue.length > 0){
      handleTranslate()
    }
  }, [listening])


  useEffect(() => {
    if(translatedValue.length > 0){
      handleSpeak()
    }
  }, [translatedValue])


  
  return (
      <div className="w-full h-screen flex flex-col justify-center items-center p-4 gap-4">
        <header className="text-black font-bold text-5xl">
          <h2>Voice Translator</h2>
        </header>
        <Select onChange={handleSelectFromLang} label="From" values={languageCountries} />
        <Select onChange={handleSelectToLang} label="To" values={languageCountries} />
        <button className={`my-4 text-3xl rounded-full p-4 text-white ${listening ? 'bg-red-500' : 'bg-slate-900'} `} onMouseDownCapture={handleStartListening} onTouchStart={handleStartListening} onMouseUp={stop} onTouchEnd={stop}>
          {
            !listening ?
            <FaMicrophone />
            :
            <FaMicrophoneSlash />
          }
        </button>

        <p className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-4 rounded w-full md:w-1/2'>{ inputValue || "..."}</p>
        <p className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-4 rounded w-full md:w-1/2'>{ translatedValue || "..."}</p>
      </div>
  )
}

// https://mymemory.translated.net/doc/spec.php