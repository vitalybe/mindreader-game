import styled from "styled-components";

const View = styled.div``;

const Title = styled.div`
  font-weight: bold;
`;

const Team = styled.div``;

interface Props {
  className?: string;
}

export function Score(props: Props) {
  const team1Score = 0;
  const team2Score = 0;

  return (
    <View className={props.className}>
      <Title>Round - 5</Title>
      <Team>
        🟩 Team Green: <b>{team1Score}</b>
      </Team>
      <Team>
        🟥 Team Red: <b>{team2Score}</b>
      </Team>
    </View>
  );
}
