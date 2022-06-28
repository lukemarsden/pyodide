#!/bin/bash
set -xeuo pipefail
export SHA=$(git rev-parse HEAD)
docker buildx build -t quay.io/bacalhau/pyodide:$SHA .
docker push quay.io/bacalhau/pyodide:$SHA
