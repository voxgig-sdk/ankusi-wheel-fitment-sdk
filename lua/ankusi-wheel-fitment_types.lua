-- Typed models for the AnkusiWheelFitment SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Dataset
---@field changelog table
---@field columns table
---@field data table
---@field license string
---@field name string
---@field records number
---@field source string
---@field version string

---@class DatasetLoadMatch
---@field changelog? table
---@field columns? table
---@field data? table
---@field license? string
---@field name? string
---@field records? number
---@field source? string
---@field version? string

---@class DatasetListMatch
---@field changelog? table
---@field columns? table
---@field data? table
---@field license? string
---@field name? string
---@field records? number
---@field source? string
---@field version? string

---@class Fitment
---@field bolt_pattern string
---@field center_bore_mm string
---@field center_bore_rear_mm string
---@field chassis_code string
---@field flush_wheel string
---@field lug_count number
---@field make string
---@field max_wheel string
---@field model string
---@field oe_wheel string
---@field source_lang? string
---@field source_url string
---@field vehicles number
---@field year string

---@class FitmentListMatch
---@field bolt_pattern? string
---@field limit? number
---@field make? string
---@field model? string
---@field year? number

local M = {}

return M
