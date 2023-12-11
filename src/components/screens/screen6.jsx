import styled from "styled-components";
import medal from "../../assets/images/medal.png";
import { useProgress } from "../../hooks/useProgress";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { Block } from "../shared/block";
import { Button } from "../shared/button";
import { ContentWrapper } from "../shared/content-wrapper";
import { DarkenBg } from "../shared/darken-bg";
import { Title, Text } from "../shared/texts";

const BlockStyled = styled(Block)`
    margin: min(80px, 21vw) 0 min(33px, 8.8vw);
`;

const Medal = styled.div`
    background: url(${medal}) no-repeat 0 0 /contain;
    width: min(21.8vw, 82px);
    height: min(117px, 31.2vw);
    margin: calc(var(--screen_padding) * 1.5) auto;
`;

const ButtonStyled = styled(Button)`
    margin: 0 auto;
`;

export const Screen6 = () => {
    const { next } = useProgress(); 

    const handleNext = () => {
        reachMetrikaGoal('finish');
        next();
    };

    return (
        <>
            <ContentWrapper>
                <BlockStyled>
                    <Title>Ты награждён{'\n'}знаком отличия!</Title>
                    <Text> 
                        {
                        'За большие личные заслуги в области развития студенческих строительных отрядов,' +
                        'высокий уровень производительности труда и качественное выполнение заданий, проявленные' +
                        'на объектах капитального строительства атомной отрасли.'
                        }
                    </Text>
                    <Medal />
                    <ButtonStyled type="light" bg="green" onClick={handleNext}>Получить</ButtonStyled>
                </BlockStyled>
            </ContentWrapper>
            <DarkenBg />
        </>
    );
};
