proto:
	mkdir -p vendor/js
	protoc \
		--plugin node_modules/.bin/protoc-gen-ts \
		--ts_out vendor/js \
		--ts_opt output_javascript \
		--ts_opt long_type_string \
		--ts_opt client_grpc1 \
		--proto_path vendor/proto \
		`find ./vendor -name '*.proto'`
