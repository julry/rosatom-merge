import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import clock from '../../assets/images/clock.svg';

const TimerWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: min(7.4vw, 28px);
  background: var(--main_blue);
  color: white;
`;

const Icon = styled.img`
  width: 13px;
  height: 15px;
  margin-right: 6px;
`;

const Time = styled.p`
  font-weight: 500;
  font-size: 16px;
  min-width: 2.75em;
`;

export const Timer = memo(({ className, isStart, shownTime, onFinish, initialTime = 0 }) => {
    const [time, setTime] = useState(initialTime);
    const $interval = useRef(null);
    const $time = useRef(initialTime);
    const $restart = useRef(false);

    useEffect(() => {
        if (isStart) {
            if ($restart.current) {
                $time.current = initialTime;
                $restart.current = false;
            };

            if ($interval.current) {
                clearInterval($interval.current);
                $interval.current = null;
            }

            $interval.current = setInterval(() => {
                setTime($time.current);

                if ($time.current === 0) {
                    onFinish?.();
                    clearInterval($interval.current);
                    $interval.current = null;

                    return;
                }

                $time.current -= 1;
                
            }, 1000);
        }
        if (!isStart) {
            clearInterval($interval.current);
            $interval.current = null;
            if ($time.current === 0) {
                $restart.current = true;
            };
        }

        return () => {
            if ($interval.current) {
                clearInterval($interval.current);
                $interval.current = null;
            }
        }
    }, [initialTime, isStart, onFinish]);

    const getMinutes = useCallback(() => {
       const minutes = Math.floor(time / 60);
       return minutes > 9 ? minutes : `0${minutes}`;
    }, [time]);

    const getSeconds = useCallback(() => {
        const seconds = Math.floor(time % 60);
        return seconds > 9 ? seconds : `0${seconds}`;
    }, [time]);

    return (
        <TimerWrapper className={className}>
            <Icon src={clock} alt={''}/>
            <Time> {shownTime ?? `${getMinutes()}:${getSeconds()}`}</Time>
        </TimerWrapper>
    );
});
