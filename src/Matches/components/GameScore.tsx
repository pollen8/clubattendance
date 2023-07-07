import React, {
  ChangeEvent,
  useState,
} from 'react';

import Input from '@bit/pollen8.fab-ui.input';

type TWinner = 'home' | 'visitor' | '';

export type TMatchScore = ISet[];
export interface ISet {
  home: number;
  visitors: number
}

const style = { width: '1rem', marginRight: '0.75rem', marginBottom: '0.75rem' };

const calculateWinner = (score: TMatchScore): TWinner => {
  const setWinners = score.map<TWinner>((s) => {
    if (s.home === 30) {
      return 'home';
    }
    if (s.visitors === 30) {
      return 'visitor';
    }
    if (s.home >= 21 && s.home > s.visitors) {
      return 'home';
    }
    if (s.visitors > 21 && s.visitors > s.home) {
      return 'visitor';
    }
    return '';
  });
  const homeWins = setWinners.filter((c) => c === 'home').length;
  if (homeWins === 2) {
    return 'home';
  }
  const visitorWinners = setWinners.filter((c) => c === 'visitor').length;
  if (visitorWinners === 2) {
    return 'visitor';
  }
  return '';

}

type Props = {
  onChange: (v: TMatchScore) => void;
  value: TMatchScore;
}

const GameScore = ({
  onChange,
  value,
}: Props) => {
  const [matchScore, setMatchScore] = useState<TMatchScore>(value);
  return (
    <>
      <Input style={style}
        value={matchScore[0].home}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[0].home = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}
      />
      <Input style={style}
        value={matchScore[0].visitors}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[0].visitors = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}
      />
      <br />
      <Input style={style}
        value={matchScore[1].home}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[1].home = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}
      />
      <Input style={style}
        value={matchScore[1].visitors}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[1].visitors = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}
      />
      <br />
      <Input style={style}
        value={matchScore[2].home}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[2].home = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}
      />
      <Input style={style}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const s = [...matchScore]
          s[2].visitors = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setMatchScore(s);
          onChange(s);
        }}

        value={matchScore[2].visitors} />
      <br />
      {calculateWinner(matchScore)}
    </>
  )
}

export default GameScore;
