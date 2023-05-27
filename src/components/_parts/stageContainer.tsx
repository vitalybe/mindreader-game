import styled from "styled-components";
import { GuessingBar, Props as GuessingBarProps } from "./guessingBar.tsx";
import { Score } from "./score.tsx";
import { useStore } from "../../domain/store.ts";

const View = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  align-items: center;
`;

const GuessingBarStyled = styled(GuessingBar)`
  min-width: 7rem;
`;

const Content = styled.div``;

interface Props {
  guessingBarProps: GuessingBarProps;
  children: React.ReactNode;

  className?: string;
}

export function StageContainer(props: Props) {
  const round = useStore((state) => state.round.roundNumber);
  const scores = useStore((state) => {
    const teams = state.teams;
    const team1 = teams[0].name;
    const results = [{ name: team1, score: state.getTeamScore(team1) }];
    const team2 = teams[1]?.name;
    if (team2) {
      results.push({ name: team2, score: state.getTeamScore(team2) });
    }
    return results;
  });

  return (
    <View>
      <GuessingBarStyled {...props.guessingBarProps} />
      <Content>{props.children}</Content>
      <Score roundNumber={round} teamScores={scores} />
    </View>
  );
}
