# AnkusiWheelFitment SDK utility: make_context

from ankusiwheelfitment_sdk.core.context import AnkusiWheelFitmentContext


def make_context_util(ctxmap, basectx):
    return AnkusiWheelFitmentContext(ctxmap, basectx)
