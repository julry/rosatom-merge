import styled from 'styled-components';
import { mergeRefs } from 'react-merge-refs';
import { useDrag, useDrop } from 'react-dnd';
import { 
    border0, border1, border2, 
    border3, border4, border5, 
    border6, border7, border8
} from '../../assets/images/borders';
import { usePreview } from 'react-dnd-multi-backend';
import { MergeAnimation } from './merge-animation';
import { useEffect } from 'react';
import gsap from 'gsap';
import { COMPLETE_ANIMATION_DURATION, MERGE_ANIMATION_DURATION } from '../../constants';

const NUMBER_TO_BORDER = { 
    0: border0,
    1: border1,
    2: border2,
    3: border3,
    4: border4,
    5: border5,
    6: border6,
    7: border7,
    8: border8,
};

const NUMBER_TO_POSITION = { 
    0: 'top: -1.5px; left: -6.5px;',
    1: 'top: -6.5px; left: -1px;',
    2: 'top: -1.5px; left: -1px;',
    3: 'top: -6.5px; left: -1px;',
    4: 'top: -6.5px; left: -1px;',
    5: 'top: -1.5px; left: -1px;',
    6: 'top: -1.5px; left: -1px;',
    7: 'top: -6.5px; left: -1px;',
    8: 'top: -1.5px; left: -1px;',
};

const Wrapper = styled.div`
    position: relative;
    width: ${({$isMini}) => $isMini ? 'calc(var(--cardSize) * 0.75)' : 'var(--cardSize)'};
    height: ${({$isMini}) => $isMini ? 'calc(var(--cardSize) * 0.75)' : 'var(--cardSize)'};
    border-radius: ${({$isMini}) => $isMini ? '7px' : '10px'};
    background-color: white;
    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
`;

const Border = styled.div`
    touch-action: none;
    position: absolute;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background: url(${({$number}) => NUMBER_TO_BORDER[$number]}) no-repeat 0 0;
    background-size: cover;
    ${({$number}) => NUMBER_TO_POSITION[$number]};
`;

const StyledPreview = styled(Wrapper)`
    opacity: 0.5;
    z-index: 20;
`;

const MergeAnimationStyled = styled(MergeAnimation)`
    position: absolute;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const MergeAnimationBg = styled.div`
    position: absolute;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    opacity: 0.7;
`;

export const Card = ({ card, number, onDrop, canDrag, isMini }) => {
    useEffect(() => {
        if (card?.isLast) {
            setTimeout(() => {
                gsap.to(`#${card?.id}`, {
                    scale: 0.6,
                    duration: COMPLETE_ANIMATION_DURATION / 1000,
                });
            }, MERGE_ANIMATION_DURATION);
        }
    }, []);


    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: () => ({...card, number}),
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [card]);

    const [, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver() 
                && monitor.getItem()?.number !== number && monitor.getItem()?.type === card?.type,
        }),
        drop: (item) => {
            if (number === item.number) return;
            onDrop(item, {...card, number});
        },
    }), [card])

    const CardPreview = () => {
        const {display, style} = usePreview();

        if (!display) {
            return null;
        }

        return (
            <StyledPreview style={style} src={card?.src ?? ''}>
                <Border $number={number} />
            </StyledPreview>
        );
    };

    if (isDragging) {
        return (
            <>
                <div style={{width: 'var(--cardSize)'}} />
                <CardPreview />
            </>
        )
    }

    return (
        <Wrapper 
            ref={mergeRefs([card?.src || canDrag || !card?.isLast ? drag : null, drop])}
            id={card?.id} 
            src={card?.src ?? ''} 
            $isMini={isMini} 
            $isNew={card?.isNew}
        >
            <Border $number={number} />
            {card?.isNew && (
                <>
                <MergeAnimationBg />
                    <MergeAnimationStyled />
                </>
            )}
        </Wrapper>
    )
};
