.PHONY: build demo doc jquery

build:
	make -C src build
	cp src/mathml.js .

demo: build jquery-2.0.3.min.js
	cp mathml.js doc/demos/
	cp jquery-2.0.3.min.js doc/demos/
	cp mathml.js doc/demo-firefox-os/
	cp jquery-2.0.3.min.js doc/demo-firefox-os/

doc: build demo
	make -C doc html

jquery-2.0.3.min.js:
	wget http://code.jquery.com/jquery-2.0.3.min.js
