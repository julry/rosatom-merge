import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import { FIELD_SIZE } from '../../constants';
import { Card } from './card';

const Wrapper = styled.div`
    display: grid;
    --cellSize: ${({$isMini}) => $isMini ? 'calc(var(--cardSize) * 0.75)' : 'var(--cardSize)'};
    --cellGap: ${({$isMini}) => $isMini ? 'calc(var(--cardGap) * 1.4)' : 'var(--cardGap)'};
    grid-template-columns: repeat(${FIELD_SIZE}, var(--cellSize));
    grid-template-rows: repeat(${FIELD_SIZE}, var(--cellSize));
    grid-gap: var(--cellGap);
`;

export const CardsField = ({ cards, className, onDrop, isMini }) => {
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
            <Wrapper className={className} $isMini={isMini}>
                {cards.map((card, n) => (
                    <Card 
                        key={(card?.id ?? '') + n.toString()} 
                        card={card} 
                        canDrag={!!onDrop} 
                        isMini={isMini}
                        onDrop={onDrop} 
                        number={n}
                    />
                ))}
            </Wrapper>
        </DndProvider>
    );
};
