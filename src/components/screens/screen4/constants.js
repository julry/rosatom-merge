import apeu from '../../../assets/images/apeu.png';
import window from '../../../assets/images/window.png';
import table from '../../../assets/images/table.png';
import ice from '../../../assets/images/ice.png';
import board from '../../../assets/images/board.png';
import robe from '../../../assets/images/robe.png';
import mask from '../../../assets/images/mask.png';
import number from '../../../assets/images/number.png';
import icebreaker from '../../../assets/images/icebreaker.png';
import home from '../../../assets/images/homeBuilding.png';
import medicine from '../../../assets/images/medicine.png';
import cod from '../../../assets/images/cod.png';
import apeuMini from '../../../assets/images/apeu-mini.png';
import windowMini from '../../../assets/images/window-mini.png';
import tableMini from '../../../assets/images/table-mini.png';
import iceMini from '../../../assets/images/ice-mini.png';
import boardMini from '../../../assets/images/board-mini.png';
import robeMini from '../../../assets/images/robe-mini.png';
import maskMini from '../../../assets/images/mask-mini.png';
import numberMini from '../../../assets/images/number-mini.png';
import icebreakerMini from '../../../assets/images/icebreaker-mini.png';
import homeMini from '../../../assets/images/homeBuilding-mini.png';
import medicineMini from '../../../assets/images/medicine-mini.png';
import codMini from '../../../assets/images/cod-mini.png';

export const cards = [
    {
        id: 'number',
        type: 'number',
        lvl: 1,
        src: number,
        max: 4,
    },
    {
        id: 'mask',
        type: 'mask',
        lvl: 1,
        src: mask,
        max: 4,
    },
    {
        id: 'board',
        type: 'board',
        lvl: 1,
        src: board,
        max: 8,
    },
    {
        id: 'ice',
        type: 'ice',
        lvl: 1,
        src: ice,
        max: 4,
    },
    {
        id: 'table',
        type: 'number',
        lvl: 2,
        src: table,
    },
    {
        id: 'cod',
        type: 'number',
        lvl: 3,
        src: cod,
        isLast: true,
    },
    {
        id: 'robe',
        type: 'mask',
        lvl: 2,
        src: robe,
    },
    {
        id: 'medicine',
        type: 'mask',
        lvl: 3,
        src: medicine,
        isLast: true,
    },
    {
        id: 'window',
        type: 'board',
        lvl: 2,
        src: window,
    },
    {
        id: 'home',
        type: 'board',
        lvl: 3,
        src: home,
        isLast: true,
    },
    {
        id: 'apeu',
        type: 'ice',
        lvl: 2,
        src: apeu,
    },
    {
        id: 'icebreaker',
        type: 'ice',
        lvl: 3,
        src: icebreaker,
        isLast: true,
    }, 
];

export const results = [
    {
        id: 'result_cod',
        src: cod,
        text: 'ЦОД',
        amount: 1,
        info: {
            items: [
                {
                    id: 'number',
                    src: numberMini,
                    text: '15-летие ССО',
                    width: 'min(34px, 9.1vw)',
                    height: 'min(38px, 10.1vw)',
                },
                {
                    id: 'table',
                    type: 'number',
                    lvl: 2,
                    src: tableMini,
                    text: 'Таблица',
                    height: 'min(32px, 8.5vw)',
                    width: 'min(45px, 12vw)',
                },
                {
                    id: 'cod',
                    type: 'number',
                    lvl: 3,
                    src: codMini,
                    isLast: true,
                    text: 'ЦОД',
                    width: 'min(35px, 9.3vw)',
                    height: 'min(38px, 10.1vw)',
                },
            ],
            position: 'left: 0;'
        }
    }, {
        id: 'result_medicine',
        src: medicine,
        text: 'Мед.центр',
        amount: 1,
        info: {
            items: [
                {
                    id: 'mask',
                    src: maskMini,
                    text: 'Маска',
                    height: 'min(32px, 8.5vw)',
                    width: 'min(43px, 11.4vw)',
                },
                {
                    id: 'robe',
                    type: 'mask',
                    src: robeMini,
                    text: 'Мед. халат',
                    width: 'min(16px, 4.3vw)',
                    height: 'min(38px, 10.1vw)',
                },
                {
                    id: 'medicine',
                    src: medicineMini,
                    isLast: true,
                    text: 'Мед. центр',
                    height: 'min(38px, 10.1vw)',
                    width: 'min(42px, 11vw)',
                },
            ],
            position: 'left: 0;'
        }
    },
    {
        id: 'result_home',
        src: home,
        text: 'Жилой корпус',
        amount: 2,
        info: {
            items: [
                {
                    id: 'board',
                    src: boardMini,
                    text: 'Доска',
                    width: 'min(44px, 11.7vw)',
                    height: 'min(27px, 7.2vw)',
                },
                {
                    id: 'window',
                    src: windowMini,
                    text: 'Окно',
                    height: 'min(38px, 10.1vw)',
                    width: 'min(17px, 4.5vw)',
                },
                {
                    id: 'home',
                    src: homeMini,
                    isLast: true,
                    text: 'Жилой корпус',
                    width: 'min(36px, 9.6vw)',
                    height: 'min(38px, 10.1vw)',
                },
            ],
            position: 'right: 0;'
        }
    },
    {
        id: 'result_icebreaker',
        src: icebreaker,
        text: 'Ледокол',
        amount: 1,
        info: {
            items: [
                {
                    id: 'ice',
                    src: iceMini,
                    text: 'Лёд',
                    width: 'min(36px, 9.6vw)',
                    height: 'min(32px, 8.5vw)',
                },
                {
                    id: 'apeu',
                    src: apeuMini,
                    text: 'Атомная паротурбинная\nэнергетическая установка',
                    miniText: true,
                    height: 'min(32px, 8.5vw)',
                    width: 'min(40px, 10.6vw)',
                },
                {
                    id: 'icebreaker',
                    src: icebreakerMini,
                    isLast: true,
                    text: 'Ледокол',
                    height: 'min(32px, 8.5vw)',
                    width: 'min(43px, 11.4vw)',
                }, 
            ],
            position: 'right: 0;'
        }
    }
];