import { useState } from "react";
import "./App.css";
import { GuessingBar } from "./components/guessingBar.tsx";
import styled from "styled-components";
import { Score } from "./components/score.tsx";

const View = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  align-items: center;
  
`;

const GuessingBarStyled = styled(GuessingBar)`
  grid-row: span 2;
`;

const Button = styled.button`
  border: 1px solid black;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <GuessingBarStyled />
      <Button>Final answer - 5</Button>
      <Score />
    </View>
  );
}

export default App;
