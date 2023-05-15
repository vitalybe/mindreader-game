import styled from "styled-components";
import { Game } from "../domain/domain.ts";

const View = styled.div``;

const Title = styled.div`
  font-weight: bold;
`;

const Team = styled.div``;

interface Props {
  game: Game;

  className?: string;
}

export function Score(props: Props) {
  return (
    <View className={props.className}>
      <Title>Round - {props.game.round.roundNumber}</Title>
      {props.game.teams.map((team) => (
        <Team key={team.name}>
          {team.name}: <b>{team.score}</b>
        </Team>
      ))}
    </View>
  );
}
