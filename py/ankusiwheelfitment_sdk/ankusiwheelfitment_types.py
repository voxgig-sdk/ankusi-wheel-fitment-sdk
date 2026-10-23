# Typed models for the AnkusiWheelFitment SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Dataset(TypedDict):
    changelog: list
    columns: list
    data: list
    license: str
    name: str
    records: int
    source: str
    version: str


class DatasetLoadMatch(TypedDict, total=False):
    changelog: list
    columns: list
    data: list
    license: str
    name: str
    records: int
    source: str
    version: str


class DatasetListMatch(TypedDict, total=False):
    changelog: list
    columns: list
    data: list
    license: str
    name: str
    records: int
    source: str
    version: str


class FitmentRequired(TypedDict):
    bolt_pattern: str
    center_bore_mm: str
    center_bore_rear_mm: str
    chassis_code: str
    flush_wheel: str
    lug_count: int
    make: str
    max_wheel: str
    model: str
    oe_wheel: str
    source_url: str
    vehicles: int
    year: str


class Fitment(FitmentRequired, total=False):
    source_lang: str


class FitmentListMatch(TypedDict, total=False):
    bolt_pattern: str
    limit: int
    make: str
    model: str
    year: int
