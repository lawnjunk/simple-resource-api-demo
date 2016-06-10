#!/usr/bin/env bash
token=$(http -a "${STAGE_TEST_USER}:${STAGE_TEST_PASSWD}" "${STAGE_BASE_URL}/api/signin")

mock_data="
{ 
  \"name\" : \"$(lorem --randomize --chars 10)\",
  \"description\": \"$(lorem --randomize)\",
  \"ingredients\": [\"$(lorem --randomize --chars 10)\", \"$(lorem --randomize --chars 10)\", \"$(lorem --randomize --chars 10)\"]
}
"
echo "$mock_data" | http post "${STAGE_BASE_URL}/api/snack" Authorization:"Bearer ${token}"
  
