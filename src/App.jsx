import {useState} from 'react';
import {Configuration,OpenAIApi} from 'openai';
import './App.css';
function App(){
  const [prompt,setPrompt] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);
  const [placeholder,setPlaceholder] = useState('search bears with paint brushes the starry night, painted by vincent van gogh..');
  const configuration = new Configuration({apiKey: import.meta.env.VITE_Open_AI_Key});
  const openAIApi = new OpenAIApi(configuration);
  const generateImage = async () => {
    setPlaceholder(`search ${prompt}..`);
    setLoading(true);
    const response = await openAIApi.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    setLoading(false);
    setResult(response.data.data[0].url);
  };
  return (
    <div className="application-main">
      {loading ? (
        <>
          <h2>generating..please wait..</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>generate an image using open ai api</h2>
          <textarea
            className="application-input"
            rows="10"
            cols="40"
            placeholder={placeholder}
            onChange={(event) => setPrompt(event.target.value)}
          />
          <button onClick={generateImage}>generate an image</button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="Result"/>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
export default App;