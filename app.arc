@app
remix-at-edge

@aws
runtime nodejs16.x
# Lambda@Edge doesn't support yet arm64 architecture.
# It's important to deploy functions in this region. Otherwise, they cannot be attached to CloudFront.
region us-east-1

@http
/*
  method any
  src server

@static

@plugins
lambda-at-edge
dry-run-debug