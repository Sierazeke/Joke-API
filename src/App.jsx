import { useState } from "react";

export default function JokeBtn() {
    const [ joke, setJoke ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ punchline, setPunchline ] = useState(null);

    const url = "https://official-joke-api.appspot.com/random_joke";
    async function getJoke() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        setJoke(await res.json());
        setPunchline(punchline);
      } catch (e) {
          setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    return (
      <div>

        <button onClick={getJoke} disabled={loading}>
        {loading ? "Loading a joke..." : "Tell me a joke"}
        </button>
        {error && <p>{error}</p>}
        {joke && (
          <p>
            {joke.setup}
          </p>
        )}
        <br />
        <button onClick={ () => setPunchline(!punchline)} >
        Punchline?
        </button>
        {error && <p>{error}</p>}
        {punchline && (
          <p>
            <strong>{joke.punchline}</strong>
          </p>
        )}

      </div>
    );
}
