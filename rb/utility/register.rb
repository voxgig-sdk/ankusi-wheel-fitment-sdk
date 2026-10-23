# AnkusiWheelFitment SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AnkusiWheelFitmentUtility.registrar = ->(u) {
  u.clean = AnkusiWheelFitmentUtilities::Clean
  u.clean_add = AnkusiWheelFitmentUtilities::CleanAdd
  u.clean_explain = AnkusiWheelFitmentUtilities::CleanExplain
  u.done = AnkusiWheelFitmentUtilities::Done
  u.make_error = AnkusiWheelFitmentUtilities::MakeError
  u.feature_add = AnkusiWheelFitmentUtilities::FeatureAdd
  u.feature_hook = AnkusiWheelFitmentUtilities::FeatureHook
  u.feature_init = AnkusiWheelFitmentUtilities::FeatureInit
  u.fetcher = AnkusiWheelFitmentUtilities::Fetcher
  u.make_fetch_def = AnkusiWheelFitmentUtilities::MakeFetchDef
  u.make_context = AnkusiWheelFitmentUtilities::MakeContext
  u.make_options = AnkusiWheelFitmentUtilities::MakeOptions
  u.make_request = AnkusiWheelFitmentUtilities::MakeRequest
  u.make_response = AnkusiWheelFitmentUtilities::MakeResponse
  u.make_result = AnkusiWheelFitmentUtilities::MakeResult
  u.make_point = AnkusiWheelFitmentUtilities::MakePoint
  u.make_spec = AnkusiWheelFitmentUtilities::MakeSpec
  u.make_url = AnkusiWheelFitmentUtilities::MakeUrl
  u.param = AnkusiWheelFitmentUtilities::Param
  u.prepare_auth = AnkusiWheelFitmentUtilities::PrepareAuth
  u.prepare_body = AnkusiWheelFitmentUtilities::PrepareBody
  u.prepare_headers = AnkusiWheelFitmentUtilities::PrepareHeaders
  u.prepare_method = AnkusiWheelFitmentUtilities::PrepareMethod
  u.prepare_params = AnkusiWheelFitmentUtilities::PrepareParams
  u.prepare_path = AnkusiWheelFitmentUtilities::PreparePath
  u.prepare_query = AnkusiWheelFitmentUtilities::PrepareQuery
  u.graphql_body = AnkusiWheelFitmentUtilities::GraphqlBody
  u.graphql_errors = AnkusiWheelFitmentUtilities::GraphqlErrors
  u.result_basic = AnkusiWheelFitmentUtilities::ResultBasic
  u.result_body = AnkusiWheelFitmentUtilities::ResultBody
  u.result_headers = AnkusiWheelFitmentUtilities::ResultHeaders
  u.transform_request = AnkusiWheelFitmentUtilities::TransformRequest
  u.transform_response = AnkusiWheelFitmentUtilities::TransformResponse
}
