// Typed models for the AnkusiWheelFitment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Dataset {
  changelog: any[]
  columns: any[]
  data: any[]
  license: string
  name: string
  records: number
  source: string
  version: string
}

export interface DatasetLoadMatch {
  changelog?: any[]
  columns?: any[]
  data?: any[]
  license?: string
  name?: string
  records?: number
  source?: string
  version?: string

  // Selects a custom action instead of the plain load:
  //   'csv'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatasetListMatch {
  changelog?: any[]
  columns?: any[]
  data?: any[]
  license?: string
  name?: string
  records?: number
  source?: string
  version?: string

  // Selects a custom action instead of the plain list:
  //   'json'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Fitment {
  bolt_pattern: string
  center_bore_mm: string
  center_bore_rear_mm: string
  chassis_code: string
  flush_wheel: string
  lug_count: number
  make: string
  max_wheel: string
  model: string
  oe_wheel: string
  source_lang?: string
  source_url: string
  vehicles: number
  year: string
}

export interface FitmentListMatch {
  bolt_pattern?: string
  limit?: number
  make?: string
  model?: string
  year?: number
}

