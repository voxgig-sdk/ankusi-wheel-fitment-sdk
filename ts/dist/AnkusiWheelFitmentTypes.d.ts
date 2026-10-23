export interface Dataset {
    changelog: any[];
    columns: any[];
    data: any[];
    license: string;
    name: string;
    records: number;
    source: string;
    version: string;
}
export interface DatasetLoadMatch {
    changelog?: any[];
    columns?: any[];
    data?: any[];
    license?: string;
    name?: string;
    records?: number;
    source?: string;
    version?: string;
    $action?: string;
    [action: string]: any;
}
export interface DatasetListMatch {
    changelog?: any[];
    columns?: any[];
    data?: any[];
    license?: string;
    name?: string;
    records?: number;
    source?: string;
    version?: string;
    $action?: string;
    [action: string]: any;
}
export interface Fitment {
    bolt_pattern: string;
    center_bore_mm: string;
    center_bore_rear_mm: string;
    chassis_code: string;
    flush_wheel: string;
    lug_count: number;
    make: string;
    max_wheel: string;
    model: string;
    oe_wheel: string;
    source_lang?: string;
    source_url: string;
    vehicles: number;
    year: string;
}
export interface FitmentListMatch {
    bolt_pattern?: string;
    limit?: number;
    make?: string;
    model?: string;
    year?: number;
}
