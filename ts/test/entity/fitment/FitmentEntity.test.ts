

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AnkusiWheelFitmentSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FitmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANKUSI_WHEEL_FITMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANKUSI_WHEEL_FITMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnkusiWheelFitmentSDK.test()
    const ent = testsdk.Fitment()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('fitment hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AnkusiWheelFitmentSDK.test(offline).Fitment().stream('list')) { }
    }, /offline/)

    for await (const _item of AnkusiWheelFitmentSDK.test(offline).Fitment()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AnkusiWheelFitmentSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Fitment().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AnkusiWheelFitmentSDK.test().Fitment().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AnkusiWheelFitmentSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Fitment().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Fitment().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AnkusiWheelFitmentSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Fitment().list({"bolt_pattern":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANKUSI_WHEEL_FITMENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fitment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bolt_pattern":{"a":true,"h":"Bolt Pattern","n":"bolt_pattern","r":true,"sh":"Lug count x pitch circle diameter in mm.","t":"`$STRING`","key$":"bolt_pattern","index$":0},"center_bore_mm":{"a":true,"h":"Center Bore Mm","n":"center_bore_mm","r":true,"sh":"Hub bore diameter in mm.","t":"`$STRING`","key$":"center_bore_mm","index$":1},"center_bore_rear_mm":{"a":true,"h":"Center Bore Rear Mm","n":"center_bore_rear_mm","r":true,"sh":"Rear hub bore in mm when it differs from the front; otherwise empty.","t":"`$STRING`","key$":"center_bore_rear_mm","index$":2},"chassis_code":{"a":true,"h":"Chassis Code","n":"chassis_code","r":true,"sh":"Chassis code or a year span; often empty.","t":"`$STRING`","key$":"chassis_code","index$":3},"flush_wheel":{"a":true,"h":"Flush Wheel","n":"flush_wheel","r":true,"sh":"Reference size and offset for a flush fit on stock suspension.","t":"`$STRING`","key$":"flush_wheel","index$":4},"lug_count":{"a":true,"h":"Lug Count","n":"lug_count","r":true,"sh":"Number of lugs.","t":"`$INTEGER`","union":{"branches":2,"count":1,"depth":0},"key$":"lug_count","index$":5},"make":{"a":true,"h":"Make","n":"make","r":true,"t":"`$STRING`","key$":"make","index$":6},"max_wheel":{"a":true,"h":"Max Wheel","n":"max_wheel","r":true,"sh":"Largest commonly fitted size before rubbing.","t":"`$STRING`","key$":"max_wheel","index$":7},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"Full model name, including the make.","t":"`$STRING`","key$":"model","index$":8},"oe_wheel":{"a":true,"h":"Oe Wheel","n":"oe_wheel","r":true,"sh":"Factory wheel size and offset as published by the manufacturer.","t":"`$STRING`","key$":"oe_wheel","index$":9},"source_lang":{"a":true,"h":"Source Lang","n":"source_lang","r":false,"sh":"Language of the source guide (en, ru, th, es, fr, ar).","t":"`$STRING`","key$":"source_lang","index$":10},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":true,"sh":"The full fitment guide for this vehicle on ankusiwheels.com.","t":"`$STRING`","key$":"source_url","index$":11},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":true,"sh":"Number of vehicles of this make in the dataset.","t":"`$INTEGER`","key$":"vehicles","index$":12},"year":{"a":true,"h":"Year","n":"year","r":true,"t":"`$STRING`","key$":"year","index$":13}},"name":"fitment","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /fitment","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"6x139.7","k":"query","n":"bolt_pattern","or":"bolt_pattern","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"Toyota","k":"query","n":"make","or":"make","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"Camry","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":2019,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/fitment","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"fitment"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /makes","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/makes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"makes"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"fitment","name__orig":"fitment","Name":"Fitment","name_":"fitment","name-":"fitment","NAME":"FITMENT","index$":1}, {"active":true,"entity":"fitment","key$":"BasicFitmentFlow","kind":"basic","name":"BasicFitmentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"fitment_ref01"}}],"index$":0}]}, 'Fitment', {"GET /fitment":{"protocol":"http","parameters":[{"name":"make","in":"query","required":false,"description":"Exact make name, case-insensitive.","schema":{"type":"string"},"example":"Toyota","index$":0},{"name":"model","in":"query","required":false,"description":"Part of the model name, case-insensitive.","schema":{"type":"string"},"example":"Camry","index$":1},{"name":"year","in":"query","required":false,"description":"Exact model year.","schema":{"type":"integer"},"example":2019,"index$":2},{"name":"bolt_pattern","in":"query","required":false,"description":"Exact bolt pattern, lug count x pitch circle diameter in mm.","schema":{"type":"string"},"example":"6x139.7","index$":3},{"name":"limit","in":"query","required":false,"description":"Results to return, 1 to 100 (default 25). Larger values are capped at 100.","schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"example":10,"index$":4}]},"GET /makes":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fitment_ref01_data = Object.values(setup.data.existing.fitment)[0] as any

    // LIST
    const fitment_ref01_ent = client.Fitment()
    const fitment_ref01_match: any = {}

    const fitment_ref01_list = (await fitment_ref01_ent.list(fitment_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fitment/FitmentTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AnkusiWheelFitmentSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['fitment01','fitment02','fitment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID': idmap,
    'ANKUSI_WHEEL_FITMENT_TEST_LIVE': 'FALSE',
    'ANKUSI_WHEEL_FITMENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID']

  const live = 'TRUE' === env.ANKUSI_WHEEL_FITMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANKUSI_WHEEL_FITMENT_TEST_FITMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AnkusiWheelFitmentSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
