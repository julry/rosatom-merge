import styled from 'styled-components';

const TYPE_TO_COLOR = {
    dark: 'white',
    light: 'black'
};

export const Wrapper = styled.button`
    outline: none;
    border: none;
    color: ${({$type}) => TYPE_TO_COLOR[$type]};
    background: var(--main_${({bg}) => bg});
    width: min(74.4vw, 279px);
    padding: min(15px, 4vw);
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;

    &:active {
        background: var(--main_${({bg}) => bg}_hovered);
    }
`;


export const Button = ({ type = 'dark', ...props }) => <Wrapper {...props} $type={type} />;
