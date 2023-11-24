import styled from "styled-components";
import { Button } from "./button";

const RulesWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 12px calc(1.5 * var(--screen padding));
`;

const RulesBtn = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: min(7.4vw, 28px);
    height: min(7.4vw, 28px);
    border-radius: 10px;
    padding: 0;

    & svg {
        display: block;
        width: min(2.1vw, 8px);
        height: min(4vw, 15px);
    }
`;

export const RulesHeader = ({onClick, className}) => (
    <RulesWrapper className={className}>
        <RulesBtn bg="blue" onClick={onClick}>
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.74997 0.515625C2.42878 0.515625 0.544922 2.39948 0.544922 4.72067C0.544922 4.90654 0.61876 5.0848 0.750193 5.21624C0.881627 5.34767 1.05989 5.42151 1.24576 5.42151C1.43164 5.42151 1.6099 5.34767 1.74133 5.21624C1.87276 5.0848 1.9466 4.90654 1.9466 4.72067C1.9466 3.17321 3.20251 1.91731 4.74997 1.91731C6.29742 1.91731 7.55333 3.17321 7.55333 4.72067C7.55333 5.46566 7.37111 5.94153 7.12441 6.30947C6.87211 6.68583 6.53921 6.97738 6.1138 7.34882L6.04091 7.4126C5.60149 7.79736 5.08497 8.26061 4.6939 8.92221C4.29442 9.59852 4.04913 10.436 4.04913 11.5539V11.7291C4.04913 11.9149 4.12296 12.0932 4.2544 12.2246C4.38583 12.3561 4.56409 12.4299 4.74997 12.4299C4.93584 12.4299 5.1141 12.3561 5.24553 12.2246C5.37697 12.0932 5.45081 11.9149 5.45081 11.7291V11.5539C5.45081 10.6568 5.64354 10.0709 5.90075 9.63566C6.16707 9.18572 6.5266 8.85002 6.96392 8.46736L7.06414 8.37976C7.46082 8.03494 7.92898 7.62705 8.28851 7.09021C8.6985 6.47838 8.95501 5.72778 8.95501 4.72067C8.95501 2.39948 7.07115 0.515625 4.74997 0.515625ZM4.74997 15.4085C4.98231 15.4085 5.20514 15.3162 5.36943 15.1519C5.53372 14.9876 5.62602 14.7648 5.62602 14.5324C5.62602 14.3001 5.53372 14.0773 5.36943 13.913C5.20514 13.7487 4.98231 13.6564 4.74997 13.6564C4.51762 13.6564 4.2948 13.7487 4.1305 13.913C3.96621 14.0773 3.87391 14.3001 3.87391 14.5324C3.87391 14.7648 3.96621 14.9876 4.1305 15.1519C4.2948 15.3162 4.51762 15.4085 4.74997 15.4085Z" fill="white"/>
            </svg>
        </RulesBtn>
    </RulesWrapper>
);