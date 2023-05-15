import { useState } from "react";
import "./App.css";
import { GuessingBar } from "./components/guessingBar.tsx";
import styled from "styled-components";
import { Score } from "./components/score.tsx";
import { Game } from "./domain/domain.ts";

const View = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  align-items: center;
`;

const GuessingBarStyled = styled(GuessingBar)`
  grid-row: span 2;
`;

const ButtonArea = styled.div`
text-align: center`;

const Button = styled.button`
  border: 1px solid black;
  margin: 1rem 0;
`;

function App() {
  const [game, setGame] = useState<Game>({
    round: {
      roundNumber: 0,
      secret: 10,
      words: ["Bad", "Good"],
    },
    teams: [
      {
        name: "🟩 Team Green",
        score: 0,
      },
      {
        name: "🟥 Team Red",
        score: 0,
      },
    ],
  });

  const currentTeam = game.teams[game.round.roundNumber % game.teams.length];
  return (
    <View>
      <GuessingBarStyled />
      <ButtonArea>
        <div>{currentTeam.name} turn!</div>
        <Button>Final answer - 5</Button>
        <div>
          Team scored: <b>0</b>
        </div>
      </ButtonArea>
      <Score game={game} />
    </View>
  );
}

export default App;
