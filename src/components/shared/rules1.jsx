import gsap from "gsap";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { rulesCards, rulesCards2 } from "../../constants";
import { Block } from "./block";
import { Button } from "./button";
import { CardsField } from "./cards-field";
import { Text } from "./texts";

const BlockStyled = styled(Block)`
    margin-top: min(80px, 21vw);
`;

const Cards = styled(CardsField)`
    margin: calc(var(--screen_padding) * 1.6) auto;

    & #rules_water_1 {
        z-index: 20;
    }
`;

const ButtonStyled = styled(Button)`
    margin: 0 auto;
`;

export const Rules1 = ({onClick, isSecond}) => {
    const [cards, setCards] = useState(rulesCards);
    const $animation = useRef();

    const handleChangeCards = () => {
        setCards(rulesCards2);
        setTimeout(() => setCards((prev) => prev.map(x => x.isNew ? ({...x, isNew: false}) : x)), 1500);
        setTimeout(() => setCards(rulesCards), 2500);
    }

    useEffect(() => {
        if (cards !== rulesCards) return;
        $animation.current = gsap.to('#rules_water_1', {
            x: (_, elem) => elem?.getBoundingClientRect?.().width ?? 60,
            duration: 1,
            onComplete: handleChangeCards,
            delay: 0.7
        })
    }, [cards]);
 
    return (
        <BlockStyled>
            <Text> 
                {isSecond ? 
                <>
                    <b>Находи</b> и <b>соединяй пары</b> объектов по тому же принципу, чтобы получить оставшиеся объекты для стройплощадки.
                    Постарайся собрать всё за <b>1 минуту</b>.
                </> : 
                <>
                    <b>Находи</b> и <b>соединяй пары</b> объектов на поле, чтобы получить все части АЭС.
                    Любая стройка — это ограниченные сроки, поэтому у тебя есть <b>2,5 минуты</b>. Поторопись!
                </>
                }
                
            </Text>
            <Cards cards={cards} isMini/>
            <ButtonStyled bg="blue" onClick={onClick}>Понятно</ButtonStyled>
        </BlockStyled>
    );
};
