import rotor from '../../../assets/images/rotor.png';
import uranium from '../../../assets/images/uranium.png';
import steam from '../../../assets/images/steamMaker.png';
import coil from '../../../assets/images/coil.png';
import tvel from '../../../assets/images/tvel.png';
import tvs from '../../../assets/images/tvs.png';
import water from '../../../assets/images/water.png';
import reactor from '../../../assets/images/reactor.png';
import reactBuild from '../../../assets/images/reactBuild.png';
import warmer from '../../../assets/images/warmer.png';
import turbine from '../../../assets/images/turbine.png';
import turboGen from '../../../assets/images/turboGen.png';
import core from '../../../assets/images/core.png';
import transformer from '../../../assets/images/transformer.png';
import cooling from '../../../assets/images/cooling.png';
import rotorMini from '../../../assets/images/rotor-mini.png';
import uraniumMini from '../../../assets/images/uranium-mini.png';
import steamMini from '../../../assets/images/steamMaker-mini.png';
import coilMini from '../../../assets/images/coil-mini.png';
import tvelMini from '../../../assets/images/tvel-mini.png';
import tvsMini from '../../../assets/images/tvs-mini.png';
import waterMini from '../../../assets/images/water-mini.png';
import reactorMini from '../../../assets/images/reactor-mini.png';
import reactBuildMini from '../../../assets/images/reactBuild-mini.png';
import warmerMini from '../../../assets/images/warmer-mini.png';
import turbineMini from '../../../assets/images/turbine-mini.png';
import turboGenMini from '../../../assets/images/turboGen-mini.png';
import coreMini from '../../../assets/images/core-mini.png';
import transformerMini from '../../../assets/images/transformer-mini.png';
import coolingMini from '../../../assets/images/cooling-mini.png';

export const cards = [
    {
        id: 'uranium',
        type: 'uranium',
        lvl: 1,
        src: uranium,
        max: 32,
    },
    {
        id: 'rotor',
        type: 'rotor',
        lvl: 1,
        src: rotor,
        max: 8,
    },
    {
        id: 'coil',
        type: 'coil',
        lvl: 1,
        src: coil,
        max: 8,
    },
    {
        id: 'water',
        type: 'water',
        lvl: 1,
        src: water,
        max: 16,
    },
    {
        id: 'tvel',
        type: 'uranium',
        lvl: 2,
        src: tvel,
    },
    {
        id: 'tvs',
        type: 'uranium',
        lvl: 3,
        src: tvs,
    },
    {
        id: 'reactor',
        type: 'uranium',
        lvl: 4,
        src: reactor,
    },
    {
        id: 'reactBuild',
        type: 'uranium',
        lvl: 5,
        isLast: true,
        src: reactBuild,
    },
    {
        id: 'warmer',
        type: 'water',
        lvl: 2,
        src: warmer,
    },
    {
        id: 'steam',
        type: 'water',
        lvl: 3,
        src: steam,
    },
    {
        id: 'cooling',
        type: 'water',
        lvl: 4,
        src: cooling,
        isLast: true,
    },
    {
        id: 'turbine',
        type: 'rotor',
        lvl: 2,
        src: turbine,
    },
    {
        id: 'turboGen',
        type: 'rotor',
        lvl: 3,
        src: turboGen,
        isLast: true,
    },
    {
        id: 'core',
        type: 'coil',
        lvl: 2,
        src: core,
    },
    {
        id: 'transformer',
        type: 'coil',
        lvl: 3,
        src: transformer,
        isLast: true,
    }, 
];

export const results = [
    {
        id: 'result_cooling',
        src: cooling,
        type: 'water',
        text: 'Градирня',
        amount: 2,
        info: {
            items: [
                {
                    id: 'water',
                    lvl: 1,
                    src: waterMini,
                    width: 'min(41px, 10.9vw)',
                    height: 'min(31px, 8.26vw)',
                    text: 'Вода'
                },
                {
                    id: 'warmer',
                    lvl: 2,
                    src: warmerMini,
                    width: 'min(34px, 9.1vw)',
                    height: 'min(34px, 9.1vw)',
                    text: 'Теплоноситель'
                },
                {
                    id: 'steam',
                    lvl: 3,
                    src: steamMini,
                    width: 'min(31px, 8.26vw)',
                    height: 'min(39px, 10.4vw)',
                    text: 'Парогенератор'
                },
                {
                    id: 'cooling',
                    lvl: 4,
                    src: coolingMini,
                    isLast: true,
                    width: 'min(35px, 9.3vw)',
                    height: 'min(38px, 10.1vw)',
                    text: 'Градирня'
                }, 
            ],
            position: 'left: 0',
        }
    }, 
    {
        id: 'result_turboGen',
        src: turboGen,
        type: 'rotor',
        text: 'Турбогенератор',
        amount: 2,
        info: {
            items: [
                {
                    id: 'rotor',
                    lvl: 1,
                    src: rotorMini,
                    
                    height: 'min(36px, 9.6vw)',
                    text: 'Лопатка ротора'
                },
                {
                    id: 'turbine',
                    lvl: 2,
                    src: turbineMini,
                    width: 'min(36px, 9.6vw)',
                    height: 'min(36px, 9.6vw)',
                    text: 'Турбина'

                },
                {
                    id: 'turboGen',
                    lvl: 3,
                    src: turboGenMini,
                    isLast: true,
                    width: 'min(40px, 10.6vw)',
                    height: 'min(38px, 10.1vw)',
                    text: 'Турбогенератор'
                },
            ],
            position: 'left: 0',
        }
    },
    {
        id: 'result_reactBuild',
        src: reactBuild,
        type: 'uranium',
        text: 'Здание реактора',
        amount: 2,
        info: {
            items: [
                {
                    id: 'uraniumMini',
                    lvl: 1,
                    src: uraniumMini,
                    width: 'min(28px, 7.46vw)',
                    height: 'min(30px, 8vw)',
                    text: 'Уран-235'
                },
                {
                    id: 'tvelMini',
                    lvl: 2,
                    src: tvelMini,
                    width: 'min(22px, 5.9vw)',
                    height: 'min(34px, 9.06vw)',
                    text: 'ТВЭЛ'
                },
                {
                    id: 'tvsMini',
                    lvl: 3,
                    src: tvsMini,
                    width: 'min(17px, 4.5vw)',
                    height: 'min(38px, 10.13vw)',
                    text: 'ТВС'
                },
                {
                    id: 'reactorMini',
                    lvl: 4,
                    src: reactorMini,
                    width: 'min(32px, 8.5vw)',
                    height: 'min(38px, 10.13vw)',
                    text: 'Ядерный реактор'
                },
                {
                    id: 'reactBuildMini',
                    type: 'uranium',
                    lvl: 5,
                    isLast: true,
                    src: reactBuildMini,
                    width: 'min(39px, 10.4vw)',
                    height: 'min(38px, 10.13vw)',
                    text: 'Здание реактора'
                },
            ],
            position: 'right: 0;'
        }
    },
    {
        id: 'result_transformer',
        src: transformer,
        type: 'coil',
        text: 'Трансформатор',
        amount: 2,
        info: {
            items: [
                {
                    id: 'coil',
                    lvl: 1,
                    src: coilMini,
                    width: 'min(19px, 5.58vw)',
                    height: 'min(31px, 8.26vw)',
                    text: 'Катушка'
                },
                {
                    id: 'core',
                    lvl: 2,
                    src: coreMini,
                    width: 'min(33px, 8.8vw)',
                    height: 'min(38px, 10.13vw)',
                    text: 'Сердечник'
                },
                {
                    id: 'transformer',
                    lvl: 3,
                    src: transformerMini,
                    isLast: true,
                    width: 'min(29px, 7.7vw)',
                    height: 'min(38px, 10.13vw)',
                    text: 'Трансформатор'
                }, 
            ],
            position: 'right: -10px;',
        }
    }
];
