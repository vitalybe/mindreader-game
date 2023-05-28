import styled from "styled-components";
import { Constants } from "../../domain/constants.ts";
import {darken} from "polished";

const HIT_COLOR = "#00ffe2";
const HIT_PLUS_1_COLOR = "#9bceff";
const HIT_PLUS_2_COLOR = "#d4eaff";

const View = styled.div`
  grid-row: span 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const Bar = styled.div`
  display: grid;
  grid-auto-flow: row;
  border: 1px solid black;
  margin: 0.5rem 0;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: grey;
  }
`;

const Label = styled.div<{ $isHighlighted: boolean }>`
  padding: 0 0.3rem;
  margin: 0 0.5rem;
  font-weight: bold;
  text-align: center;
  background-color: ${(props) => (props.$isHighlighted ? "#ffeaae" : "white")};
  border: ${(props) =>
    props.$isHighlighted ? "1px solid red" : "1px solid black"};

  @media (prefers-color-scheme: dark) {
    background-color: hsl(44, 19%, 46%);
    border: ${(props) =>
      props.$isHighlighted ? "1px solid #770000" : "1px solid black"};
  }
`;

const Number = styled.div<{ $hitOffset: number | undefined }>`
  width: 2rem;
  height: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  text-align: center;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }

  background-color: ${(props) => {
    let darkenAmount = 0;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkenAmount = 0.5;
    }
    
    
    if (props.$hitOffset === 0) {
      return darken(darkenAmount, HIT_COLOR);
    } else if (props.$hitOffset === 1) {
      return darken(darkenAmount, HIT_PLUS_1_COLOR);
    } else if (props.$hitOffset === 2) {
      return darken(darkenAmount, HIT_PLUS_2_COLOR);
    }
  }};

  position: relative;
`;

const Hand = styled.div`
  color: #ffe336;
  text-shadow: 0 0 3px #000000;
  font-size: 2.2rem;
  position: absolute;
  top: -0.6rem;
  left: -1.9rem;
`;

export interface Props {
  startLabel: string;
  endLabel: string;
  secretNumber: number | undefined;
  guessedNumber: number | undefined;

  toHighlightWords?: boolean;

  onGuess?: (number: number) => void;

  className?: string;
}

export function GuessingBar(props: Props) {
  const numbers = Array.from(Array(Constants.MAX_GUESS_NUMBER + 1).keys()).map(
    (i) => i
  );

  const highlighted = props.toHighlightWords ?? false;
  return (
    <View className={props.className}>
      <Label $isHighlighted={highlighted}>{props.startLabel}</Label>
      <Bar>
        {numbers.map((i) => {
          return (
            <Number
              key={i}
              onClick={() => props.onGuess?.(i)}
              $hitOffset={
                props.secretNumber
                  ? Math.abs(i - props.secretNumber)
                  : undefined
              }
            >
              {i * 5}
              {i === props.guessedNumber && <Hand>➡</Hand>}
            </Number>
          );
        })}
      </Bar>
      <Label $isHighlighted={highlighted}>{props.endLabel}</Label>
    </View>
  );
}
