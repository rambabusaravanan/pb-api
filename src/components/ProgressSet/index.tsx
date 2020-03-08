import React, { useState } from 'react';
import styled from "styled-components"
import ProgressBar from '../ProgressBar';

const ControlPane = styled.div`
  select, button {
    margin-right: 8px;
  }
`;

interface Props {
  buttons: Array<number>,
  bars: Array<number>,
  limit: number
}

function ProgressSet(props: Props) {

  let [selected, setSelected] = useState(0);
  let [bars, setBars] = useState(props.bars);
  const { buttons, limit } = props;


  function handleClick(value: number) {
    const result = bars[selected] + value;
    bars[selected] = result < 0 ? 0 : result;
    setBars([...bars])
  }

  return (
    <div>
      {bars.map((b, i) => <ProgressBar key={i} value={b} limit={limit} />)}
      <ControlPane>
        <select onChange={e => setSelected(parseInt(e.target.value))} value={selected}>
          {bars.map((b, i) => (
            <option key={i} value={i}>#progress{i + 1}</option>)
          )}
        </select>
        {buttons.map((b, i) => (
          <button key={i} data-testid="button" onClick={() => handleClick(b)}>
            {b > 0 ? `+${b}` : b}
          </button>
        ))}
      </ControlPane>
    </div>
  );
}

export default ProgressSet;
