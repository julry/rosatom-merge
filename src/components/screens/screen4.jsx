import { useState } from "react";
import styled from "styled-components";
import cooling from '../../assets/images/cooling.png';
import turboGen from '../../assets/images/turboGen.png';
import reactBuild from '../../assets/images/reactBuild.png';
import transformer from '../../assets/images/transformer.png';
import { rulesCards } from "../../constants"
import { MergeGame } from "../shared/merge-game"
import { Block } from "../shared/block";
import { Title, Text } from "../shared/texts";
import { DarkenBg } from "../shared/darken-bg";
import { Button } from "../shared/button";

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
    const [isFinished, setIsFinished] = useState(true);
    const cards = [...rulesCards];
    const results = [
        {
            id: 'result_0',
            src: cooling,
            text: 'Градильня',
            amount: 2,
        }, {
            id: 'result_1',
            src: turboGen,
            text: 'Турбогенератор',
            amount: 2,
        },
        {
            id: 'result_2',
            src: reactBuild,
            text: 'Здание реактора',
            amount: 2,
        },
        {
            id: 'result_3',
            src: transformer,
            text: 'Трансформатор',
            amount: 2,
        }
    ]
    return (
        <>
        <MergeGame cards={cards} results={results} isShownDarken={!isFinished}/>
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
                <ButtonStyled type="dark" bg="red">Конечно</ButtonStyled>
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
