import "./App.css";
import styled from "styled-components";
import {Team, useStore} from "./domain/store.ts";
import { StageWords } from "./components/stageWords.tsx";
import { StageRandomSecret } from "./components/stageRandomSecret.tsx";
import { StageGuessSecret } from "./components/stageGuessSecret.tsx";
import { StageHigherLower } from "./components/stageHigherLower.tsx";
import { StageScore } from "./components/stageScore.tsx";
import background from "./assets/background.jpg";
import { useEffect } from "react";
import { Constants } from "./domain/constants.ts";
import { StageNewGame } from "./components/stageNewGame.tsx";

const View = styled.div``;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: -1;
`;

function App() {
  const game = useStore((state) => state);

  useEffect(() => {
    if (game.teams.length) {
      localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(game));
    }
  }, [game, game.round.roundNumber]);

  const guessingTeam = game.teams[game.round.roundNumber % game.teams.length];
  let otherTeam: Team | undefined;
  if (game.teams.length > 1) {
    otherTeam = game.teams[(game.round.roundNumber + 1) % game.teams.length];
  }

  let stage = <div>N/A - Uknown state</div>;
  if (!game.teams.length) {
    stage = (
      <StageNewGame
        onChosenMode={game.newGame}
        onContinueGame={game.loadGame}
      />
    );
  } else if (!game.round.words) {
    stage = (
      <StageWords
        guessingTeam={guessingTeam.name}
        onWords={(words) => game.setWords(words)}
      />
    );
  } else if (!game.round.secret) {
    stage = (
      <StageRandomSecret
        guessingTeam={guessingTeam.name}
        words={game.round.words}
        onRandomSecret={game.setSecret}
      />
    );
  } else if (game.round.guess === undefined) {
    stage = (
      <StageGuessSecret
        playingTeam={guessingTeam.name}
        words={game.round.words}
        onGuess={game.setGuess}
      />
    );
  } else {
    if (otherTeam && game.round.otherTeamGuess === undefined) {
        stage = (
          <StageHigherLower
            words={game.round.words}
            otherTeam={otherTeam.name}
            guessedNumber={game.round.guess}
            onGuess={game.setOtherTeamGuess}
          />
        );
      } else {
        stage = (
          <StageScore
            words={game.round.words}
            guessingTeam={guessingTeam.name}
            guessedNumber={game.round.guess}
            otherTeam={otherTeam?.name}
            otherTeamGuess={game.round.otherTeamGuess}
            secretNumber={game.round.secret}
            onScore={(guessingTeamScore, otherTeamScore) => {
              game.setRoundScore(guessingTeam.name, guessingTeamScore);
              if(otherTeam) {
                game.setRoundScore(otherTeam?.name, otherTeamScore);
              }
            }}
            onNewRound={() => game.newRound()}
          />
        );
      }
  }

  return (
    <View>
      <Background src={background} />
      {stage}
    </View>
  );
}

export default App;
