import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../hooks/useProgress";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { Rules1 } from "../shared/rules1";
import { Title, Text } from "../shared/texts";
import { Timer } from "../shared/timer";

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

const TimerStyled = styled(Timer)`
    position: absolute;
    top: var(--screen_padding);
    left: var(--screen_padding);
`;

export const Screen2 = () => {
    const [isNext, setIsNext] = useState(false);
    const { next } = useProgress(); 

    const handleNext = () => {
        next();
    };

    return (
        <>
            <ContentWrapper>
                {isNext ? (
                    <>
                        <TimerStyled initialTime={150} />
                        <Rules1 onClick={handleNext}/>
                    </>
                ) : (
                    <BlockStyled>
                        <Title>Привет, боец!</Title>
                        <Text> 
                            {
                                'Сейчас мы расскажем тебе, как тут все работает: первым делом необходимо собрать все объекты, ' +
                                'а затем установить их на стройплощадке. Начнём с АЭС?'
                            }
                        </Text>
                        <ButtonStyled type="dark" bg="blue" onClick={() => setIsNext(true)}>Начать</ButtonStyled>
                        <ElementStyled> 
                            <svg width="100%" height="100%" viewBox="0 0 95 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.666667 6C0.666667 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666667 0.666667 3.05448 0.666667 6ZM6 7H84V5H6V7ZM93 16V63H95V16H93ZM84 7C88.9706 7 93 11.0294 93 16H95C95 9.92487 90.0751 5 84 5V7Z" fill="#2F8FC6"/>
                            </svg>
                        </ElementStyled>
                    </BlockStyled>
                )}
                
            </ContentWrapper>
            <DarkenBg />
        </>
    );
};
