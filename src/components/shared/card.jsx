import styled from 'styled-components';
import { 
    border0, border1, border2, 
    border3, border4, border5, 
    border6, border7, border8
} from '../../assets/images/borders';

const NUMBER_TO_BORDER = { 
    0: border0,
    1: border1,
    2: border2,
    3: border3,
    4: border4,
    5: border5,
    6: border6,
    7: border7,
    8: border8,
};

const NUMBER_TO_POSITION = { 
    0: 'top: -1.5px; left: -6.5px;',
    1: 'top: -6.5px; left: -1px;',
    2: 'top: -1.5px; left: -1px;',
    3: 'top: -6.5px; left: -1px;',
    4: 'top: -6.5px; left: -1px;',
    5: 'top: -1.5px; left: -1px;',
    6: 'top: -1.5px; left: -1px;',
    7: 'top: -6.5px; left: -1px;',
    8: 'top: -1.5px; left: -1px;',
};

const Wrapper = styled.div`
    position: relative;
    width: var(--cardSize);
    height: var(--cardSize);
    border-radius: 10px;
    background-color: white;
    background-image: url(${({src}) => src});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
`;

const Border = styled.div`
    touch-action: none;
    position: absolute;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background: url(${({$number}) => NUMBER_TO_BORDER[$number]}) no-repeat 0 0;
    background-size: cover;
    ${({$number}) => NUMBER_TO_POSITION[$number]};
`;

export const Card = ({ src, number }) => (
    <Wrapper src={src}>
        <Border $number={number} />
    </Wrapper>
);
