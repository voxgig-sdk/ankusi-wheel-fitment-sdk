# AnkusiWheelFitment SDK utility: make_context

from projectname_sdk.core.context import AnkusiWheelFitmentContext


def make_context_util(ctxmap, basectx):
    return AnkusiWheelFitmentContext(ctxmap, basectx)
