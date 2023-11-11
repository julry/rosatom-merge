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

export const cards = [
    {
        id: 'uranium',
        type: 'uranium',
        lvl: 1,
        src: uranium,
        max: 16,
    },
    {
        id: 'rotor',
        type: 'rotor',
        lvl: 1,
        src: rotor,
        max: 4,
    },
    {
        id: 'coil',
        type: 'coil',
        lvl: 1,
        src: coil,
        max: 4,
    },
    {
        id: 'water',
        type: 'water',
        lvl: 1,
        src: water,
        max: 8,
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
        id: 'cooling',
        src: cooling,
        text: 'Градильня',
        amount: 2,
    }, {
        id: 'turboGen',
        src: turboGen,
        text: 'Турбогенератор',
        amount: 2,
    },
    {
        id: 'reactBuild',
        src: reactBuild,
        text: 'Здание реактора',
        amount: 2,
    },
    {
        id: 'transformer',
        src: transformer,
        text: 'Трансформатор',
        amount: 2,
    }
]