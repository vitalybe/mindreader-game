import styled from "styled-components";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";
import { HigherLower } from "../domain/store.ts";

const ButtonArea = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface Props {
  words: [string, string];
  otherTeam: string;
  guessedNumber: number;

  onGuess: (guess: HigherLower) => void;

  className?: string;
}

export function StageHigherLower(props: Props) {
  return (
    <StageContainer
      guessingBarProps={{
        guessedNumber: props.guessedNumber,
        secretNumber: undefined,
        startLabel: props.words[0],
        endLabel: props.words[1],
      }}
    >
      <Title>
        Team <b>{props.otherTeam}</b> - Guess!
      </Title>
      <ButtonArea>
        <div>
          Is it higher or lower than <b>{props.guessedNumber}</b>?
        </div>
        <Button onClick={() => props.onGuess("lower")}>
          Secret is Lower ⬆
        </Button>
        <Button onClick={() => props.onGuess("higher")}>
          Secret is Higher ⬇
        </Button>
      </ButtonArea>
    </StageContainer>
  );
}
