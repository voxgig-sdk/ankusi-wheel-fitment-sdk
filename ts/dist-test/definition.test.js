"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "list",
        "method": "GET",
        "path": "/dataset/json",
        "action": "json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "ANKUSI Wheel Fitment Dataset",
            "version": "2026.10.19",
            "license": "x",
            "source": "x",
            "records": 10093,
            "columns": [
                "x"
            ],
            "changelog": [
                {
                    "version": "x",
                    "summary": "x",
                    "added": [
                        "x"
                    ],
                    "corrected": [
                        {
                            "model": "x",
                            "year": "x",
                            "field": "x",
                            "from": "x",
                            "to": "x"
                        }
                    ],
                    "withdrawn_pending": [
                        "x"
                    ],
                    "centre_bore_blanked_pending": [
                        "x"
                    ],
                    "centre_bore_reinstated": [
                        "x"
                    ],
                    "flush_max_blanked_pending": [
                        "x"
                    ],
                    "staggered_hub_bore_added": [
                        "x"
                    ]
                }
            ],
            "data": [
                {
                    "make": "Toyota",
                    "model": "Toyota Camry",
                    "year": "2018",
                    "chassis_code": "x",
                    "bolt_pattern": "5x114.3",
                    "lug_count": "5",
                    "center_bore_mm": "60.1",
                    "center_bore_rear_mm": "x",
                    "oe_wheel": "F/R: 17x7.5J at ET40 offset, front and rear",
                    "flush_wheel": "19x8.5J ET38",
                    "max_wheel": "20x9.0J ET35",
                    "source_url": "x",
                    "source_lang": "en"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "load",
        "method": "GET",
        "path": "/dataset/csv",
        "action": "csv",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/csv"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map