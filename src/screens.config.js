import rotor from './assets/images/rotor.png';
import uranium from './assets/images/uranium.png';
import steam from './assets/images/steamMaker.png';
import coil from './assets/images/coil.png';
import tvel from './assets/images/tvel.png';
import tvs from './assets/images/tvs.png';
import water from './assets/images/water.png';
import reactor from './assets/images/reactor.png';
import reactBuild from './assets/images/reactBuild.png';
import warmer from './assets/images/warmer.png';
import turbine from './assets/images/turbine.png';
import turboGen from './assets/images/turboGen.png';
import core from './assets/images/core.png';
import transformer from './assets/images/transformer.png';
import cooling from './assets/images/cooling.png';
import apeu from './assets/images/apeu.png';
import window from './assets/images/window.png';
import table from './assets/images/table.png';
import ice from './assets/images/ice.png';
import board from './assets/images/board.png';
import robe from './assets/images/robe.png';
import mask from './assets/images/mask.png';
import number from './assets/images/number.png';
import icebreaker from './assets/images/icebreaker.png';
import home from './assets/images/homeBuilding.png';
import medicine from './assets/images/medicine.png';
import cod from './assets/images/cod.png';
import bg2 from './assets/images/game2Bg.png';
import medal from "./assets/images/medal.png";
import iceFull from './assets/images/ice-full.png';
import iceBroken from './assets/images/ice-broken.png';

import { Screen1 } from "./components/screens/screen1";
import { Screen2 } from "./components/screens/screen2";
import { Screen3 } from "./components/screens/screen3";
import { Screen4 } from "./components/screens/screen4";
import { Screen5 } from "./components/screens/screen5";
import { Screen6 } from "./components/screens/screen6";
import { Screen7 } from "./components/screens/screen7";

export const screens = [
    {
        id: 0,
        component: Screen1,
        preloadImages: [water, steam, uranium, rotor, tvel, coil, tvs, warmer],
    },
    {
        id: 1,
        component: Screen2,
        preloadImages: [reactBuild, reactor, turbine, turboGen, core, transformer, cooling, apeu, window, table, ice, mask, number],
    },
    {
        id: 2,
        component: Screen3,
        preloadImages: [icebreaker, board, robe, home, medicine, cod],
    },
    {
        id: 3,
        component: Screen4,
        preloadImages: [bg2, medal, iceFull, iceBroken]
    },
    {
        id: 4,
        component: Screen5,
    },
    {
        id: 5,
        component: Screen6,
    },
    {
        id: 6,
        component: Screen7,
    },

];
