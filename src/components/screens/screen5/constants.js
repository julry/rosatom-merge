import cooling from '../../../assets/images/cooling.png';
import medicine from '../../../assets/images/medicine.png';
import cod from '../../../assets/images/cod.png';
import home from '../../../assets/images/homeBuilding.png';
import transformer from '../../../assets/images/transformer.png';
import reactBuild from '../../../assets/images/reactBuild.png';
import turboGen from '../../../assets/images/turboGen.png';

export const initialResults = {
    row: [
        {
            id: 0,
            type: 'cooling',
            src: cooling,
            amount: 0,
            max: 2,
        },
        {
            id: 1,
            type: 'turboGen',
            src: turboGen,
            amount: 0,
            max: 1,
        },
        {
            id: 2,
            type: 'reactBuild',
            src: reactBuild,
            amount: 0,
            max: 2,
        },
        {
            id: 3,
            type: 'transformer',
            src: transformer,
            amount: 0,
            max: 2,
        },
    ],
    column: [
        {
            id: 0,
            src: cod,
            type: 'cod',
            amount: 0,
            max: 1,
        }, {
            id: 1,
            src: medicine,
            type: 'medicine',
            amount: 0,
            max: 2,
        },
        {
            id: 2,
            src: home,
            type: 'home',
            amount: 0,
            max: 2,
        },
    ],
}