import styled from "styled-components";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-multi-backend";
import { useEffect } from "react";

const Wrapper = styled.div`
    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

const PreviewStyled = styled(Wrapper)`
    width: calc(var(--cardSize) * 0.8);
    height: calc(var(--cardSize) * 0.8);
    z-index: 20;
`;

export const Object = ({className, object, canDrag}) => {
    const { src } = object;

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
            <Wrapper ref={canDrag ? drag : null} className={className} src={src} />
        </>
    )
}