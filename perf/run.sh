#!/bin/bash
export TARGET=http://$(cat ../node/lb_dns)
export DATADOG_API_KEY=$(cat ../ansible/ddog_api_key)
export DEBUG=plugin:publish-metrics:datadog-statsd
export HANDLE_GUID_ERRORS=false

if [ -z "${DATADOG_API_KEY}" ]; then
  echo "[perf/run.sh] ERROR: DATADOG_API_KEY is not set";
  exit 1
fi

npm run artillery -- run scenarios/$1/$2.yaml -e $3
