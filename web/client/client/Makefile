.PHONY: build development lint clean

build: node_modules
	ENVIRONMENT=production gulp

development: node_modules
	ENVIRONMENT=development gulp watch

lint: node_modules
	npm run -s lint

clean:
	rm -rf build node_modules

node_modules:
	npm install
