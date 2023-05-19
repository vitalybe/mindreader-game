import styled from "styled-components";
import { GuessingBar, Props as GuessingBarProps } from "../guessingBar.tsx";
import { Score } from "../score.tsx";
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
  const [round, teams] = useStore((state) => [
    state.round.roundNumber,
    state.teams,
  ]);

  return (
    <View>
      <GuessingBarStyled {...props.guessingBarProps} />
      <Content>{props.children}</Content>
      <Score roundNumber={round} teams={teams} />
    </View>
  );
}
