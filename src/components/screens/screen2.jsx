import styled from "styled-components";
import { rulesCards } from "../../constants";
import { useProgress } from "../../hooks/useProgress";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { CardsField } from "../shared/cards-field";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { Title, Text } from "../shared/texts";

const BlockStyled = styled(Block)`
    margin-top: min(80px, 21vw);
`;

const ButtonStyled= styled(Button)`
    margin: min(8.5vw, 32px) auto 0;
`;

const ElementStyled = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    width: min(23vw, 88px); 
    height: min(15.2vw, 57px); 
`;

const CardsWrapperStyled = styled(CardsField)`
    position: absolute;
    z-index: 0;
    bottom: min(79px, 21vw);
    left: 50%;
    transform: translateX(-50%);
`;

export const Screen2 = () => {
    const { next } = useProgress(); 

    return (
        <>
            <ContentWrapper>
                <BlockStyled>
                    <Title>Привет, боец!</Title>
                    <Text> 
                        {
                            'Сейчас мы расскажем тебе, как тут все работает: первым делом необходимо собрать все объекты, ' +
                            'а затем установить их на стройплощадке. Начнем с АЭС?'
                        }
                    </Text>
                    <ButtonStyled type="dark" bg="blue" onClick={next}>Начнем</ButtonStyled>
                    <ElementStyled> 
                        <svg width="100%" height="100%" viewBox="0 0 95 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.666667 6C0.666667 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666667 0.666667 3.05448 0.666667 6ZM6 7H84V5H6V7ZM93 16V63H95V16H93ZM84 7C88.9706 7 93 11.0294 93 16H95C95 9.92487 90.0751 5 84 5V7Z" fill="#2F8FC6"/>
                        </svg>
                    </ElementStyled>
                </BlockStyled>
            </ContentWrapper>
            <CardsWrapperStyled cards={rulesCards} />
            <DarkenBg />
        </>
    );
};
