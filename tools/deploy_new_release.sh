#!/bin/bash
set -ev

npm run report-coverage
npm run deploy-docs
npm run semantic-release
