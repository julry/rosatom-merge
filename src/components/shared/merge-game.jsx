import styled from 'styled-components';
import { Block } from './block';
import { CardsField } from './cards-field';
import { ContentWrapper } from './content-wrapper';
import { DarkenBg } from './darken-bg';
import { FlexWrapper } from './flex-wrapper';
import { Text } from './texts';

const Wrapper = styled(ContentWrapper)`
    padding-top: var(--screen_padding);
`;

const BlockStyled = styled(Block)`
    opacity: ${({$isShown}) => $isShown ? 1 : 0};
`;

const ResultWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--screen_padding);
    grid-template-rows: 1fr;
    width: 100%;
    margin: var(--screen_padding) 0 calc(1.8 * var(--screen_padding));
`;

const ResultCard = styled(FlexWrapper)`
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    background: white;
    padding-bottom: calc(var(--cardSize) * 6 / 109);
`;

const ResultImg = styled.div`
    width: calc(var(--cardSize) * 74 / 109);
    height: calc(var(--cardSize) * 74 / 109);
    background: url(${({src}) => src}) no-repeat center center;
    background-size: contain;
`;

const ResultAmount = styled.p`
    font-size: 14px;

    @media screen and (max-width: 330px) {
        font-size: 12px;
    };
`;

const ResultText = styled.p`
    position: absolute;
    --fontSize: 10px;
    bottom: calc(0px - var(--cardSize) * 6 / 109 - var(--fontSize));
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: var(--fontSize);
    width: max-content;

    @media screen and (max-width: 330px) {
        --fontSize: 8px;
    };
`;

const Cards = styled(CardsField)`
    margin: 0 auto;
`;

export const MergeGame = (props) => {

    return (
        <>
            <Wrapper>
                <BlockStyled $isShown={props.isShownBlock} color="var(--main_green)">
                    <Text>
                        Соединяй одинаковые объекты, {'\n'}чтобы получить все части АЭС.{'\n'}
                        В итоге ты должен собрать:
                    </Text>
                </BlockStyled>
                <ResultWrapper>
                    {props.results?.map((result) => (
                        <ResultCard key={result.id}>
                            <ResultImg src={result.src} />
                            <ResultAmount>0/{result.amount}</ResultAmount>
                            <ResultText>{result.text}</ResultText>
                        </ResultCard>
                    ))}
                </ResultWrapper>
                <Cards cards={props.cards} />
            </Wrapper>
            {props.isShownDarken && <DarkenBg />}
        </>
    );
};
