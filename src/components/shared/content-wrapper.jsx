import styled from 'styled-components';
import { FlexWrapper } from './flex-wrapper';

export const ContentWrapper = styled(FlexWrapper)`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 0 var(--screen_padding);
`;
