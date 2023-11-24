import styled from "styled-components";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-multi-backend";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    position: relative;
    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

const PreviewStyled = styled(Wrapper)`
    width: calc(var(--cardSize) * 0.8);
    height: calc(var(--cardSize) * 0.8);
    z-index: 100;
`;

const Border = styled.div`
    position: absolute;
    border: 2px solid rgba(229, 198, 148, 1);
    inset: -1px;
`;

const DeleteBtn = styled.div`
    position: absolute;
    top: 1px;
    right: 1px;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(126, 103, 76, 1);
    border-radius: 2px;
    cursor: pointer;

    &::before, &::after {
        content: '';
        position: absolute;
        top: 0.5px;
        left: 5px;
        background: rgba(126, 103, 76, 1);
        width: 2px;
        height: 11px;
        border-radius: 2px;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }
`;

export const Object = ({className, object, canDrag, onDelete}) => {
    const { src } = object;

    const [isClicked, setIsClicked] = useState(false);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'BLOCK',
        item: () => object,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [object]);

    const ObjectPreview = () => {
        const {display, style} = usePreview();

        if (!display) {
            return <Wrapper className={className} src={src} />;
        }

        return (
            <>
                <Wrapper className={className} src={src} />
                <PreviewStyled style={style} src={src} />
            </>
        );
    };

    useEffect(() => {
        const img = new Image();
        img.src = src;
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = 90;
        ctx.canvas.height = 90;
        img.width = 80;
        img.height = 80;
  
        img.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            img.src = ctx.canvas.toDataURL();
	        preview(img);
        };
  }, [preview, src]);

    if (isDragging) return <ObjectPreview />

    return (
        <>
            <Wrapper 
                ref={canDrag ? drag : null} 
                className={className} 
                src={src} 
                $isPlaced={object.row !== undefined} 
                onClick={() => setIsClicked(prev => !prev)}
            >
                {object.row !== undefined && isClicked && (
                    <Border>
                        <DeleteBtn onClick={() => onDelete(object.row, object.col)}/>
                    </Border>
                )}
            </Wrapper>
        </>
    );
};
