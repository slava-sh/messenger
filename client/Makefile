.PHONY: build development lint clean

build: node_modules
	gulp

development: node_modules
	gulp watch

lint: node_modules
	npm run -s lint

clean:
	rm -rf build/* node_modules

node_modules:
	npm install
