import styled from "styled-components";
import { useState } from "react";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";

const ButtonArea = styled.div`
  text-align: center;
`;

interface Props {
  playingTeam: string;
  words: [string, string];

  onGuess: (number: number) => void;

  className?: string;
}

export function StageGuessSecret(props: Props) {
  const [guessedNumber, setGuessedNumber] = useState<number | undefined>();

  return (
    <StageContainer
      guessingBarProps={{
        guessedNumber: guessedNumber,
        secretNumber: undefined,
        startLabel: props.words[0],
        endLabel: props.words[1],
        onGuess: (number) => {
          setGuessedNumber(number);
        },
      }}
    >
      <Title>Team <b>{props.playingTeam}</b> - Make a guess!</Title>
      <ButtonArea>
        {guessedNumber !== undefined && (
          <Button onClick={() => props.onGuess(guessedNumber)}>
            Final answer: <b>{guessedNumber*5}</b>
          </Button>
        )}
      </ButtonArea>
    </StageContainer>
  );
}
