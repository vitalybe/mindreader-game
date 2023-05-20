import styled from "styled-components";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";
import { HigherLower } from "../domain/store.ts";

const MAX_GUESS_SCORE = 4;
const MIN_GUESS_SCORE = 2;
const OTHER_TEAM_SCORE = 1;

const View = styled.div`
  display: grid;
  align-self: center;
`;

const ScoreCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  column-gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Score = styled.div`
  font-weight: bold;
`;

interface Props {
  words: [string, string];

  guessingTeam: string;
  guessedNumber: number;
  secretNumber: number;

  otherTeam: string;
  otherTeamGuess: HigherLower | undefined;

  onScore: (guessingTeamScore: number, otherTeamScore: number) => void;

  className?: string;
}

export function StageScore(props: Props) {
  let guessingTeamScore =
    MAX_GUESS_SCORE - Math.abs(props.guessedNumber - props.secretNumber);
  if (guessingTeamScore < MIN_GUESS_SCORE) {
    guessingTeamScore = 0;
  }

  let otherTeamScore = 0;
  if (
    props.guessedNumber < props.secretNumber &&
    props.otherTeamGuess === "higher"
  ) {
    otherTeamScore = OTHER_TEAM_SCORE;
  } else if (
    props.guessedNumber > props.secretNumber &&
    props.otherTeamGuess === "lower"
  ) {
    otherTeamScore = OTHER_TEAM_SCORE;
  }

  return (
    <StageContainer
      guessingBarProps={{
        guessedNumber: props.guessedNumber,
        secretNumber: props.secretNumber,
        startLabel: props.words[0],
        endLabel: props.words[1],
      }}
    >
      <Title>Score!</Title>
      <View>
        <ScoreCard>
          <div>Team {props.guessingTeam}:</div>
          <Score>{guessingTeamScore}</Score>
          <div>Team {props.otherTeam}:</div>
          <Score>{otherTeamScore}</Score>
        </ScoreCard>
        <Button
          onClick={() => props.onScore(guessingTeamScore, otherTeamScore)}
        >
          New round
        </Button>
      </View>
    </StageContainer>
  );
}
