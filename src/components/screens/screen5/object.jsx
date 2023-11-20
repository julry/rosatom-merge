import styled from "styled-components";
import { useDrag } from "react-dnd";

const Wrapper = styled.div`
    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

export const Object = ({className, object, canDrag}) => {
    const { src } = object;

    const [, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: () => object,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [object]);

    return <Wrapper ref={canDrag ? drag : null} className={className} src={src} />;
}