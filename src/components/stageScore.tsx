import styled from "styled-components";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";
import { HigherLower } from "../domain/store.ts";
import { useEffect } from "react";

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

const TeamName = styled.div`
  white-space: nowrap;
`;

const Score = styled.div`
  font-weight: bold;
`;

interface Props {
  words: [string, string];

  guessingTeamLoses: boolean;
  guessingTeam: string;
  guessedNumber: number;
  secretNumber: number;

  otherTeam: string | undefined;
  otherTeamGuess: HigherLower | undefined;

  onScore: (guessingTeamScore: number, otherTeamScore: number) => void;
  onNewRound: (toChangeRoles: boolean) => void;

  className?: string;
}

export function StageScore(props: Props) {
  const { guessingTeamScore, otherTeamScore } = calculateScore(
    props.guessedNumber,
    props.secretNumber,
    props.otherTeamGuess
  );

  let toChangeRoles = true;
  const isLosingTeamOnComeback =
    props.guessingTeamLoses && guessingTeamScore === MAX_GUESS_SCORE;
  if (isLosingTeamOnComeback) {
    toChangeRoles = false;
  }

  useEffect(() => {
    props.onScore(guessingTeamScore, otherTeamScore);
  }, []);

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
          <TeamName>Team {props.guessingTeam}:</TeamName>
          <Score>{guessingTeamScore}</Score>
          {props.otherTeam !== undefined ? (
            <>
              <TeamName>Team {props.otherTeam}:</TeamName>
              <Score>{otherTeamScore}</Score>
            </>
          ) : null}
        </ScoreCard>
        {isLosingTeamOnComeback ? (
          <div>
            Losing team {props.guessingTeam} is on a <b>COMEBACK</b> and gets a
            new round
          </div>
        ) : null}
        <Button onClick={() => props.onNewRound(toChangeRoles)}>
          New round
        </Button>
      </View>
    </StageContainer>
  );
}

function calculateScore(
  guessedNumber: number,
  secretNumber: number,
  otherTeamGuess: HigherLower | undefined
) {
  let guessingTeamScore =
    MAX_GUESS_SCORE - Math.abs(guessedNumber - secretNumber);
  if (guessingTeamScore < MIN_GUESS_SCORE) {
    guessingTeamScore = 0;
  }

  let otherTeamScore = 0;
  if (guessedNumber < secretNumber && otherTeamGuess === "higher") {
    otherTeamScore = OTHER_TEAM_SCORE;
  } else if (guessedNumber > secretNumber && otherTeamGuess === "lower") {
    otherTeamScore = OTHER_TEAM_SCORE;
  }
  return { guessingTeamScore, otherTeamScore };
}
