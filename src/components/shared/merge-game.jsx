import {useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Block } from './block';
import { CardsField } from './cards-field';
import { ContentWrapper } from './content-wrapper';
import { DarkenBg } from './darken-bg';
import { FlexWrapper } from './flex-wrapper';
import { Text } from './texts';

const Wrapper = styled(ContentWrapper)`
    padding-top: var(--screen_padding);
`;

const BlockStyled = styled(Block)`
    opacity: ${({$isShown}) => $isShown ? 1 : 0};
`;

const ResultWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--screen_padding);
    grid-template-rows: 1fr;
    width: 100%;
    margin: var(--screen_padding) 0 calc(1.8 * var(--screen_padding));
`;

const ResultCard = styled(FlexWrapper)`
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    background: white;
    padding-bottom: calc(var(--cardSize) * 6 / 109);
`;

const ResultImg = styled.div`
    width: calc(var(--cardSize) * 74 / 109);
    height: calc(var(--cardSize) * 74 / 109);
    background: url(${({src}) => src}) no-repeat center center;
    background-size: contain;
`;

const ResultAmount = styled.p`
    font-size: 14px;

    @media screen and (max-width: 330px) {
        font-size: 12px;
    };
`;

const ResultText = styled.p`
    position: absolute;
    --fontSize: 10px;
    bottom: calc(0px - var(--cardSize) * 6 / 109 - var(--fontSize));
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: var(--fontSize);
    width: max-content;

    @media screen and (max-width: 330px) {
        --fontSize: 8px;
    };
`;

const Cards = styled(CardsField)`
    margin: 0 auto;
`;


const FIELD_SIZE = 3;

export const MergeGame = (props) => {
    const { cards, onFinish } = props;
    const [finishedCards, setFinishedCards] = useState({});
    const [playingCards, setPlayingCards] = useState({
        shownCards: [],
        appearedCards: [],
        availableCards: []
    })

    const firstLvlCards = useMemo(() => cards.filter(card => card.lvl === 1), [cards]); 

    useEffect(() => {
        if (playingCards.shownCards.length) return;
        
        const initialShown = [];
        let available = [...firstLvlCards];

        const field = Array.from({length: FIELD_SIZE * FIELD_SIZE});

        for (let i = 0; i < field.length; i++) {
            const newCard = firstLvlCards[Math.floor(Math.random() * firstLvlCards.length)];
            if (initialShown.filter((card) => card.type === newCard.type).length >= newCard.max) {
                i = i - 1;
            } else {
                initialShown.push({...newCard, id: newCard.id + i});
                if (initialShown.filter((card) => card.type === newCard.type).length >= newCard.max) {
                    available = available.filter((card) => card.type !== newCard.type);
                }
            }
        }

        setPlayingCards({shownCards: initialShown, appearedCards: initialShown, availableCards: available});
    }, [firstLvlCards, playingCards.shownCards.length]);

    const handleAppearNew = (index) => {
        setPlayingCards((prev) => {
            const {availableCards, shownCards, appearedCards} = prev;
            const newShown = [...shownCards];
            const newAppeared = [...appearedCards];
            let newAvailable = [...availableCards];
            if (!availableCards.length) return prev;
            const shownFirst = shownCards.filter(card => card?.lvl === 1 && availableCards.find(({type}) => type === card.type));
           
            const pickFrom = shownFirst.length < availableCards.length && shownFirst.length > 0 ? shownFirst : availableCards;
            let randomIndex = Math.floor(Math.random() * pickFrom.length);
            let newCard = pickFrom[randomIndex];
           
            newShown[index] = newCard;
            newAppeared.push(newCard);
            if (newAppeared.filter(card => newCard?.type === card?.type).length >= newCard.max) {
                newAvailable = availableCards.filter(({type}) => type !== newCard.type);
            }
            
            return {...prev, shownCards: newShown, appearedCards: newAppeared, availableCards: newAvailable};
        });
    };

    const handleCompleteCard =  (id, number) => {
        setPlayingCards((prev) => {
            const newShown = [...prev.shownCards];
            newShown[number] = null;
            return {...prev, shownCards: newShown};
        });
        
        setFinishedCards(prev =>({...prev, [id]: (prev[id] ?? 0) + 1}));

        setTimeout(() => handleAppearNew(number), 0);
    };

    const handleMerge = (dragged, dropped) => {
        const {number: draggedNumber, type: draggedType, lvl: draggedLvl} = dragged;
        const {number: droppedNumber, type: droppedType, lvl: droppedLvl} = dropped;
        if (draggedType !== droppedType || droppedLvl !== draggedLvl) return;
        const merged = cards.find(({type, lvl}) => type === draggedType && lvl === draggedLvl + 1);
       
        setPlayingCards((prev) => {
            const newShown = [...prev.shownCards];
            newShown[draggedNumber] = null;
            newShown[droppedNumber] = merged;
            return {...prev, shownCards: newShown};
        });

        if (merged.isLast) setTimeout(() => handleCompleteCard(merged.id, dropped.number), 600);

        return true;
    };

    const handleDrop = (dragged, dropped) => {
        const wasMerged = handleMerge(dragged, dropped);
        if (wasMerged) setTimeout(() => handleAppearNew(dragged?.number), 0);
    };

    useEffect(() => {
        if (!playingCards.shownCards.filter(item => item !== null).length && !!playingCards.appearedCards.length) onFinish();
    }, [playingCards, onFinish]);

    return (
        <>
            <Wrapper>
                <BlockStyled $isShown={props.isShownBlock} color="var(--main_green)">
                    <Text>
                        Соединяй одинаковые объекты, {'\n'}чтобы получить все части АЭС.{'\n'}
                        В итоге ты должен собрать:
                    </Text>
                </BlockStyled>
                <ResultWrapper>
                    {props.results?.map((result) => (
                        <ResultCard key={result.id}>
                            <ResultImg src={result.src} />
                            <ResultAmount>{finishedCards[result.id] ?? 0}/{result.amount}</ResultAmount>
                            <ResultText>{result.text}</ResultText>
                        </ResultCard>
                    ))}
                </ResultWrapper>
                <Cards cards={playingCards.shownCards} onDrop={handleDrop}/>
            </Wrapper>
            {props.isShownDarken && <DarkenBg />}
        </>
    );
};
