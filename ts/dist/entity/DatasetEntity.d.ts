import { AnkusiWheelFitmentEntityBase } from '../AnkusiWheelFitmentEntityBase';
import type { AnkusiWheelFitmentSDK } from '../AnkusiWheelFitmentSDK';
import type { Control } from '../types';
import type { Dataset, DatasetLoadMatch, DatasetListMatch } from '../AnkusiWheelFitmentTypes';
declare class DatasetEntity extends AnkusiWheelFitmentEntityBase<Dataset> {
    constructor(client: AnkusiWheelFitmentSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    load(this: any, reqmatch?: DatasetLoadMatch, ctrl?: Control): Promise<DatasetEntity>;
    list(this: any, reqmatch?: DatasetListMatch, ctrl?: Control): Promise<DatasetEntity[]>;
}
export { DatasetEntity };
