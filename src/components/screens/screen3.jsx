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

const FinishedWrapper = styled(DarkenBg)`
    z-index: 10;
    padding: var(--screen_padding);
`;

export const Screen3 = () => {
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
        <MergeGame cards={cards} results={results} isShownBlock isShownDarken={!isFinished}/>
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