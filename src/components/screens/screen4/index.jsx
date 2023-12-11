import { useState } from "react";
import styled from "styled-components";
import {useProgress} from "../../../hooks/useProgress";
import { openLink } from "../../../utils/openLink";
import { VK_LINK } from "../../../constants";
import { MergeGame } from "../../shared/merge-game";
import { Block } from "../../shared/block";
import { Title, Text } from "../../shared/texts";
import { DarkenBg } from "../../shared/darken-bg";
import { Button } from "../../shared/button";
import { results, cards } from './constants';
import { Timer } from "../../shared/timer";

const FinishedWrapper = styled(DarkenBg)`
    z-index: 10;
    padding: var(--screen_padding);
`;

const ButtonStyled = styled(Button)`
    margin: calc(var(--screen_padding) * 1.5) auto calc(var(--screen_padding) * 2);

    &:last-child {
        margin-bottom: 0;
    }
`;

const BlockStyled = styled(Block)`
    margin-top: min(80px, 21vw);
`;

const RulesBlock = styled(Block)`
    margin-top: min(13.6vw, 62px);
`;

export const Screen4 = () => {
    const { next } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [isStart, setIsStart] = useState(true);

    const handleNext = () => {
        next();
    }
    
    return (
        <>
            <MergeGame 
                cards={cards} 
                results={results} 
                isShownDarken={!isFinished && !isStart} 
                onFinish={() => setIsFinished(true)} 
                initialTime={60}
                isSecond
            />
            {isStart && (
                <FinishedWrapper>
                    <Timer initialTime={60} />
                    <RulesBlock>
                        <Title>Чего-то не хватает!</Title>
                        <Text>
                            {
                                'Росатом не только про АЭС, но и про создание инфраструктуры — центра ' +
                                'обработки данных, медицинского центра и жилых корпусов — и даже про атомный ледокол! '+
                                '\n'
                            }
                                Постарайся собрать всё <b>за 1 минуту</b>.
                        </Text>
                        <ButtonStyled onClick={() => setIsStart(false)} bg="blue">Начать</ButtonStyled>
                    </RulesBlock>
                </FinishedWrapper>
            )}
            {isFinished && (
                <FinishedWrapper>
                    <BlockStyled>
                        <Title>Полпути пройдено!</Title>
                        <Text>
                            {
                                'Вот он, настоящий дух молодости, — ' + 
                                'на улице жаркое лето, вокруг друзья, а ты строишь будущее себе и поколениям вперёд! ' + 
                                'Немного передохнули… продолжим строить?'
                            }
                        </Text>
                        <ButtonStyled type="light" bg="green" onClick={handleNext}>Продолжить</ButtonStyled>
                        <Text>
                            {
                                'В конце стройки ты сможешь узнать все про стройотряды Росатома, ' + 
                                'но если ты уже сейчас хочешь стать бойцом, переходи по ссылке:'
                            }
                        </Text>
                        <ButtonStyled type="dark" bg="red" onClick={() => openLink(VK_LINK)}>В стройотряд</ButtonStyled>
                    </BlockStyled>
                </FinishedWrapper>
            )}
        </>
    );
};
