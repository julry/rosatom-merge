import { useState } from 'react';
import styled from 'styled-components';
import bg from '../../assets/images/game2Bg.png';
import { ContentWrapper } from '../shared/content-wrapper';
import { DarkenBg } from '../shared/darken-bg';
import { Block } from '../shared/block';
import { Text } from '../shared/texts';
import { Button } from '../shared/button';

const Wrapper = styled(ContentWrapper)`
    padding: calc(var(--screen_padding) * 2);
    background: url(${bg}) no-repeat  0 0 /cover;
`;

const AdditionalWrapper = styled(DarkenBg)`
    padding: calc(var(--screen_padding) * 1.5) var(--screen_padding);
    z-index: 12;
`;

const ButtonStyled = styled(Button)`
    margin: auto auto 0;
`;

export const Screen5 = () => {
    const correctText = 'Ура! У тебя получилось освоить территорию и построить ' + 
    'на ней целый комплекс необходимых объектов Росатома — АЭС, ЦОД и медицинский центр. Теперь все работает слажено!';
    const rulesText = 'Расположи объекты в правильной комбинации — сбоку подсказки!';

    const [additional, setAdditional] = useState({
        type: 'info', 
        shown: true, 
        text: correctText
    });

    return (
        <>
        <Wrapper>
            <ButtonStyled bg="blue">Построить</ButtonStyled>
        </Wrapper>
        {additional.shown && (
            <AdditionalWrapper>
                {additional.type === 'info' ? (
                    <Block color='var(--main_green)'>
                        <Text>{additional.text}</Text>
                    </Block>
                ) : null}
            </AdditionalWrapper>
        )}
        </>
        
    )
}