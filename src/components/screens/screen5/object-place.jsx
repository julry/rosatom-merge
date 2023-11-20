import styled from "styled-components";
import { useDrop } from "react-dnd"

const Wrapper = styled.td`
    width: var(--objectSize);
    height: var(--objectSize);
    border: 1px solid #FFFFE0;
`;

export const ObjectPlace = ({ col, row, onDrop, children }) => {
    const [, drop] = useDrop(
        {
            accept: 'BLOCK',
            collect: monitor => ({
                hovered: monitor.canDrop() && monitor.isOver(),
            }),
            drop: (item) => {
                if (col === item.col && row === item.row) return;
        
                onDrop(item, row, col);
            }
        }
    );

    return <Wrapper ref={drop}>{children}</Wrapper>
}