package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AnkusiWheelFitment",
			"slug": "ankusi-wheel-fitment",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://ankusiwheels.com/wp-json/ankusi/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"dataset": map[string]any{},
				"fitment": map[string]any{},
			},
		},
		"entity": map[string]any{
			"dataset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "changelog",
						"title": "Changelog",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Dataset releases, newest first.",
					},
					map[string]any{
						"name": "columns",
						"title": "Columns",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "dataset",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/json",
								"segments": []any{
									map[string]any{
										"lit": "dataset",
									},
									map[string]any{
										"lit": "json",
									},
								},
								"parts": []any{
									"dataset",
									"json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "json",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/csv",
								"segments": []any{
									map[string]any{
										"lit": "dataset",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"parts": []any{
									"dataset",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "csv",
								},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/csv",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fitment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bolt_pattern",
						"title": "Bolt Pattern",
						"type": "`$STRING`",
						"req": true,
						"short": "Lug count x pitch circle diameter in mm.",
					},
					map[string]any{
						"name": "center_bore_mm",
						"title": "Center Bore Mm",
						"type": "`$STRING`",
						"req": true,
						"short": "Hub bore diameter in mm.",
					},
					map[string]any{
						"name": "center_bore_rear_mm",
						"title": "Center Bore Rear Mm",
						"type": "`$STRING`",
						"req": true,
						"short": "Rear hub bore in mm when it differs from the front; otherwise empty.",
					},
					map[string]any{
						"name": "chassis_code",
						"title": "Chassis Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Chassis code or a year span; often empty.",
					},
					map[string]any{
						"name": "flush_wheel",
						"title": "Flush Wheel",
						"type": "`$STRING`",
						"req": true,
						"short": "Reference size and offset for a flush fit on stock suspension.",
					},
					map[string]any{
						"name": "lug_count",
						"title": "Lug Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of lugs.",
					},
					map[string]any{
						"name": "make",
						"title": "Make",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "max_wheel",
						"title": "Max Wheel",
						"type": "`$STRING`",
						"req": true,
						"short": "Largest commonly fitted size before rubbing.",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"req": true,
						"short": "Full model name, including the make.",
					},
					map[string]any{
						"name": "oe_wheel",
						"title": "Oe Wheel",
						"type": "`$STRING`",
						"req": true,
						"short": "Factory wheel size and offset as published by the manufacturer.",
					},
					map[string]any{
						"name": "source_lang",
						"title": "Source Lang",
						"type": "`$STRING`",
						"short": "Language of the source guide (en, ru, th, es, fr, ar).",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The full fitment guide for this vehicle on ankusiwheels.com.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of vehicles of this make in the dataset.",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "fitment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/fitment",
								"segments": []any{
									map[string]any{
										"lit": "fitment",
									},
								},
								"parts": []any{
									"fitment",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bolt_pattern",
											"orig": "bolt_pattern",
											"type": "`$STRING`",
											"kind": "query",
											"example": "6x139.7",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "make",
											"orig": "make",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Toyota",
											"field": true,
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Camry",
											"field": true,
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2019,
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/makes",
								"segments": []any{
									map[string]any{
										"lit": "makes",
									},
								},
								"parts": []any{
									"makes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
