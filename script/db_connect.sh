# connect to staging db

if [[ ! $MONGODB_STAGE_URI ]];
  echo "setup env"
  exit 1
fi

mongo "${MONGODB_STAGE_URI}"
