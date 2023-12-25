import styled from "styled-components";
import { VK_LINK } from "../../constants";
import { openLink } from "../../utils/openLink";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { AddText, Text } from "../shared/texts";

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
    const handleBrigade = () => {
        reachMetrikaGoal('brigadeFinal');
        openLink(`${VK_LINK}?erid=2VtzqwD1eDr `);
    };

    const handleRosatom = () => {
        reachMetrikaGoal('rosatomFinal');
        openLink('https://rosatom-career.ru/?utm_source=ft&utm_medium=special&utm_campaign=hr23&utm_content=aes&erid=2VtzqwD1eDr');
    };
    
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
                    <ButtonStyled bg="red" onClick={handleBrigade}>В стройотряд</ButtonStyled>
                    <Text> 
                        {
                         'А познакомиться и стать частью Росатома можно тут:'
                        }
                    </Text>
                    <ButtonStyled bg="blue" onClick={handleRosatom}>В Росатом</ButtonStyled>
                    <AddText>Реклама. ЧАСТНОЕ УЧРЕЖДЕНИЕ «ЦЕНТР КОММУНИКАЦИЙ». ИНН 9705152344</AddText>
                </BlockStyled>
            </ContentWrapper>
            <DarkenBg />
        </>
    );
};
