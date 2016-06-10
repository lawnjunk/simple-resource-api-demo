#!/usr/bin/env bash
mock_data="
{ 
  \"username\" : \"${STAGE_TEST_USER}\",
  \"password\" : \"${STAGE_TEST_PASSWD}\"
}
"

echo "$mock_data" | http post "${STAGE_BASE_URL}/api/signup"
