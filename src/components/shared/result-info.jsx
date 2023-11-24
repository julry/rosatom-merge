import styled from "styled-components"
import { FlexWrapper } from "./flex-wrapper";

const Wrapper = styled.div`
    position: absolute;
    ${({$position}) => $position};
    background: var(--main_blue);
    border-radius: 10px;
    border: 1px solid white;
    padding: calc(var(--screen_padding) * 9 / 20) min(15px, 4vw);
    z-index: 100;
    display: flex;

    & svg {
        margin-top:  min(24px, 6.8vw);
    }
`;

const CloseBtn = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 14px;
    height: 14px;
    cursor: pointer;  

    &::before, &::after {
        content: '';
        position: absolute;
        top: 0.5px;
        left: 5px;
        background: white;
        width: 2px;
        height: 11px;
        border-radius: 2px;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    } 
`;

const Card = styled(FlexWrapper)`
    align-items: center;
    margin: 0 min(10px, 2vw);
    flex-grow: 0;

    &:last-child {
        margin-right: 0;
    }

    &:nth-child(2) {
        margin-left: 0;
    }

`;

const PictureWrapper = styled(FlexWrapper)`
    justify-content: center;
    min-height: min(48px, 13.33vw);
`;

const Picture = styled.img`
    width: ${({$width}) => $width};
    height: ${({$height}) => $height};
    object-fit: contain;
`;

const CardText = styled.p`
    font-size: ${({$mini}) => $mini ? '6px' : '7px'};
    font-weight: ${({$isLast}) => $isLast ? 700 : 400};
    color: white;
    width: max-content;
    @media screen and (max-width: 320px) {
        font-size: ${({$mini}) => $mini ? '5px' : '6px'};
    }
`;

export const ResultInfo = ({className, info, onClick}) => {
    console.log(info);
    return (
        <Wrapper className={className} $position={info?.position} >
            <CloseBtn onClick={onClick}/>
            {info?.items?.map((item, i)=> (
                <>
                    {i !== 0 && (
                        item.isLast ? (
                            <svg width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.983643" y="0.600098" width="8" height="0.8" rx="0.4" fill="white"/>
                                <rect x="0.983643" y="2.6001" width="8" height="0.8" rx="0.4" fill="white"/>
                            </svg>
                        ) : (
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.741333 2.7C0.575648 2.7 0.441333 2.83431 0.441333 3C0.441333 3.16569 0.575648 3.3 0.741333 3.3V2.7ZM8.95347 3.21213C9.07062 3.09497 9.07062 2.90503 8.95347 2.78787L7.04428 0.87868C6.92712 0.761522 6.73717 0.761522 6.62001 0.87868C6.50286 0.995837 6.50286 1.18579 6.62001 1.30294L8.31707 3L6.62001 4.69706C6.50286 4.81421 6.50286 5.00416 6.62001 5.12132C6.73717 5.23848 6.92712 5.23848 7.04428 5.12132L8.95347 3.21213ZM0.741333 3.3H8.74133V2.7H0.741333V3.3Z" fill="white"/>
                            </svg>
                        )
                    )}
                    <Card key={`${item.id}_mini`}>
                        <PictureWrapper>
                            <Picture src={item.src} $width={item.width} $height={item.height}/>
                        </PictureWrapper>
                        <CardText $isLast={item.isLast} $mini={item?.miniText}>
                            {item?.text}
                        </CardText>
                    </Card>
                </>
            ))}
        </Wrapper>
    );
    
}