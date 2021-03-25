import React, { useState } from "react";

const Statistic = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Statistics = ({
  isFeedbackGiven,
  good,
  neutral,
  bad,
  total,
  average,
  positive,
}) => {
  let statistics = (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  );
  if (isFeedbackGiven) {
    statistics = (
      <>
        <h1>statistics</h1>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </>
    );
  }
  return statistics;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);

  const handleClick = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1);
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
    setIsFeedbackGiven(true);
  };

  const total = good + bad + neutral;
  const average = (good * 1 + bad * -1) / total;
  const positive = (good / total) * 100 + " %";

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick("good")} text="good" />
      <Button handleClick={() => handleClick("neutral")} text="neutral" />
      <Button handleClick={() => handleClick("bad")} text="bad" />
      <Statistics
        isFeedbackGiven={isFeedbackGiven}
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
      <Statistic />
    </div>
  );
};

export default App;
