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

export const AddText = styled.p`
position: absolute;
left: var(--screen_padding);
bottom: min(5vw, 20px);
z-index: 10;
color: white;
font-family: 'Inter', 'Rosatom', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
width: max-content;
max-width: 100%;
font-size: 8px;

@media screen and (max-width: 320px) {
    font-size: 6px;
}
`;