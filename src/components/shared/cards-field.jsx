import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import {FIELD_SIZE} from '../../constants';
import { Card } from './card';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${FIELD_SIZE}, var(--cardSize));
    grid-template-rows: repeat(${FIELD_SIZE}, var(--cardSize));
    grid-gap: var(--cardGap);
`;

export const CardsField = ({ cards, className, onDrop }) => {
    const HTML5toTouch = {
        backends: [
            {
                id: 'html5',
                backend: HTML5Backend,
                transition: MouseTransition,
            },
            {
                id: 'touch',
                backend: TouchBackend,
                preview: true,
                transition: TouchTransition,
            },
        ],
    };
    
    return (
        <DndProvider options={HTML5toTouch}>
            <Wrapper className={className}>
                {cards.map((card, n) => <Card key={(card?.id ?? '') + n.toString()} card={card} onDrop={onDrop} number={n}/>)}
            </Wrapper>
        </DndProvider>
    );
};
