import styled from "styled-components";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { Text } from "../shared/texts";

const BlockStyled = styled(Block)`
    margin: min(80px, 21vw) 0 min(33px, 8.8vw);
`;


const ButtonStyled = styled(Button)`
    margin: calc(var(--screen_padding) * 1.5) auto;

    &:last-child {
        margin-bottom: 0;
    }
`;


export const Screen7 = () => {
    return (
        <>
            <ContentWrapper>
                <BlockStyled>
                    <Text> 
                        {
                         'А получится ли у тебя построить реальную АЭС и другие атомные объекты? ' + 
                         'Узнай больше о стройотрядах на карьерном портале, подавай заявку на участие и стань частью истории.'
                        }
                    </Text>
                    <ButtonStyled bg="red" >В стройотряд</ButtonStyled>
                    <Text> 
                        {
                         'А познакомиться и стать частью Росатома можно тут:'
                        }
                    </Text>
                    <ButtonStyled bg="blue">В Росатом</ButtonStyled>
                </BlockStyled>
            </ContentWrapper>
            <DarkenBg />
        </>
    );
};
