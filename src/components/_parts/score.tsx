import styled from "styled-components";

const View = styled.div``;

const Title = styled.div`
  font-weight: bold;
`;

const Team = styled.div``;

interface Props {
  roundNumber: number;
  teamScores: { name: string; score: number }[];

  className?: string;
}

export function Score(props: Props) {
  const roundNumber = props.roundNumber;

  return (
    <View className={props.className}>
      <Title>Round - {roundNumber}</Title>
      {props.teamScores.map((team) => (
        <Team key={team.name}>
          {team.name}: <b>{team.score}</b>
        </Team>
      ))}
    </View>
  );
}
