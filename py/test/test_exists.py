# AnkusiWheelFitment SDK exists test

import pytest
from ankusiwheelfitment_sdk import AnkusiWheelFitmentSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AnkusiWheelFitmentSDK.test(None, None)
        assert testsdk is not None
