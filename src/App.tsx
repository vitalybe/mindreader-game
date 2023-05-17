import { useState } from "react";
import "./App.css";
import { GuessingBar } from "./components/guessingBar.tsx";
import styled from "styled-components";
import { Score } from "./components/score.tsx";
import { GameEntity } from "./domain/gameEntity.tsx";

const SCORES = [4, 3, 2];

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
  text-align: center;
`;

const Button = styled.button`
  border: 1px solid black;
  margin: 1rem 0;
`;

function App() {
  const [game, setGame] = useState<GameEntity>(
    new GameEntity({
      round: {
        roundNumber: 0,
        secret: 10,
        words: ["Bad", "Good"],
        guess: undefined,
        otherTeamGuess: undefined,
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
    })
  );

  const onNewRound = () => {
    const newRound = game.newRound();
    setGame(newRound);
  }

  const [guessedNumber, setGuessedNumber] = useState<number | undefined>();

  return (
    <View>
      <GuessingBarStyled
        guessedNumber={guessedNumber}
        realNumber={game.round.secret}
        startLabel={game.round.words[0]}
        endLabel={game.round.words[1]}
      />
      <ButtonArea>
        <div>{game.currentTeam.name} turn!</div>
        {guessedNumber !== undefined && (
          <Button>Final answer - {guessedNumber}</Button>
        )}
      </ButtonArea>
      <Score game={game} />
    </View>
  );
}

export default App;
