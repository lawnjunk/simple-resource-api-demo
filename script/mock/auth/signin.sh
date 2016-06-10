#!/usr/bin/env bash

http -a "${STAGE_TEST_USER}:${STAGE_TEST_PASSWD}" "${STAGE_BASE_URL}/api/signin"
