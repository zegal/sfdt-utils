import {findAnchorAndUpdate, manipulateSfdtForCrossRef} from './crossReference';

export default (sfdt) => findAnchorAndUpdate(sfdt, manipulateSfdtForCrossRef);
