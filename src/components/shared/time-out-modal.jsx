import styled from "styled-components";
import { openLink } from "../../utils/openLink";
import { VK_LINK } from "../../constants";
import { Block } from "./block";
import { Button } from "./button";
import { DarkenBg } from "./darken-bg";
import { Title, Text } from "./texts";

const FinishedWrapper = styled(DarkenBg)`
    z-index: 10;
    padding: var(--screen_padding);
`;

const BlockStyled = styled(Block)`
    margin-top: min(80px, 21vw);
`;

const ButtonStyled = styled(Button)`
    margin: calc(var(--screen_padding) * 1.5) auto calc(var(--screen_padding) * 2);

    &:last-child {
        margin-bottom: 0;
    }
`;

export const TimeOutModal = ({ onRestart }) => (
    <FinishedWrapper>
        <BlockStyled>
            <Title>Время истекло...</Title>
            <Text>
                {
                    'Но всегда можно попробовать ещё раз!'
                }
            </Text>
            <ButtonStyled type="light" bg="green" onClick={onRestart}>Играть снова</ButtonStyled>
            <Text>
                {
                    'В конце стройки ты сможешь узнать все про стройотряды Росатома, ' + 
                    'но если ты уже сейчас хочешь стать бойцом, переходи по ссылке:'
                }
            </Text>
            <ButtonStyled type="dark" bg="red" onClick={() => openLink(VK_LINK)}>В стройотряд</ButtonStyled>
        </BlockStyled>
    </FinishedWrapper>
);
