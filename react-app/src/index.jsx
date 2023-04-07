import * as ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"

const data = {
  user: {
      name: "Chase Kinard",
      pfpref: "pfp/chase-kinard.png"
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(<App data={ data }/>);