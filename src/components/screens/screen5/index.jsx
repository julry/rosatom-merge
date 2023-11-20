import { useState } from 'react';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import bg from '../../../assets/images/game2Bg.png';
import cooling from '../../../assets/images/cooling.png';
import medicine from '../../../assets/images/medicine.png';
import cod from '../../../assets/images/cod.png';
import home from '../../../assets/images/homeBuilding.png';
import transformer from '../../../assets/images/transformer.png';
import reactBuild from '../../../assets/images/reactBuild.png';
import turboGen from '../../../assets/images/turboGen.png';
import { ContentWrapper } from '../../shared/content-wrapper';
import { DarkenBg } from '../../shared/darken-bg';
import { Block } from '../../shared/block';
import { Text, Title } from '../../shared/texts';
import { Button } from '../../shared/button';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Board } from './board';
import { useMemo } from 'react';
import { Object } from './object';
import { useProgress } from '../../../hooks/useProgress';

const Wrapper = styled(ContentWrapper)`
    padding: calc(var(--screen_padding) * 2) calc(var(--screen_padding) * 1.5);
    background: url(${bg}) no-repeat  0 0 /cover;
`;

const AdditionalWrapper = styled(DarkenBg)`
    padding: calc(var(--screen_padding) * 1.5) var(--screen_padding);
    z-index: 12;
`;

const ButtonStyled = styled(Button)`
    margin: auto auto 0;
    z-index: ${({$isIce}) => $isIce ? 13 : 1};
`;

const ObjectsWrapper = styled.div`
    display: flex;
    margin: 0 auto calc(2 * var(--screen_padding));
`;

const ObjectStyled = styled(Object)`
    width: calc(var(--cardSize) * 69 / 110);
    height: calc(var(--cardSize) * 80 / 110);
    background-color: white;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left: calc(0px - var(--cardSize) * 27 / 110);
    z-index: calc(10 - ${({i}) => i});

    &:first-child {
        margin-left: 0;
    }
`;

export const Screen5 = () => {
    const { next } = useProgress();
    const $timeOut = useRef();
    const [shown, setShown] = useState([]);
    const [wrongRows, setWrongRows] = useState([]);
    const [wrongCols, setWrongCols] = useState([]);
    const [isBreaking, setIsBreaking] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState({
        row: [
            {
                id: 0,
                type: 'cooling',
                src: cooling,
                amount: 0,
                max: 2,
            },
            {
                id: 1,
                type: 'turboGen',
                src: turboGen,
                amount: 0,
                max: 1,
            },
            {
                id: 2,
                type: 'reactBuild',
                src: reactBuild,
                amount: 0,
                max: 2,
            },
            {
                id: 3,
                type: 'transformer',
                src: transformer,
                amount: 0,
                max: 2,
            },
        ],
        column: [
            {
                id: 0,
                src: cod,
                type: 'cod',
                amount: 0,
                max: 1,
            }, {
                id: 1,
                src: medicine,
                type: 'medicine',
                amount: 0,
                max: 2,
            },
            {
                id: 2,
                src: home,
                type: 'home',
                amount: 0,
                max: 2,
            },
        ],
    });

    const objects = useMemo(() => [...results.row, ...results.column], [results]);

    const correctText = 'Ура! У тебя получилось освоить территорию и построить ' + 
    'на ней целый комплекс необходимых объектов Росатома — АЭС, ЦОД и медицинский центр. Теперь все работает слажено!';
    const rulesText = 'Расположи объекты в правильной комбинации — сбоку подсказки!';

    const [additional, setAdditional] = useState({
        type: 'info', 
        shown: false, 
        text: rulesText
    });

    const isIce = useMemo(() => additional.shown && additional.type === 'wrong', [additional]);

    useEffect(() => {
        if ($timeOut.current) return;

        $timeOut.current = setTimeout(() => setAdditional(prev => ({...prev, shown: false})), 3500);
    }, []);

    const HTML5toTouch = {
        backends: [
            {
                id: 'html5',
                backend: HTML5Backend,
                transition: MouseTransition,
            },
            {
                id: 'touch',
                backend: TouchBackend,
                preview: true,
                transition: TouchTransition,
            },
        ],
    };
    

    const handleDrop = (item, row, col) => {
        setShown(prev => {
            const items = prev.filter(prevItem => !((prevItem.row === row && col === prevItem.col) || 
            (prevItem.row === item.row && item.col === prevItem.col)));
            const newItems = [...items, {...item, row, col}];
            setResults(prevResults => {
                const newResults = {...prevResults};

                newResults.row[row] = {
                    ...newResults.row[row], 
                    amount: newItems.filter((filtered) => filtered.row === row && filtered.type === newResults.row[row].type).length
                };
                newResults.column[col] = {
                    ...newResults.column[col], 
                    amount: newItems.filter((filtered) => filtered.col === col && filtered.type === newResults.column[col].type).length
                };

                return newResults;
            })

            return newItems;
        })
    };

    const handleCheck = () => {
        if (isChecking) return;
        const cols = results.column.reduce((wrong, resultColumn) => {
            if (resultColumn.max !== resultColumn.amount) return [...wrong, resultColumn.id];

            return wrong;
        }, []);

        const rows = results.row.reduce((wrong, resultRow) => {
            if (resultRow.max !== resultRow.amount) return [...wrong, resultRow.id];

            return wrong;
        }, []);

        if (!rows.length && !cols.length){
            setAdditional({shown: true, text: correctText, type: 'info'});
            $timeOut.current = setTimeout(() => {
                setAdditional({shown: false, text: correctText, type: 'info'});
                next();
            }, 4000);
            return;
        }

        setWrongCols(cols);
        setWrongRows(rows);
        setIsChecking(true);

        $timeOut.current = setTimeout(() => {
            setAdditional({shown: true, type: 'wrong'});
            setIsChecking(false);
            setShown([]);
            setWrongCols([]);
            setWrongRows([]);
            setResults(prev => {
                const row = prev.row.map(res => ({...res, amount: 0}));
                const column = prev.column.map(res => ({...res, amount: 0}));

                return ({row, column});
            });
        }, 2000);
    }


    const handleBrake = () => {
        setIsBreaking(true);
        setTimeout(() => {
            setAdditional((prev) => ({...prev, shown: false}));
            setIsBreaking(false);
        }, 5500);
    };

    const handleClickBtn = () => {
        if (isIce) handleBrake();
        else handleCheck();
    };

    return (
        <DndProvider options={HTML5toTouch}>
            <Wrapper>
                <ObjectsWrapper>
                    {objects.map((object, i) => (
                        <ObjectStyled key={`${object.id}_${i}`} object={object} i={i} canDrag/>
                    ))}
                </ObjectsWrapper>
                <Board
                    isIce={isIce}
                    results={results} 
                    onDrop={handleDrop} 
                    shown={shown} 
                    wrongCols={wrongCols} 
                    wrongRows={wrongRows}
                    isBreaking={isBreaking}
                />
                <ButtonStyled 
                    bg="blue" 
                    $isIce={isIce} 
                    onClick={handleClickBtn}
                    disabled={isChecking || isBreaking}
                >
                    {isIce ? 'Расколоть лед!' : 'Построить'}
                </ButtonStyled>
                {additional.shown && (
                <AdditionalWrapper>
                    {additional.type === 'info' ? (
                        <Block color='var(--main_green)'>
                            <Text>{additional.text}</Text>
                        </Block>
                    ) : (
                        <Block>
                            <Title>упс, стройка заморожена</Title>
                            <Text>
                                Что-то стоит не на своем месте. Хорошо, что ты успел собрать атомный ледокол Росатома! Разбей им лед, чтобы попробовать еще раз.
                            </Text>
                        </Block>
                        )}
                </AdditionalWrapper>
            )}
            </Wrapper>
            
        </DndProvider>
    );
};
