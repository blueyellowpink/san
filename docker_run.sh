docker run --name mongodb -e ALLOW_EMPTY_PASSWORD=yes -e MONGODB_EXTRA_FLAGS='--wiredTigerCacheSizeGB=2' -p 27017:27017 -d bitnami/mongodb:latest
