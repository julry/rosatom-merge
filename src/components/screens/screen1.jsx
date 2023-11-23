import styled from "styled-components";
import btnElement from "../../assets/images/start-button-icon.svg";
import { useProgress } from "../../hooks/useProgress";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { FlexWrapper } from "../shared/flex-wrapper";
import { Title, Text } from "../shared/texts";

const BlockStyled = styled(Block)`
    margin: min(80px, 21vw) 0 min(33px, 8.8vw);
`;

const ButtonWrapper = styled(FlexWrapper)`
    background: url(${btnElement}) center center no-repeat;
    background-size: contain;
    height: min(43.7vw, 164px);
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Screen1 = () => {
    const { next } = useProgress(); 

    return (
        <>
            <ContentWrapper>
                <BlockStyled>
                    <Title>Добро пожаловать{'\n'}в стройотряд Росатома!</Title>
                    <Text> 
                        Каждый наш объект — это важный проект и{'\u00A0'}для{'\u00A0'}компании, и{'\u00A0'}для{'\u00A0'}всей страны. 
                        Уже готов к{'\u00A0'}своему первому сезону стройки? Давай вместе попробуем построить атомную 
                        электростанцию и{'\u00A0'}другие наши объекты в{'\u00A0'}честь <b>15-летия</b> стройотрядов! 
                    </Text>
                </BlockStyled>
                <ButtonWrapper>
                    <Button type="light" bg="green" onClick={next}>Играть</Button>
                </ButtonWrapper>
            </ContentWrapper>
            <DarkenBg />
        </>
    );
};
