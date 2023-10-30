import { styled } from "styled-components";
import { FlexWrapper } from "./flex-wrapper";

export const Block = styled(FlexWrapper)`
    position: relative;
    background: ${({color}) => color ?? 'white'};
    padding: min(14px, 3.7vw);
    border-radius: 16px;
`;
