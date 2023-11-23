import styled from "styled-components";
import { ContentWrapper } from "./content-wrapper";
import { DarkenBg } from "./darken-bg";

const Wrapper = styled.div`
    position: absolute;
    inset: 0;
    z-index: 30;
`;

export const Modal = ({children}) => (
    <Wrapper>
        <DarkenBg />
        <ContentWrapper>
            {children}
        </ContentWrapper>
    </Wrapper>
)