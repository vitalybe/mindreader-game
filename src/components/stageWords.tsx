import styled from "styled-components";
import { useMemo, useState } from "react";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";
import { WORDS } from "../domain/words.ts";

const ButtonArea = styled.div`
  text-align: center;
  display: flex;
  gap: 1rem;
`;

interface Props {
  guessingTeam: string;
  adultPromptsAllowed: boolean;

  onWords: (words: [string, string]) => void;

  className?: string;
}

export function StageWords(props: Props) {
  const [words1, words2] = useMemo(() => {
    const allowedWords = WORDS.filter((word) => !word.adult || props.adultPromptsAllowed);

    const random1 = Math.floor(Math.random() * allowedWords.length);
    let random2 = Math.floor(Math.random() * allowedWords.length);
    while (random1 === random2) {
      random2 = Math.floor(Math.random() * allowedWords.length);
    }
    return [allowedWords[random1].prompt, allowedWords[random2].prompt];
  }, []);

  const [words, setWords] = useState<[string, string]>(words1);

  return (
    <StageContainer
      guessingBarProps={{
        guessedNumber: undefined,
        secretNumber: undefined,
        startLabel: words ? words[0] : "",
        endLabel: words ? words[1] : "",
        toHighlightWords: true,
      }}
    >
      <Title>
        Team <b>{props.guessingTeam}</b> - Choose words!
      </Title>
      <ButtonArea>
        <Button onClick={() => props.onWords(words)}>Accept ✅</Button>
        <Button onClick={() => setWords(words === words1 ? words2 : words1)}>
          Switch 🔁
        </Button>
      </ButtonArea>
    </StageContainer>
  );
}
