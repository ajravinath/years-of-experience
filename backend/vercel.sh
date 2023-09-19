#!/bin/bash
echo "building project..." && npx tsc && cd ../frontend && yarn && yarn build && mkdir -p ../backend/dist/client && cp -r ./build/* ../backend/dist/client/ && cd ../backend
