import "./App.css";
import styled from "styled-components";
import { useStore } from "./domain/store.ts";
import { StageWords } from "./components/stageWords.tsx";
import { StageRandomSecret } from "./components/stageRandomSecret.tsx";
import { StageGuessSecret } from "./components/stageGuessSecret.tsx";
import { StageHigherLower } from "./components/stageHigherLower.tsx";
import { StageScore } from "./components/stageScore.tsx";
import background from "./assets/background.jpg";

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

  const guessingTeam = game.teams[game.round.roundNumber % game.teams.length];
  const otherTeam =
    game.teams[(game.round.roundNumber + 1) % game.teams.length];

  let stage = <div>N/A - Uknown state</div>;
  if (!game.round.words) {
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
  } else if (!game.round.guess) {
    stage = (
      <StageGuessSecret
        playingTeam={guessingTeam.name}
        words={game.round.words}
        onGuess={game.setGuess}
      />
    );
  } else if (!game.round.otherTeamGuess) {
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
        otherTeam={otherTeam.name}
        otherTeamGuess={game.round.otherTeamGuess}
        secretNumber={game.round.secret}
        onScore={(guessingTeamScore, otherTeamScore) => {
          game.setScore(guessingTeam.name, guessingTeamScore);
          game.setScore(otherTeam.name, otherTeamScore);
          game.newRound();
        }}
      />
    );
  }

  // stage = <StageWords onWords={(words) => game.setWords(words)} />;
  // stage = (
  //   <StageRandomSecret
  //     words={["bla1", "bla2"]}
  //     onRandomSecret={game.setSecret}
  //   />
  // );
  // stage = (
  //   <StageGuessSecret
  //     playingTeam={"aa"}
  //     words={["bla1", "bla2"]}
  //     onGuess={game.setGuess}
  //   />
  // );
  //
  // stage = (
  //   <StageHigherLower
  //     words={["bla1", "bla2"]}
  //     otherTeam={"Green"}
  //     guessedNumber={8}
  //     onGuess={game.setOtherTeamGuess}
  //   />
  // );
  //
  // stage = (
  //   <StageScore
  //     words={["bla1", "bla2"]}
  //     otherTeam={"Green"}
  //     guessedNumber={8}
  //     guessingTeam={"Red"}
  //     secretNumber={5}
  //     otherTeamGuess={"higher"}
  //     onScore={(guessingTeamScore, otherTeamScore) => {
  //       game.setScore(guessingTeam.name, guessingTeamScore);
  //       game.setScore(otherTeam.name, otherTeamScore);
  //     }}
  //   />
  // );

  return (
    <View>
      <Background src={background} />
      {stage}
    </View>
  );
}

export default App;
