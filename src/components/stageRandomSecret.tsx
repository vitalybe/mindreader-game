import styled from "styled-components";
import {useEffect, useState} from "react";
import {Button, Title} from "./_parts/smallComponents.tsx";
import {StageContainer} from "./_parts/stageContainer.tsx";
import {Constants} from "../domain/constants.ts";

const ButtonArea = styled.div`
  text-align: center;
  display: flex;
  gap: 1rem;
`;

interface Props {
  words: [string, string];
  onRandomSecret: (number: number) => void;

  className?: string;
}

export function StageRandomSecret(props: Props) {
  const [randomSecret, setRandomSecret] = useState<number>();

  useEffect(() => {
    setRandomSecret(Math.floor(Math.random() * Constants.MAX_GUESS_NUMBER+1));
  }, []);

  return (
    <StageContainer
      guessingBarProps={{
        guessedNumber: randomSecret,
        secretNumber: randomSecret,
        startLabel: props.words[0],
        endLabel: props.words[1],
      }}
    >
      <Title>Think of a word!</Title>
      <ButtonArea>
        {randomSecret !== undefined && (
          <Button onClick={() => props.onRandomSecret(randomSecret)}>
            Secret number: <b>{randomSecret}</b>
          </Button>
        )}
      </ButtonArea>
    </StageContainer>
  );
}
