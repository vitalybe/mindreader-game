import styled from "styled-components";
import { Team } from "../../domain/store.ts";

const View = styled.div``;

const Title = styled.div`
  font-weight: bold;
`;

const Team = styled.div``;

interface Props {
  roundNumber: number;
  teams: Team[];

  className?: string;
}

export function Score(props: Props) {
  const roundNumber = props.roundNumber;
  const teams = props.teams;

  return (
    <View className={props.className}>
      <Title>Round - {roundNumber}</Title>
      {teams.map((team) => (
        <Team key={team.name}>
          {team.name}: <b>{team.score}</b>
        </Team>
      ))}
    </View>
  );
}
