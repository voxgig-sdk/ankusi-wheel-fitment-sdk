"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FitmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANKUSI_WHEEL_FITMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANKUSI_WHEEL_FITMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnkusiWheelFitmentSDK.test();
        const ent = testsdk.Fitment();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('fitment hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.AnkusiWheelFitmentSDK.test(offline).Fitment().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.AnkusiWheelFitmentSDK.test(offline).Fitment()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.AnkusiWheelFitmentSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Fitment().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.AnkusiWheelFitmentSDK.test().Fitment().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.AnkusiWheelFitmentSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Fitment().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Fitment().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AnkusiWheelFitmentSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Fitment().list({ "bolt_pattern": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANKUSI_WHEEL_FITMENT_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'fitment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bolt_pattern": { "a": true, "h": "Bolt Pattern", "n": "bolt_pattern", "r": true, "sh": "Lug count x pitch circle diameter in mm.", "t": "`$STRING`", "key$": "bolt_pattern", "index$": 0 }, "center_bore_mm": { "a": true, "h": "Center Bore Mm", "n": "center_bore_mm", "r": true, "sh": "Hub bore diameter in mm.", "t": "`$STRING`", "key$": "center_bore_mm", "index$": 1 }, "center_bore_rear_mm": { "a": true, "h": "Center Bore Rear Mm", "n": "center_bore_rear_mm", "r": true, "sh": "Rear hub bore in mm when it differs from the front; otherwise empty.", "t": "`$STRING`", "key$": "center_bore_rear_mm", "index$": 2 }, "chassis_code": { "a": true, "h": "Chassis Code", "n": "chassis_code", "r": true, "sh": "Chassis code or a year span; often empty.", "t": "`$STRING`", "key$": "chassis_code", "index$": 3 }, "flush_wheel": { "a": true, "h": "Flush Wheel", "n": "flush_wheel", "r": true, "sh": "Reference size and offset for a flush fit on stock suspension.", "t": "`$STRING`", "key$": "flush_wheel", "index$": 4 }, "lug_count": { "a": true, "h": "Lug Count", "n": "lug_count", "r": true, "sh": "Number of lugs.", "t": "`$INTEGER`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "lug_count", "index$": 5 }, "make": { "a": true, "h": "Make", "n": "make", "r": true, "t": "`$STRING`", "key$": "make", "index$": 6 }, "max_wheel": { "a": true, "h": "Max Wheel", "n": "max_wheel", "r": true, "sh": "Largest commonly fitted size before rubbing.", "t": "`$STRING`", "key$": "max_wheel", "index$": 7 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "Full model name, including the make.", "t": "`$STRING`", "key$": "model", "index$": 8 }, "oe_wheel": { "a": true, "h": "Oe Wheel", "n": "oe_wheel", "r": true, "sh": "Factory wheel size and offset as published by the manufacturer.", "t": "`$STRING`", "key$": "oe_wheel", "index$": 9 }, "source_lang": { "a": true, "h": "Source Lang", "n": "source_lang", "r": false, "sh": "Language of the source guide (en, ru, th, es, fr, ar).", "t": "`$STRING`", "key$": "source_lang", "index$": 10 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": true, "sh": "The full fitment guide for this vehicle on ankusiwheels.com.", "t": "`$STRING`", "key$": "source_url", "index$": 11 }, "vehicles": { "a": true, "h": "Vehicles", "n": "vehicles", "r": true, "sh": "Number of vehicles of this make in the dataset.", "t": "`$INTEGER`", "key$": "vehicles", "index$": 12 }, "year": { "a": true, "h": "Year", "n": "year", "r": true, "t": "`$STRING`", "key$": "year", "index$": 13 } }, "name": "fitment", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /fitment", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "6x139.7", "k": "query", "n": "bolt_pattern", "or": "bolt_pattern", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "Toyota", "k": "query", "n": "make", "or": "make", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "Camry", "k": "query", "n": "model", "or": "model", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 2019, "k": "query", "n": "year", "or": "year", "r": false, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/fitment", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "fitment" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /makes", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/makes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "makes" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "fitment", "name__orig": "fitment", "Name": "Fitment", "name_": "fitment", "name-": "fitment", "NAME": "FITMENT", "index$": 1 }, { "active": true, "entity": "fitment", "key$": "BasicFitmentFlow", "kind": "basic", "name": "BasicFitmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "fitment_ref01" } }], "index$": 0 }] }, 'Fitment', { "GET /fitment": { "protocol": "http", "parameters": [{ "name": "make", "in": "query", "required": false, "description": "Exact make name, case-insensitive.", "schema": { "type": "string" }, "example": "Toyota", "index$": 0 }, { "name": "model", "in": "query", "required": false, "description": "Part of the model name, case-insensitive.", "schema": { "type": "string" }, "example": "Camry", "index$": 1 }, { "name": "year", "in": "query", "required": false, "description": "Exact model year.", "schema": { "type": "integer" }, "example": 2019, "index$": 2 }, { "name": "bolt_pattern", "in": "query", "required": false, "description": "Exact bolt pattern, lug count x pitch circle diameter in mm.", "schema": { "type": "string" }, "example": "6x139.7", "index$": 3 }, { "name": "limit", "in": "query", "required": false, "description": "Results to return, 1 to 100 (default 25). Larger values are capped at 100.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 25 }, "example": 10, "index$": 4 }] }, "GET /makes": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let fitment_ref01_data = Object.values(setup.data.existing.fitment)[0];
        // LIST
        const fitment_ref01_ent = client.Fitment();
        const fitment_ref01_match = {};
        const fitment_ref01_list = (await fitment_ref01_ent.list(fitment_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/fitment/FitmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnkusiWheelFitmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['fitment01', 'fitment02', 'fitment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID': idmap,
        'ANKUSI_WHEEL_FITMENT_TEST_LIVE': 'FALSE',
        'ANKUSI_WHEEL_FITMENT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID'];
    const live = 'TRUE' === env.ANKUSI_WHEEL_FITMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AnkusiWheelFitmentSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ANKUSI_WHEEL_FITMENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FitmentEntity.test.js.map