import { keyframes, styled } from "styled-components";
import iceFull from '../../../assets/images/ice-full.png';
import icebreaker from '../../../assets/images/icebreaker.png';
import iceBroken from '../../../assets/images/ice-broken.png';
import { FlexWrapper } from "../../shared/flex-wrapper";
import { Object } from "./object";
import { ObjectPlace } from "./object-place";

const Wrapper = styled.div`
    width: 100%;
    --objectSize: calc(var(--cardSize) * 75 / 109);
    --wrongBorder: 2px solid #FF4C4C;
`;

const Table = styled.table`
    position: relative;
    margin-left: auto;
    border-collapse: collapse;
`;

const ResultRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: calc(var(--screen_padding) * 13 / 20);
`;

const ResultPic = styled.div`
    width: calc(100% - 0.6em - 5px);
    height: calc(100% - 0.6em - 5px);
    background: url(${({src}) => src}) no-repeat center center;
    background-size: contain;
`;

const ResultItem = styled(FlexWrapper)`
    position: relative;
    justify-content: flex-start;
    align-items: center;
    width: var(--objectSize);
    height: var(--objectSize);
`;

const BoardWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ROW_SIZE = 4;
const COLUMN_SIZE = 3;

const ResultColumn = styled.div`
    margin-left: auto;
    margin-right: var(--screen_padding);
`;

const ResultText = styled.p`
    position: absolute;
    font-size: 14px;
    bottom: 5px;

    color: ${({$isWrong}) => $isWrong ? '#FF4C4C' : 'black'};

    @media screen and (max-width: 320px) {
        font-size: 12px;
    }
`;

const TableWrapper = styled.div`
    position: relative;
    z-index: ${({$isIce}) => $isIce ? 20 : 1};
    --breakerSize: calc(var(--cardSize) * 61 / 110);
    flex-shrink: 0;
`;

const IceWrapper = styled.div`
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-size: cover;
`;

const crop = keyframes`
    0% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    100% {
        clip-path: polygon(100% 100%, 100% 0, 100% 100%, 0 100%);
    }
`;

const IceFull = styled(IceWrapper)`
    background-image: url(${iceFull});
    z-index: 5;
    animation: ${({$isAnimated}) => $isAnimated ? crop : ''} 5s both;
`;

const move = keyframes`
    0% {
        top: calc(0px - 0.6 * var(--breakerSize));
        left: calc(0px - 0.6 * var(--breakerSize));
    }

    100% {
        top: calc(100% - 0.6 * var(--breakerSize));
        left: calc(100% - 0.6 * var(--breakerSize));
    }
`;


const IceBreaker = styled.div`
    position: absolute;
    background: url(${icebreaker}) no-repeat;
    background-size: contain;
    z-index: 15;
    width: var(--breakerSize);
    height: var(--breakerSize);
    transform: scale(-1, 1);
    top: calc(0px - 0.8 * var(--breakerSize));
    left: calc(0px - 0.9 * var(--breakerSize));
    animation: ${({$isAnimated}) => $isAnimated ? move : ''} 5s forwards;
`;

const IceBroken = styled(IceWrapper)`
    background-image: url(${iceBroken});
    z-index: 2;
`;

const Wrong = styled.div`
    position: absolute;
    border: var(--wrongBorder);
`;

const WrongRow = styled(Wrong)`
    left: 0;
    right: 0;
    top: calc(${({id}) => id} * var(--objectSize));
    height: calc(var(--objectSize) + 2px);
    border-bottom: ${({$hasNext}) => $hasNext ? 'none' : 'var(--wrongBorder)'};
    border-right: ${({$hasLastCol}) => $hasLastCol ? 'none' : 'var(--wrongBorder)'};
`;

const WrongColumn = styled(Wrong)`
    top: 0;
    bottom: 0;
    left: calc(${({id}) => id} * var(--objectSize));
    width: calc(var(--objectSize) + 2px);
    border-right: ${({$hasNext}) => $hasNext ? 'none' : 'var(--wrongBorder)'};
    border-bottom: ${({$hasLastRow}) => $hasLastRow ? 'none' : 'var(--wrongBorder)'};
`;

export const Board = ({ onDrop, wrongCols, wrongRows, shown, results, isIce, isBreaking }) => {
    const rowCells = Array.from({length: ROW_SIZE}, (_, i) => i);
    const colCells = Array.from({length: COLUMN_SIZE}, (_, i) => i);

    return (
        <Wrapper>
            <ResultRow> 
                {results.column.map(({id, src, amount, max}, i) => (
                    <ResultItem key={`column_result_${id}`}>
                        <ResultPic src={src} />
                        <ResultText $isWrong={wrongCols.includes(i)}>{amount}/{max}</ResultText>
                    </ResultItem>
                ))}
            </ResultRow>
            <BoardWrapper>
                <ResultColumn> 
                    {results.row.map(({id, src, amount, max}, i) => (
                        <ResultItem key={`column_result_${id}`}>
                            <ResultPic src={src} />
                            <ResultText $isWrong={wrongRows.includes(i)}>{amount}/{max}</ResultText>
                        </ResultItem>
                    ))}
                </ResultColumn>
                <TableWrapper $isIce={isIce}>
                    <Table>
                        <tbody>
                            {rowCells.map((r) => (
                                <tr key={`row_${r}`}>
                                    {colCells.map((c) => (
                                        <ObjectPlace
                                            key={`column_${c}`} 
                                            onDrop={onDrop} 
                                            col={c} 
                                            row={r} 
                                            wrongCol={wrongCols.includes(c)}
                                            wrongRow={wrongRows.includes(r)}
                                        >
                                            {!!shown?.find(({row, col}) => row === r && col === c) && (
                                                <Object object={{...shown.find(({row, col}) => row === r && col === c)}} />
                                            )}
                                        </ObjectPlace>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {
                        isIce && (
                            <>
                                <IceFull $isAnimated={isBreaking}/>
                                <IceBroken />
                                <IceBreaker $isAnimated={isBreaking}/>
                            </>
                        )
                    }
                    {
                        wrongCols.map((col, i) => (
                            <WrongColumn 
                                key={`wrong_col_${i}`}
                                id={col} 
                                $hasNext={wrongCols?.[i + 1] - col === 1} 
                                $hasLastRow={wrongRows.includes(3)}
                            /> 
                        ))
                    }
                    {
                        wrongRows.map((row, i) => (
                            <WrongRow 
                                key={`wrong_row_${i}`}
                                id={row} 
                                $hasNext={wrongRows?.[i + 1] - row === 1} 
                                $hasLastCol={wrongCols.includes(2)}
                            /> 
                        ))
                    }
                </TableWrapper>
            </BoardWrapper>
        </Wrapper>
    );
};
