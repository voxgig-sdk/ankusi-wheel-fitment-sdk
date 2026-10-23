import { DatasetEntity } from './entity/DatasetEntity';
import { FitmentEntity } from './entity/FitmentEntity';
export type * from './AnkusiWheelFitmentTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AnkusiWheelFitmentEntityBase } from './AnkusiWheelFitmentEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AnkusiWheelFitmentSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Dataset(entopts?: Record<string, any>): DatasetEntity;
    Fitment(entopts?: Record<string, any>): FitmentEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AnkusiWheelFitmentSDK;
    tester(testopts?: any, sdkopts?: any): AnkusiWheelFitmentSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AnkusiWheelFitmentSDK;
export { stdutil, config, BaseFeature, AnkusiWheelFitmentEntityBase, AnkusiWheelFitmentSDK, SDK, };
export type { DirectResult };
