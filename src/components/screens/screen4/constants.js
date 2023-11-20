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
        id: 'cod',
        src: cod,
        text: 'ЦОД',
        amount: 1,
    }, {
        id: 'medicine',
        src: medicine,
        text: 'Мед.центр',
        amount: 1,
    },
    {
        id: 'home',
        src: home,
        text: 'Жилой корпус',
        amount: 2,
    },
    {
        id: 'icebreaker',
        src: icebreaker,
        text: 'Ледокол',
        amount: 1,
    }
];