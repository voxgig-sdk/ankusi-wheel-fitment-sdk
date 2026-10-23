import { AnkusiWheelFitmentEntityBase } from '../AnkusiWheelFitmentEntityBase';
import type { AnkusiWheelFitmentSDK } from '../AnkusiWheelFitmentSDK';
import type { Control } from '../types';
import type { Fitment, FitmentListMatch } from '../AnkusiWheelFitmentTypes';
declare class FitmentEntity extends AnkusiWheelFitmentEntityBase<Fitment> {
    constructor(client: AnkusiWheelFitmentSDK, entopts: any);
    make(this: FitmentEntity): FitmentEntity;
    list(this: any, reqmatch?: FitmentListMatch, ctrl?: Control): Promise<FitmentEntity[]>;
}
export { FitmentEntity };
