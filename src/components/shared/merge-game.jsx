import gsap from 'gsap';
import { useCallback } from 'react';
import {useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { COMPLETE_ANIMATION_DURATION, MERGE_ANIMATION_DURATION } from '../../constants';
import { CardsField } from './cards-field';
import { ContentWrapper } from './content-wrapper';
import { DarkenBg } from './darken-bg';
import { FlexWrapper } from './flex-wrapper';
import { Modal } from './modal';
import { ResultInfo } from './result-info';
import { RulesHeader } from './rules-header';
import {Rules1} from './rules1';

const Wrapper = styled(ContentWrapper)`
    padding-top: var(--screen_padding);
    --infoHeight: min(110px, 26.6vw);

    @media screen and (min-width: 640px) and (max-height: 630px) {
        --infoHeight: 80px;
    }

    @media screen and (min-width: 640px) and (max-height: 600px) {
        --infoHeight: 50px;
    }

    @media screen and (min-width: 640px) and (max-height: 570px) {
        --infoHeight: calc(2 * var(--screen_padding));
    }
`;

const ResultWrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--screen_padding);
    grid-template-rows: 1fr;
    width: 100%;
    margin: var(--screen_padding) 0 var(--infoHeight);
    --fontSize: 10px;
`;

const ResultCard = styled(FlexWrapper)`
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    background: white;
    padding-bottom: calc(var(--cardSize) * 6 / 109);
    ${({$clicked}) => $clicked ? 'z-index: 20' : ''};
    cursor: pointer;
`;

const ResultImg = styled.div`
    width: calc(var(--cardSize) * 74 / 109);
    height: calc(var(--cardSize) * 74 / 109);
    background: url(${({src}) => src}) no-repeat center center;
    background-size: contain;
`;

const ResultInfoStyled = styled(ResultInfo)`
    top: calc(100% + 1.7*var(--fontSize) + 4px);

    @media screen and (max-width: 330px) {
        top: calc(100% + 1.7*var(--fontSize));
    }
`;

const ResultAmount = styled.p`
    font-size: 14px;

    @media screen and (max-width: 330px) {
        font-size: 12px;
    };
`;

const ResultText = styled.p`
    position: absolute;
    --bottomValue:  calc(0px - var(--cardSize) * 6 / 109 - var(--fontSize) - 2px);
    bottom: var(--bottomValue);
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

    &::before {
        content: '';
        position: absolute;
        opacity: ${({$clicked}) => $clicked ? 1 : 0};
        background: var(--main_blue); 
        border: 1px solid white; 
        border-radius: 8px 8px 0 0; 
        padding: 2px;
        top: -4px;
        left: -4px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        z-index: -4;
    }
`;

const Cards = styled(CardsField)`
    margin: 0 auto;
`;

const RulesHeaderStyled = styled(RulesHeader)`
    ${({$clicked}) => $clicked ? 'z-index: 20' : ''};
`;

const FIELD_SIZE = 3;

export const MergeGame = (props) => {
    const { cards, onFinish } = props;
    const [isRules, setIsRules] = useState(false);
    const [finishedCards, setFinishedCards] = useState({});
    const [playingCards, setPlayingCards] = useState({
        shownCards: [],
        appearedCards: [],
        availableCards: []
    });
    const [resultClicked, setResultClicked] = useState('');
    const [resultCoordinates, setResultCoordinates] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);

    const firstLvlCards = useMemo(() => cards?.filter(card => card.lvl === 1), [cards]); 

    useEffect(() => {
        if (playingCards.shownCards?.length) return;
        setResultCoordinates(props.results?.reduce((prev, { id, type }) => ({
            ...prev, 
            [type]: [document.getElementById(id).getBoundingClientRect().x, document.getElementById(id).getBoundingClientRect().y]
        }), {}));

        const initialShown = [];
        let available = [...firstLvlCards];

        const field = Array.from({length: FIELD_SIZE * FIELD_SIZE});

        for (let i = 0; i < field.length; i++) {
            const newCard = firstLvlCards[Math.floor(Math.random() * firstLvlCards.length)];
            if (initialShown?.filter((card) => card.type === newCard.type).length >= newCard.max) {
                i = i - 1;
            } else {
                initialShown.push({...newCard, id: newCard.id + i});
                if (initialShown?.filter((card) => card.type === newCard.type).length >= newCard.max) {
                    available = available?.filter((card) => card.type !== newCard.type);
                }
            }
        }

        setPlayingCards({shownCards: initialShown, appearedCards: initialShown, availableCards: available});
    }, [firstLvlCards, playingCards.shownCards?.length, props.results, props.initialTime]);

    const handleAppearNew = (index) => {
        setPlayingCards((prev) => {
            const {availableCards, shownCards, appearedCards} = prev;
            const newShown = [...shownCards];
            const newAppeared = [...appearedCards];
            let newAvailable = [...availableCards];
            if (!availableCards.length) return prev;
            const shownFirst = shownCards?.filter(card => card?.lvl === 1 && availableCards.find(({type}) => type === card.type));
           
            const pickFrom = shownFirst.length < availableCards.length && shownFirst.length > 0 ? shownFirst : availableCards;
            let randomIndex = Math.floor(Math.random() * pickFrom.length);
            let newCard = pickFrom[randomIndex];
           
            newShown[index] = newCard;
            newAppeared.push(newCard);
            if (newAppeared?.filter(card => newCard?.type === card?.type).length >= newCard.max) {
                newAvailable = availableCards?.filter(({type}) => type !== newCard.type);
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
        setFinishedCards(prev =>({...prev, [`result_${id}`]: (prev[`result_${id}`] ?? 0) + 1}));
        gsap.to(`#result_${id}`, {
            scale: 1.2,
            duration: COMPLETE_ANIMATION_DURATION / 1000,
            repeat: 1,
            yoyo: true
        });

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
            newShown[droppedNumber] = {...merged, isNew: true};
            if (newShown?.filter(shown => !!shown).length < 2) setIsFinished(true);
            return {...prev, shownCards: newShown};
        });

        setTimeout(() => {
            setPlayingCards((prev) => {
                const newShown = [...prev.shownCards];
                newShown[droppedNumber] = {...newShown[droppedNumber], isNew: false};
                return {...prev, shownCards: newShown};
            });
        }, MERGE_ANIMATION_DURATION);

        if (merged.isLast) setTimeout(
            () => handleCompleteCard(merged.id, dropped.number), 
            MERGE_ANIMATION_DURATION + COMPLETE_ANIMATION_DURATION
        );

        return true;
    };

    const handleDrop = (dragged, dropped) => {
        const wasMerged = handleMerge(dragged, dropped);
        if (wasMerged) setTimeout(() => handleAppearNew(dragged?.number), 0);
    };

    useEffect(() => {
        if (!playingCards.shownCards?.filter(item => item !== null).length && !!playingCards.appearedCards.length) onFinish();
    }, [playingCards, onFinish]);

    const handleClickResult = (e, id) => {
        e.stopPropagation();
        setResultClicked(id);
    };

    const handleRestart = useCallback(() => {
        setIsTimeOut(false);

        setPlayingCards({
            shownCards: [],
            appearedCards: [],
            availableCards: []
        });
        
    }, [setPlayingCards, setIsTimeOut]);

    const handleTimeout = useCallback(() => {
        setIsTimeOut(true);
    }, [setIsTimeOut]);

    const isStartTimer = useMemo(() => 
        (!isRules && !resultClicked && props.isShownDarken && !isFinished && !isTimeOut), 
        [isRules, resultClicked, props.isShownDarken, isFinished, isTimeOut]);

    return (
        <>
            <Wrapper>
                <RulesHeaderStyled 
                    onClick={() => setIsRules(true)} 
                    $clicked={resultClicked} 
                    initialTime={props.initialTime} 
                    isStart={isStartTimer}
                    onFinish={handleTimeout}
                    onRestart={handleRestart}
                />
                <ResultWrapper>
                    {props.results?.map((result, i) => (
                        <ResultCard 
                            key={result.id} 
                            id={result.id}
                            $clicked={resultClicked === result.id}
                            onClick={(e) => handleClickResult(e, result.id)}
                        >
                            <ResultImg src={result.src} />
                            <ResultAmount>{finishedCards[result.id] ?? 0}/{result.amount}</ResultAmount>
                            <ResultText $clicked={resultClicked === result.id}>
                                {result.text}
                            </ResultText>
                        </ResultCard>
                    ))}
                    {resultClicked && (
                        <>
                            <ResultInfoStyled 
                                info={props.results.find(res => res.id === resultClicked)?.info} 
                                onClick={() => setResultClicked('')}
                            />
                        </>
                    )}
                </ResultWrapper>
                {resultClicked && <DarkenBg onClick={() => setResultClicked('')}/>}
                <Cards cards={playingCards.shownCards} onDrop={handleDrop} coordinates={resultCoordinates}/>
            </Wrapper>
            {(props.isShownDarken && !isRules && !resultClicked) && <DarkenBg />}
            {isRules && (
                <Modal>
                    <Rules1 onClick={() => setIsRules(false)} isSecond={props.isSecond}/>
                </Modal>
            )}
        </>
    );
};
