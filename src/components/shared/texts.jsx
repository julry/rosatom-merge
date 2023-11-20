import { styled } from "styled-components";

export const Title = styled.h2`
    color: var(--main_blue);
    font-size: 20px;
    margin-bottom: min(2vw, 8px);
    text-transform: uppercase;

    @media screen and (min-width: 400px) {
        font-size: 22px;
    }

    @media screen and (max-height: 700px) {
        font-size: 20px;
    }

    @media screen and (max-height: 600px) {
        font-size: 18px;
    }

    @media screen and (max-width: 320px) {
        font-size: 16px;
    }
`;

export const Text = styled.p`
    color: black;
    font-size: 16px;

    @media screen and (max-width: 320px) {
        font-size: 13px;
    }

    @media screen and (max-height: 600px) {
        font-size: 13px;
    }
`;
