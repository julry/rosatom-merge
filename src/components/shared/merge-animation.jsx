import gsap from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import { useEffect } from "react";

gsap.registerPlugin(MotionPathPlugin);

export const MergeAnimation = (props) => {
    useEffect(() => {
        gsap.to("#ellipse1", {
            motionPath: {
              path: "#path1",
              align: "#path1",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            transformOrigin: "50% 50%",
            duration: 2,
            repeat: -1,
            ease: "power1.inOut",
          });

        gsap.to("#ellipse2", {
            motionPath: {
                path: "#path2",
                align: "#path2",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
            },
            transformOrigin: "50% 50%",
            duration: 2,
            repeat: -1,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <svg {...props} width="117" height="108" viewBox="0 0 117 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="path1" d="M99.9836 88.924C101.757 86.8162 102.523 83.8667 102.2 80.1462C101.875 76.4174 100.459 72.0291 98.0124 67.2493C93.122 57.6953 84.2522 46.8472 72.5272 37.0345C60.8022 27.2217 48.5507 20.3932 38.2681 17.2487C33.1237 15.6755 28.545 15.0468 24.8068 15.3755C21.077 15.7034 18.2978 16.9686 16.5246 19.0763C14.7514 21.184 13.9848 24.1336 14.3086 27.8541C14.6332 31.5829 16.0491 35.9711 18.4957 40.751C23.3861 50.3049 32.256 61.153 43.981 70.9658C55.706 80.7785 67.9574 87.6071 78.2401 90.7516C83.3844 92.3248 87.9632 92.9535 91.7013 92.6248C95.4311 92.2968 98.2104 91.0317 99.9836 88.924Z" stroke="#C6FF00" strokeWidth="3"/>
            <ellipse id="ellipse1" cx="3.95122" cy="3.94091" rx="3.95122" ry="3.94091" transform="matrix(1 0 0 -1 97 78.8818)" fill="#C6FF00"/>
            <path id="path2" d="M99.9836 19.0762C101.757 21.1839 102.523 24.1335 102.2 27.8539C101.875 31.5828 100.459 35.971 98.0124 40.7508C93.122 50.3048 84.2522 61.1529 72.5272 70.9656C60.8022 80.7784 48.5507 87.607 38.2681 90.7515C33.1237 92.3246 28.545 92.9534 24.8068 92.6247C21.077 92.2967 18.2978 91.0316 16.5246 88.9238C14.7514 86.8161 13.9848 83.8665 14.3086 80.1461C14.6332 76.4172 16.0491 72.029 18.4957 67.2492C23.3861 57.6952 32.256 46.8471 43.981 37.0344C55.706 27.2216 67.9574 20.393 78.2401 17.2485C83.3844 15.6754 87.9632 15.0466 91.7013 15.3753C95.4311 15.7033 98.2104 16.9684 99.9836 19.0762Z" stroke="#C6FF00" strokeWidth="3"/>
            <ellipse id="ellipse2" cx="39.9512" cy="90.9409" rx="3.95122" ry="3.94091" fill="#C6FF00"/>
        </svg>
    );
};
