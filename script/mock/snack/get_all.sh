#!/usr/bin/env bash

token=$(http -a "${STAGE_TEST_USER}:${STAGE_TEST_PASSWD}" "${STAGE_BASE_URL}/api/signin")

http "${STAGE_BASE_URL}/api/snack/all" Authorization:"Bearer ${token}"
