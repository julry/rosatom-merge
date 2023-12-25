import water from './assets/images/water.png';
import reactor from './assets/images/reactor.png';
import uranium from './assets/images/uranium.png';
import coil from './assets/images/coil.png';
import tvs from './assets/images/tvs.png';
import warmer from './assets/images/warmer.png';
import tvel from './assets/images/tvel.png';
import core from './assets/images/core.png';

export const FIELD_SIZE = 3;

export const rulesCards = [
    {
        id: 0,
        src: reactor
    },
    {
        id: 1,
        src: uranium
    },
    {
        id: 2,
        src: tvs
    },
    {
        id: 'rules_water_1',
        src: water
    },
    {
        id: 'rules_water_2',
        src: water
    },
    {
        id: 5,
        src: tvel
    },
    {
        id: 6,
        src: warmer
    },
    {
        id: 7,
        src: coil
    },
    {
        id: 8,
        src: core
    },
];

export const rulesCards2 = [
    {
        id: 0,
        src: reactor
    },
    {
        id: 1,
        src: uranium
    },
    {
        id: 2,
        src: tvs
    },
    {
        id: 3,
        src: ''
    },
    {
        id: 'rules_resul_2',
        src: reactor,
        isNew: true,
    },
    {
        id: 5,
        src: tvel
    },
    {
        id: 6,
        src: warmer
    },
    {
        id: 7,
        src: coil
    },
    {
        id: 8,
        src: core
    },
];

export const MERGE_ANIMATION_DURATION = 400;
export const COMPLETE_ANIMATION_DURATION = 600;

export const VK_LINK = 'https://vk.com/co_rosatom/';
export const MAIN_LINK = 'https://rosatom-career.ru/?utm_source=ft&utm_medium=special&utm_campaign=hr23&utm_content=aes';
