# AnkusiWheelFitment SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AnkusiWheelFitmentFeatures
  def self.make_feature(name)
    case name
    when "base"
      AnkusiWheelFitmentBaseFeature.new
    when "ratelimit"
      AnkusiWheelFitmentRatelimitFeature.new
    when "retry"
      AnkusiWheelFitmentRetryFeature.new
    when "test"
      AnkusiWheelFitmentTestFeature.new
    when "timeout"
      AnkusiWheelFitmentTimeoutFeature.new
    else
      AnkusiWheelFitmentBaseFeature.new
    end
  end
end
