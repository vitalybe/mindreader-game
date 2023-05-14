import styled from "styled-components";

const MAX_VALUE = 20;
const HIT_COLOR = "#008aff";
const HIT_PLUS_1_COLOR = "#5bb2ff";
const HIT_PLUS_2_COLOR = "#a6d5ff";

const View = styled.div`
  display: grid;
  grid-auto-flow: row;
  border: 1px solid black;
`;

const Number = styled.div<{ hitOffset: number }>`
  width: 1rem;
  padding: 0.5rem;
  height: 1rem;
  font-size: 0.8rem;
  text-align: center;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }

  background-color: ${(props) => {
    if (props.hitOffset === 0) {
      return HIT_COLOR;
    } else if (props.hitOffset === 1) {
      return HIT_PLUS_1_COLOR;
    } else if (props.hitOffset === 2) {
      return HIT_PLUS_2_COLOR;
    }
  }};

  position: relative;
`;

const Hand = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 2.3rem;
`;

interface Props {}

export function GuessingBar(props: Props) {
  const numbers = Array.from(Array(MAX_VALUE).keys()).map((i) => i + 1);

  const realNumber = 10;
  const guessedNumber = 5;

  return (
    <View>
      {numbers.map((i) => {
        return (
          <>
            <Number hitOffset={Math.abs(i - realNumber)}>
              {i}
              {i === guessedNumber && <Hand>👈</Hand>}
            </Number>
          </>
        );
      })}
    </View>
  );
}
