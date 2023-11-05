import styled from 'styled-components';
import { Card } from './card';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, var(--cardSize));
    grid-template-rows: repeat(3, var(--cardSize));
    grid-gap: var(--cardGap);
`;

export const CardsField = ({ cards, className }) => {
    return (
        <Wrapper className={className}>
            {cards.map((card, n) => <Card key={card.id} {...card} number={n}/>)}
        </Wrapper>
    );
};
