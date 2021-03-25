import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const generateAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      {anecdotes[selected]} <br></br>
      has {votes[selected]} votes<br></br>
      <button onClick={vote}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
    </div>
  );
};

export default App;
