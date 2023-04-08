import * as ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"

const data = {
  user: {
    id: 1,
    name: "Chase Kinard",
    pfpref: "pfp/chase-kinard.png"
  },
  
  users: [
    {
      id: 1,
      name: "Chase Kinard",
      pfpref: "pfp/chase-kinard.png"
    },
    {
      id: 2,
      name: "Cymbre Spoehr",
      pfpref: "pfp/cymbre-spoehr.jpg"
    }
  ],

  tasks: [
    { name: "Clean out the fridge", id: 1, assigner: 1, assignee: 2, duration: 60, frequency: "weekly", desiredTime: "7:00, Monday" },
    { name: "Sweep the basement", id: 2, assigner: 2, assignee: 1, duration: 30, frequency: "biweekly", desiredTime: "any" },
    { name: "Organize the garage", id: 3, assigner: 2, assignee: 1, duration: 30, frequency: "biweekly", desiredTime: "any" }
  ]
};

ReactDOM.createRoot(document.getElementById('root')).render(<App data={data} />);