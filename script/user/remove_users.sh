#!/usr/bin/env bash
mongo "${MONGODB_STAGE_URI}" --eval 'db.users.remove({})'
