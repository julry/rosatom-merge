import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import bg from '../../../assets/images/game2Bg.png';
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
import { RulesHeader } from '../../shared/rules-header';
import { Modal } from '../../shared/modal';
import { initialResults } from './constants';

const Wrapper = styled(ContentWrapper)`
    padding: var(--screen_padding) calc(var(--screen_padding) * 1.5);
    background: url(${bg}) no-repeat  0 0 /cover;
`;

const AdditionalWrapper = styled(DarkenBg)`
    padding: calc(var(--screen_padding) * 2.8) var(--screen_padding);
    z-index: 12;
`;

const ButtonStyled = styled(Button)`
    margin: auto auto 0;
    z-index: ${({$isIce}) => $isIce ? 13 : 1};
`;

const ObjectsWrapper = styled.div`
    width: 100%;
    position: relative;
    z-index: ${({$isRules}) => $isRules ? 40 : 4};
    display: flex;
    margin: calc(0.75 * var(--screen_padding)) auto var(--screen_padding);
`;

const ButtonRulesStyled = styled(Button)`
    margin: calc(1.6 * var(--screen_padding)) auto 0;
`;

const ObjectStyled = styled(Object)`
    --objectWidth:  calc(var(--cardSize) * 69 / 110);
    width: var(--objectWidth);
    height: calc(var(--cardSize) * 80 / 110);
    background-color: white;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left: calc((100% - 7 * var(--objectWidth)) / 6);
    z-index: calc(10 - ${({i}) => i});

    &:first-child {
        margin-left: 0;
    }

    @media screen and (min-width: 640px) and (max-height: 700px) {
        --objectWidth: 55px;
        height: 55px;
    }
`;

const BlockStyled = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 56;
`;

const RulesCell = styled.div`
    position: fixed;
    z-index: 50;
    width: var(--objectSize);
    height: var(--objectSize);
    border: 1px solid #FFFFE0;
`;

const SuccessModal = styled(Block)`
    margin-top: min(80px, 21vw);
`;

export const Screen5 = () => {
    const { next } = useProgress();
    const $timeOut = useRef();
    const [shown, setShown] = useState([]);
    const [isFirstRules, setIsFirstRules] = useState(true);
    const [wrongRows, setWrongRows] = useState([]);
    const [wrongCols, setWrongCols] = useState([]);
    const [isBreaking, setIsBreaking] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isRules, setIsRules] = useState(true);
    const [results, setResults] = useState(initialResults);
    const [isTimeOut, setIsTimeOut] = useState(false);

    const $rulesRect = useRef();

    const objects = useMemo(() => [...results.row, ...results.column], [results]);

    const correctText = 'Ура! У тебя получилось освоить территорию и построить ' + 
    'на ней целый комплекс необходимых объектов Росатома — АЭС, ЦОД и медицинский центр. Теперь все работает слажено!';

    const [additional, setAdditional] = useState({
        type: 'info', 
        shown: false, 
    });

    const isIce = useMemo(() => additional.shown && additional.type === 'wrong', [additional]);

    useEffect(() => {
        function handleResize() {
            $rulesRect.current = document?.getElementById('row_3-column_0')?.getBoundingClientRect();
        }
      
        handleResize();
      
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

    const handleRestart = () => {
        if (isTimeOut) setIsTimeOut(false);
        setShown([]);
        setWrongCols([]);
        setWrongRows([]);
        setResults(prev => {
            const row = prev.row.map(res => ({...res, amount: 0}));
            const column = prev.column.map(res => ({...res, amount: 0}));

            return ({row, column});
        });
    }

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
            setAdditional({shown: true, type: 'info'});
            return;
        }

        setWrongCols(cols);
        setWrongRows(rows);
        setIsChecking(true);

        $timeOut.current = setTimeout(() => {
            setAdditional({shown: true, type: 'wrong'});
            setIsChecking(false);
            handleRestart();
        }, 2000);
    }


    const handleBrake = () => {
        setIsBreaking(true);
        setTimeout(() => {
            setAdditional((prev) => ({...prev, shown: false}));
            setIsBreaking(false);
        }, 5500);
    };

    const handleDelete = (row, col) => {
        setShown(prev => {
            const items = prev.filter(prevItem => !(prevItem.row === row && col === prevItem.col));

            setResults(prevResults => {
                const newResults = {...prevResults};

                newResults.row[row] = {
                    ...newResults.row[row], 
                    amount: items.filter((filtered) => filtered.row === row && filtered.type === newResults.row[row].type).length
                };
                newResults.column[col] = {
                    ...newResults.column[col], 
                    amount: items.filter((filtered) => filtered.col === col && filtered.type === newResults.column[col].type).length
                };

                return newResults;
            })

            return items;
        })
    };

    const handleClickRules = () => {
        if (isFirstRules) setIsFirstRules(false);
        setIsRules(true);
    }; 

    const handleTimeout = useCallback(() => {
        setIsTimeOut(true);
    }, [setIsTimeOut]);

    const isStartTimer = useMemo(() => 
        (!isRules && !additional.shown && !isTimeOut && !isChecking), 
        [isRules, additional.shown, isTimeOut, isChecking]);

    return (
        <DndProvider options={HTML5toTouch}>
            <Wrapper>
                <RulesHeader 
                    onClick={handleClickRules} 
                    initialTime={90} 
                    onRestart={handleRestart} 
                    onFinish={handleTimeout}
                    isStart={isStartTimer}
                />
                <ObjectsWrapper $isRules={isRules}>
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
                    onDelete={handleDelete}
                    isRules={isRules}
                />
                {
                    isIce ? (
                        <ButtonStyled 
                            bg="blue" 
                            $isIce 
                            onClick={handleBrake}
                            disabled={isBreaking}
                        >
                           Расколоть лёд!
                        </ButtonStyled>
                    ) : (
                        <ButtonStyled 
                            bg="blue" 
                            onClick={handleCheck}
                            disabled={isChecking}
                        >
                            Построить
                        </ButtonStyled>
                    )
                }
                
                {additional.shown && (
                <AdditionalWrapper>
                    {additional.type === 'info' ? (
                        <SuccessModal>
                            <Text>{correctText}</Text>
                            <ButtonRulesStyled bg="blue" onClick={next}>Далее</ButtonRulesStyled>
                        </SuccessModal>
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
            {isRules && (
                <Modal>
                    <BlockStyled> 
                        <Text>
                            <b>Перетаскивай на поле объекты</b> из верхней части. 
                            Расположи всё в правильной комбинации <b>за 1,5 минуты</b>. 
                            Обрати внимание на <b>подсказки по краям</b>!
                        </Text> 
                        <ButtonRulesStyled bg="blue" onClick={() => setIsRules(false)}>
                            {isFirstRules ? 'Начать' : 'Понятно'}
                        </ButtonRulesStyled>
                    </BlockStyled>
                    {isRules && (
                    <RulesCell style={{
                        top: $rulesRect?.current?.y, 
                        left: $rulesRect?.current?.x,
                        width: $rulesRect?.current?.width,
                        height: $rulesRect?.current?.height,
                    }}/>
                )}
                </Modal>
            )}
            </Wrapper>
        </DndProvider>
    );
};
