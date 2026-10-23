-- AnkusiWheelFitment SDK exists test

local sdk = require("ankusi-wheel-fitment_sdk")

describe("AnkusiWheelFitmentSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
