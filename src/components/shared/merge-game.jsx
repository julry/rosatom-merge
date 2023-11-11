import { useCallback } from 'react';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { shuffleArray } from '../../utils/shuffleArray';
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
    const { cards } = props;
    const [shownCards, setShownCards] = useState([]);
    const [finishedCards, setFinishedCards] = useState({});
    const [appearedCards, setAppearedCards] = useState([]);
    const [availableCards, setAvailableCards] = useState([])

    const firstLvlCards = useMemo(() => cards.filter(card => card.lvl === 1), [cards]); 

    useEffect(() => {
        if (shownCards.length) return;
        
        const initialShown = [];
        const field = Array.from({length: FIELD_SIZE * FIELD_SIZE});
        
        for (let i=0; i < field.length; i++) {
            const newCard = firstLvlCards[Math.floor(Math.random() * firstLvlCards.length)];
            if (initialShown.filter((card) => card.type === newCard.type).length >= newCard.max) return;
            initialShown.push({...newCard, id: newCard.id + i});
        }

        setShownCards(initialShown);
        setAppearedCards(initialShown);
        setAvailableCards(firstLvlCards);
    }, [cards, shownCards.length, firstLvlCards]);

    // const getShownSame = useCallback(() => {

    // })
    const handleAppearNew = useCallback((index) => {
        if (!availableCards.length) return;
        let randomIndex = Math.floor(Math.random() * availableCards.length);
        let newCard = availableCards[randomIndex];
        const isHasCardLvl1 = !!availableCards.filter(({type}) => shownCards.find(card => card?.type === type)).length;
        let isShownSame = shownCards.find(card => card?.type === newCard.type && card.lvl === 1);
        if (isHasCardLvl1 && !isShownSame) {
            while (!isShownSame) {
                randomIndex = randomIndex + 1 > availableCards.length - 1 ? 0 : randomIndex + 1;
                //TODO: рандомить дальше, если таких же карт нет на столе
            }
        }
        if (!isHasCardLvl1 || isShownSame) {
            setShownCards(prev => {
                const newShown = [...prev];
                newShown[index] = newCard;
                return newShown;
            });
            setAppearedCards(prev => [...prev, newCard]);
            if (appearedCards.filter(card => newCard.type === card?.type).length >= newCard.max) {
                setAvailableCards(prev => prev.filter(({type}) => type !== newCard.type));
            }
        }           
    }, [shownCards, setShownCards, availableCards, appearedCards, setAppearedCards, setAvailableCards]);

    const handleCompleteCard = useCallback((id, number) => {
        setShownCards(prev => {
            const newShown = [...prev];
            newShown[number] = null;
            return newShown
        });
        
        setFinishedCards(prev =>({...prev, [id]: (prev.id ?? 0) + 1}));

        setTimeout(() => handleAppearNew(number), 200);
    }, [setShownCards, handleAppearNew]);

    const handleMerge = useCallback((dragged, dropped) => {
        const {number: draggedNumber, type: draggedType, lvl: draggedLvl} = dragged;
        const {number: droppedNumber, type: droppedType, lvl: droppedLvl} = dropped;
        if (draggedType !== droppedType || droppedLvl !== draggedLvl) return;
        const merged = cards.find(({type, lvl}) => type === draggedType && lvl === draggedLvl + 1);
        setShownCards(prev => {
            const newShown = [...prev];
            newShown[draggedNumber] = null;
            newShown[droppedNumber] = merged;
            return newShown
        });
        
        if (merged.isLast) setTimeout(() => handleCompleteCard(merged.id, dropped.number), 200);
    }, [setShownCards, cards, handleCompleteCard]);

    const handleDrop = (dragged, dropped) => {
        handleMerge(dragged, dropped);
        setTimeout(() => handleAppearNew(dragged?.number), 200);
    };

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
                <Cards cards={shownCards} onDrop={handleDrop}/>
            </Wrapper>
            {props.isShownDarken && <DarkenBg />}
        </>
    );
};
