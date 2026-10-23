# frozen_string_literal: true

# Typed models for the AnkusiWheelFitment SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Dataset entity data model.
#
# @!attribute [rw] changelog
#   @return [Array]
#
# @!attribute [rw] columns
#   @return [Array]
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] records
#   @return [Integer]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
Dataset = Struct.new(
  :changelog,
  :columns,
  :data,
  :license,
  :name,
  :records,
  :source,
  :version,
  keyword_init: true
)

# Request payload for Dataset#load.
#
# @!attribute [rw] changelog
#   @return [Array, nil]
#
# @!attribute [rw] columns
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] records
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
DatasetLoadMatch = Struct.new(
  :changelog,
  :columns,
  :data,
  :license,
  :name,
  :records,
  :source,
  :version,
  keyword_init: true
)

# Request payload for Dataset#list.
#
# @!attribute [rw] changelog
#   @return [Array, nil]
#
# @!attribute [rw] columns
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] records
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
DatasetListMatch = Struct.new(
  :changelog,
  :columns,
  :data,
  :license,
  :name,
  :records,
  :source,
  :version,
  keyword_init: true
)

# Fitment entity data model.
#
# @!attribute [rw] bolt_pattern
#   @return [String]
#
# @!attribute [rw] center_bore_mm
#   @return [String]
#
# @!attribute [rw] center_bore_rear_mm
#   @return [String]
#
# @!attribute [rw] chassis_code
#   @return [String]
#
# @!attribute [rw] flush_wheel
#   @return [String]
#
# @!attribute [rw] lug_count
#   @return [Integer]
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] max_wheel
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] oe_wheel
#   @return [String]
#
# @!attribute [rw] source_lang
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] vehicles
#   @return [Integer]
#
# @!attribute [rw] year
#   @return [String]
Fitment = Struct.new(
  :bolt_pattern,
  :center_bore_mm,
  :center_bore_rear_mm,
  :chassis_code,
  :flush_wheel,
  :lug_count,
  :make,
  :max_wheel,
  :model,
  :oe_wheel,
  :source_lang,
  :source_url,
  :vehicles,
  :year,
  keyword_init: true
)

# Request payload for Fitment#list.
#
# @!attribute [rw] bolt_pattern
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] make
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
FitmentListMatch = Struct.new(
  :bolt_pattern,
  :limit,
  :make,
  :model,
  :year,
  keyword_init: true
)

