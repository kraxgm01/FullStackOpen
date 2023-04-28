import { useState } from "react";
import "./index.css";

let castVote = 0;
let count = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const DisplayAnecs = ({ anecdote }) => {
  return <p>{anecdote}</p>;
};

const DisplayHighest = (props) => {
  console.log("Running again");
  let emptyFlag = true;
  for (let i = 0; i < 8; i++) {
    if (props.count[i] !== 0) {
      emptyFlag = false;
    }
  }
  if (emptyFlag) {
    return <p>Please cast votes</p>;
  }
  let max = -10;
  let index = 0;
  for (let i = 0; i < 8; i++) {
    if (max <= props.count[i]) {
      max = props.count[i];
      index = i;
    }
  }
  console.log("Max", max);
  return <p>{props.anecdotes[index]}</p>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([]);

  const handleNext = () => {
    let x = Math.floor(Math.random() * 7 + 1);
    castVote = x;
    console.log("castVote", castVote);
    console.log("X", x);
    setSelected(x);
    console.log("selected", selected);
  };

  const handleVote = () => {
    console.log("castVote in vote", castVote);
    setVote(vote.concat(castVote));
    if (count[castVote]) {
      count[castVote] += 1;
    } else {
      count[castVote] = 1;
    }
    console.log(count);
  };

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <DisplayAnecs anecdote={anecdotes[selected]} />
      <p><b>votes:</b> <b>{count[castVote]}</b></p>
      <Button handleClick={handleNext} text={"next anecdote"} />
      <Button handleClick={handleVote} text={"vote"} />
      <h1>Anecdote with most votes:</h1>
      <DisplayHighest count={count} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
