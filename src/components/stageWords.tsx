import styled from "styled-components";
import { useMemo, useState } from "react";
import {Button, Title} from "./_parts/smallComponents.tsx";
import { StageContainer } from "./_parts/stageContainer.tsx";

const ButtonArea = styled.div`
  text-align: center;
  display: flex;
  gap: 1rem;
`;

interface Props {
  guessingTeam: string;
  onWords: (words: [string, string]) => void;

  className?: string;
}

const WORDS: Array<[string, string]> = [
  ["Bad actor", "Good actor"],
  ["Basic", "Hipster"],
  ["Worthless", "Priceless"],
  ["Nature", "Nurture"],
  ["Happens slowly", "Happens suddenly"],
  ["Job", "Career"],
  ["Round", "Pointy"],
  ["Proof that God exists", "Proof that God doesn't exist"],
  ["Loved", "Hated"],
  ["The Light Side of the Force", "The Dark Side of the Force"],
  ["Stupid", "Brilliant"],
  ["Artisanal", "Mass Produced"],
  ["Nobody does it", "Everybody does it"],
  ["Short lived", "Long lived"],
  ["Dangerous job", "Safe job"],
  ["Fantasy", "Sci-Fi"],
  ["Plain", "Fancy"],
  ["Has a bad reputation", "Has a good reputation"],
  ["Ethical to eat", "Unethical to eat"],
  ["Movie", "Film"],
  ["Unfashionable", "Fashionable"],
  ["Freedom fighter", "Terrorist"],
  ["Bad superpower", "Good superpower"],
  ["Ineffective", "Effective"],
  ["Better hot", "Better cold"],
  ["Square", "Round"],
  ["Temporary", "Permanent"],
  ["Looks like a person", "Doesn't look like a person"],
  ["Uncool", "Cool"],
  ["Worst living person", "Greatest living person"],
  ["Underrated", "Overrated"],
  ["Messy food", "Clean food"],
  ["Unforgivable", "Forgivable"],
  ["Failure", "Masterpiece"],
  ["Harmless", "Harmful"],
  ["Gryffindor", "Slytherin"],
  ["Unhygienic", "Hygienic"],
  ["Bad music", "Good music"],
  ["Useless", "Useful"],
  ["Movie that Godzilla would ruin", "Movie that Godzilla would improve"],
  ["Unimportant", "Important"],
  ["Easy to spell", "Hard to spell"],
  ["Vice", "Virtue"],
  ["Underrated musician", "Overrated musician"],
  ["Unpopular activity", "Popular activity"],
  ["Divided", "Whole"],
  ["Unreliable", "Reliable"],
  ["Easy to kill", "Hard to kill"],
  ["Unstable", "Stable"],
  ["Round animal", "Pointy animal"],
  ["Bad TV show", "Good TV show"],
  ["Traditionally masculine", "Traditionally feminine"],
  ["Useless body part", "Useful body part"],
  ["Fad", "Classic"],
  ["Weak", "Strong"],
  ["Disgusting cereal", "Delicious cereal"],
  ["Bad", "Good"],
  ["Mildly addictive", "Highly addictive"],
  ["Useless in an emergency", "Useful in an emergency"],
  ["For kids", "For adults"],
  ["Villain", "Hero"],
  ["Underrated thing to do", "Overrated thing to do"],
  ["Boring", "Exciting"],
  ["Smelly in a bad way", "Smelly in a good way"],
  ["Unpopular", "Popular"],
  ["Friend", "Enemy"],
  ["Useless invention", "Useful invention"],
  ["Liberal", "Conservative"],
  ["Hot", "Cold"],
  ["Normal", "Weird"],
  ["Colorless", "Colorful"],
  ["Low calorie", "High calorie"],
  ["Easy subject", "Hard subject"],
  ["Unknown", "Famous"],
  ["Rare", "Common"],
  ["Unsexy emoji", "Sexy emoji"],
  ["Cheap", "Expensive"],
  ["Underrated weapon", "Overrated weapon"],
  ["Feels bad", "Feels good"],
  ["Inessential", "Essential"],
  ["Dirty", "Clean"],
  ["Requires luck", "Requires skill"],
  ["Flavorless", "Flavorful"],
  ["Boring topic", "Fascinating topic"],
  ["Casual", "Formal"],
  ["Underpaid", "Overpaid"],
  ["Dry", "Wet"],
  ["Underrated skill", "Overrated skill"],
  ["Forbidden", "Encouraged"],
  ["Sad song", "Happy song"],
  ["Fragile", "Durable"],
  ["Geek", "Dork"],
  ["Good", "Evil"],
  ["Worst day of the year", "Best day of the year"],
  ["Bad habit", "Good habit"],
  ["Cat person", "Dog person"],
  ["Wise", "Intelligent"],
  ["Hard to do", "Easy to do"],
  ["Mental activity", "Physical activity"],
  ["Uncontroversial topic", "Controversial topic"],
  ["Guilty pleasure", "Openly love"],
  ["Untalented", "Talented"],
  ["Hard to find", "Easy to find"],
  ["Ugly Man", "Beautiful Man"],
  ["Hard to remember", "Easy to remember"],
  ["Lowbrow", "Highbrow"],
  ["Unhealthy", "Healthy"],
  ["Bad man", "Good man"],
  ["Historically important", "Historically irrelevant"],
  ["Hairless", "Hairy"],
  ["Inflexible", "Flexible"],
  ["Normal pet", "Exotic pet"],
  ["Introvert", "Extrovert"],
  ["Book was better", "Movie was better"],
  ["Bad movie", "Good movie"],
  ["Ugly", "Beautiful"],
  ["Mature person", "Immature person"],
  ["Underrated thing to own", "Overrated thing to own"],
  ["Ordinary", "Extraordinary"],
  ["Hard to pronounce", "Easy to pronounce"],
  ["Poorly made", "Well made"],
  ["Not a sandwich", "A sandwich"],
  ["Dangerous", "Safe"],
  ["Culturally significant", "Culturally insignificant"],
  ["Optional", "Mandatory"],
  ["Underrated letter of the alphabet", "Overrated letter of the alphabet"],
  ["Low quality", "High quality"],
  ["Unsexy animal", "Sexy animal"],
  ["Quiet place", "Loud place"],
  ["Comedy", "Drama"],
  ["Need", "Want"],
  ["Dry food", "Wet food"],
  ["Replaceable", "Irreplaceable"],
  ["Worst athlete of all time", "Greatest athlete of all time"],
  ["Unethical", "Ethical"],
  ["Boring hobby", "Interesting hobby"],
  ["Bad pizza topping", "Good pizza topping"],
  ["Dystopia", "Utopia"],
  ["Rough", "Smooth"],
  ["Bad for you", "Good for you"],
  ["Peaceful", "Warlike"],
  ["Underrated Movie", "Overrated movie"],
  ["Tastes bad", "Tastes good"],
  ["Sport", "Game"],
  ["Sad movie", "Happy movie"],
  ["Waste of time", "Good use of time"],
  ["Least evil company", "Most evil company"],
  ["Snack", "Meal"],
  ["Unbelievable", "Believable"],
  ["Trashy", "Classy"],
  ["Smells bad", "Smells good"],
  ["Star Wars", "Star Trek"],
  ["Scary animal", "Nice animal"],
  ["Mainstream", "Niche"],
  ["Dark", "Light"],
  ["Underrated actor", "Overrated actor"],
  ["Difficult to use", "Easy to use"],
  ["Tired", "Wired"],
  ["80s", "90s"],
  ["Bad person", "Good person"],
  ["Sustenance", "Haute cuisine"],
  ["Soft", "Hard"],
  ["Normal thing to own", "Weird thing to own"],
  ["Straight", "Curvy"],
  ["Role model", "Bad Influence"],
  ["Useless major", "Useful major"],
  ["Mean person", "Nice person"],
  ["Action movie", "Adventure movie"],
];

export function StageWords(props: Props) {
  const [words1, words2] = useMemo(() => {
    const random1 = Math.floor(Math.random() * WORDS.length);
    let random2 = Math.floor(Math.random() * WORDS.length);
    while (random1 === random2) {
      random2 = Math.floor(Math.random() * WORDS.length);
    }
    return [WORDS[random1], WORDS[random2]];
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
