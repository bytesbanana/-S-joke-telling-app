import React, { useEffect } from "react";
import { useJokeAPI } from "./hooks";

declare global {
  interface Window {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    SpeechRecognitionEvent: any;
  }
  var webkitSpeechRecognition: any;
  var webkitSpeechGrammarList: any;
  var webkitSpeechRecognitionEvent: any;
}

function App() {
  const { jokes, loading, fetchJoke } = useJokeAPI();

  const speak = (text: string): void => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);

    synth.speak(utterThis);
  };

  useEffect(() => {
    if (loading) return;
    if (!jokes) return;

    speak(jokes.setup);
    setTimeout(() => {
      speak(jokes.punchline);
    }, 1500);
  }, [jokes, loading]);

  return (
    <div className="flex justify-center p-10 flex-col">
      <div className="w-auto h-auto min-h-[400px] bg-red-300">
        Robot image here
      </div>
      <div className="flex justify-center p-4">
        <button
          disabled={loading}
          className={`border w-fit p-2 rounded-md hover:shadow-gray-300 shadow hover:shadow-md transition-all bg-blue-500 border-blue-500 text-white font-semibold hover:bg-blue-700 active:scale-105 disabled:bg-gray-400`}
          onClick={() => {
            fetchJoke();
          }}
        >
          Tell me a joke
        </button>
      </div>

      <div className="w-100 bg-red-100 p-4 flex justify-center flex-col items-center">
        <h1>{jokes?.setup}</h1>
        <p>{jokes?.punchline}</p>
      </div>
    </div>
  );
}

export default App;
