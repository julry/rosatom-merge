import { useState } from "react";
import styled from "styled-components";
import { cards, results } from "./constants"
import { MergeGame } from "../../shared/merge-game"
import { Block } from "../../shared/block";
import { Title, Text } from "../../shared/texts";
import { DarkenBg } from "../../shared/darken-bg";

const FinishedWrapper = styled(DarkenBg)`
    z-index: 10;
    padding: var(--screen_padding);
`;

export const Screen3 = () => {
    const [isFinished, setIsFinished] = useState(false);
    
    return (
        <>
        <MergeGame cards={cards} results={results} isShownBlock isShownDarken={!isFinished} onFinish={() => setIsFinished(true)}/>
        {isFinished && (<FinishedWrapper>
            <Block>
                <Title>Чего-то не хватает!</Title>
                <Text>
                    {
                        'Росатом не только про АЭС, но и про создание инфраструктуры — центра ' +
                        'обработки данных, медицинского центра и жилых корпусов — и даже про атомный ледокол! '+
                        '\nДавай их тоже соберём!'
                    }
                </Text>
            </Block>
        </FinishedWrapper>)}
        </>
    )
}