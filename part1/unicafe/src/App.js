import React, { useState } from "react";

const Statistic = ({ text, value }) => (
  <td>
    {text} {value}
  </td>
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
        <table>
          <tbody>
            <tr>
              <Statistic text="good" value={good} />
            </tr>
            <tr>
              <Statistic text="neutral" value={neutral} />
            </tr>
            <tr>
              <Statistic text="bad" value={bad} />
            </tr>
            <tr>
              <Statistic text="all" value={total} />
            </tr>
            <tr>
              <Statistic text="average" value={average} />
            </tr>
            <tr>
              <Statistic text="positive" value={positive} />
            </tr>
          </tbody>
        </table>
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
    </div>
  );
};

export default App;
