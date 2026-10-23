# AnkusiWheelFitment SDK utility: make_context
require_relative '../core/context'
module AnkusiWheelFitmentUtilities
  MakeContext = ->(ctxmap, basectx) {
    AnkusiWheelFitmentContext.new(ctxmap, basectx)
  }
end
