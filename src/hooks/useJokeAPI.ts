import { useState } from "react";

export interface Joke {
  id: number;
  punchline: string;
  setup: string;
  type: string;
}
const useJokeAPI = function () {
  const [joke, setJoke] = useState<Joke>();
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/programming/random"
      );
      if (response.ok) {
        const data = await response.json();
        setJoke(data[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { joke, loading, fetchJoke };
};

export default useJokeAPI;
