import { useState } from "react";
import styled from "styled-components";
import {useProgress} from "../../../hooks/useProgress";
import { MergeGame } from "../../shared/merge-game";
import { Block } from "../../shared/block";
import { Title, Text } from "../../shared/texts";
import { DarkenBg } from "../../shared/darken-bg";
import { Button } from "../../shared/button";
import { results, cards } from './constants';

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

export const Screen4 = () => {
    const { next } = useProgress();
    const [isFinished, setIsFinished] = useState(false);

    const handleNext = () => {
        next();
    }
    
    return (
        <>
            <MergeGame cards={cards} results={results} isShownDarken={!isFinished} onFinish={() => setIsFinished(true)} />
            {isFinished && (<FinishedWrapper>
                <Block>
                    <Title>Полпути пройдено!</Title>
                    <Text>
                        {
                            'Вот он, настоящий дух молодости, — ' + 
                            'на улице жаркое лето, вокруг друзья, а ты строишь будущее себе и поколениям вперёд! ' + 
                            'Немного передохнули… продолжим строить?'
                        }
                    </Text>
                    <ButtonStyled type="dark" bg="red" onClick={handleNext}>Конечно</ButtonStyled>
                    <Text>
                        {
                            'В конце стройки ты сможешь узнать все про стройотряды Росатома, ' + 
                            'но если ты уже сейчас хочешь стать бойцом, переходи по ссылке:'
                        }
                    </Text>
                    <ButtonStyled type="light" bg="green">В стройотряд</ButtonStyled>
                </Block>
            </FinishedWrapper>)}
        </>
    );
};
