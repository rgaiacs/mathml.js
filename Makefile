build:
	make -C src build
	cp src/mathml.js .

.PHONY: doc

demo: build
	cp mathml.js doc/demos/

doc: build demo
	make -C doc html
