import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    border: 1px solid #d9d8da;
    text-align: center;
    margin-bottom: 8px;
`

type BarProps = {
    error: boolean
}

const Bar = styled.div<BarProps>`
    position: absolute;
    background: ${p => p.error ? 'red' : '#b2d7e7'};
    width: 20%;
    height: 100%;
    transition: 0.3s all;
`;

const Text = styled.div`
    position: absolute;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;


type Props = {
    value: number;
    limit?: number;
}

function ProgressBar(props: Props) {
    const { value, limit = 100 } = props;

    const percent = Math.round((value / limit) * 100);

    const error = percent > 100;
    const width = (error ? 100 : percent) + "%"

    return <Wrapper>
        <Bar data-testid="bar" style={{ width }} error={error}></Bar>
        <Text>{width} ({value})</Text>
    </Wrapper>
}

export default ProgressBar;
