/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useJokeAPI } from "./hooks";
import { Joke } from "./hooks/useJokeAPI";

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
  const { joke, loading, fetchJoke } = useJokeAPI();
  const synth = window.speechSynthesis;

  const tellJoke = (joke: Joke) => {
    const setupUtter = new SpeechSynthesisUtterance(joke.setup);
    const punchLineUtter = new SpeechSynthesisUtterance(joke.punchline);

    synth.speak(setupUtter);

    setupUtter.addEventListener("end", () => {
      setTimeout(() => {
        synth.speak(punchLineUtter);
      });
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!joke) return;

    tellJoke(joke);
  }, [joke, loading]);

  return (
    <div className="flex justify-center p-20 flex-col items-center">
      <div className=" relative w-[300px] h-auto">
        <img src="/robot.png" alt="robot" />
      </div>
      <div className="flex justify-center p-4">
        <button
          disabled={loading}
          className={`border w-fit p-2 rounded-md hover:shadow-gray-300 shadow hover:shadow-lg transition-all border-black text-black text-4xl hover:bg-gray-700 hover:text-gray-200 active:scale-105 disabled:bg-gray-400`}
          onClick={() => {
            if (synth.speaking) synth.cancel();
            fetchJoke();
          }}
        >
          Tell me a joke
        </button>
      </div>

      <div className="w-100 p-4 flex justify-center flex-col items-center">
        <h1 className="text-5xl font-bold text-center p-4">{joke?.setup}</h1>
        <p className="text-3xl text-center">{joke?.punchline}</p>
      </div>
    </div>
  );
}

export default App;
