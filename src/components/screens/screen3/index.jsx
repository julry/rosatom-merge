import { useState } from "react";
import styled from "styled-components";
import { cards, results } from "./constants"
import { MergeGame } from "../../shared/merge-game"
import { Block } from "../../shared/block";
import { Title, Text } from "../../shared/texts";
import { DarkenBg } from "../../shared/darken-bg";
import { useProgress } from "../../../hooks/useProgress";
import { Button } from "../../shared/button";

const FinishedWrapper = styled(DarkenBg)`
    z-index: 10;
    padding: var(--screen_padding);
`;

const BlockStyled = styled(Block)`
    margin-top: min(80px, 21vw);
`;


const ButtonStyled = styled(Button)`
    margin: calc(var(--screen_padding) * 1.5) auto 0;
`;

export const Screen3 = () => {
    const {next} = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    
    const handleNext = () => {
        next();
    };

    return (
        <>
            <MergeGame cards={cards} results={results} isShownDarken={!isFinished} onFinish={() => setIsFinished(true)}/>
            {isFinished && (
                <FinishedWrapper>
                    <BlockStyled>
                        <Title>Чего-то не хватает!</Title>
                        <Text>
                            {
                                'Росатом не только про АЭС, но и про создание инфраструктуры — центра ' +
                                'обработки данных, медицинского центра и жилых корпусов — и даже про атомный ледокол! '+
                                '\nДавай их тоже соберём!'
                            }
                        </Text>
                        <ButtonStyled onClick={handleNext} bg="blue">Начать</ButtonStyled>
                    </BlockStyled>
                </FinishedWrapper>
            )}
        </>
    );
};
