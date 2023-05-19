import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button, Title } from "./_parts/smallComponents.tsx";
import { GameMode, GameState } from "../domain/store.ts";
import { Constants } from "../domain/constants.ts";

const View = styled.div`
  display: grid;
  justify-items: center;
  width: 100vw;
`;

const ButtonArea = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface Props {
  onChosenMode: (gameMode: GameMode) => void;
  onContinueGame: (game: GameState) => void;

  className?: string;
}

export function StageNewGame(props: Props) {
  const [savedGame, setSavedGame] = useState<GameState>();

  useEffect(() => {
    const gameString = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);
    if (gameString) {
      setSavedGame(JSON.parse(gameString));
    }
  }, []);

  return (
    <View>
      <Title>
        Mindreader
      </Title>
      <ButtonArea>
        <Button
          disabled={!savedGame}
          onClick={() => savedGame && props.onContinueGame(savedGame)}>
          Continue Game
        </Button>
        <Button onClick={() => props.onChosenMode(GameMode.ONE_GROUP)}>
          1 Group
        </Button>
        <Button onClick={() => props.onChosenMode(GameMode.TWO_GROUPS)}>
          2 Groups
        </Button>
      </ButtonArea>
    </View>
  );
}
