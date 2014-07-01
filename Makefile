export BUILDDIR=$(shell pwd)

.PHONY: help build demo doc tests beautify jquery

## help  : show all commands
help :
	@grep -E '^##' Makefile | sed -e 's/## //g'

## build : build mathml.js
build:
	make -C src build

## demo  : build the demos
demo: build jquery-2.0.3.min.js
	cp mathml.js doc/demos/
	cp jquery-2.0.3.min.js doc/demos/
	cp mathml.js doc/demo-firefox-os/
	cp jquery-2.0.3.min.js doc/demo-firefox-os/

## doc   : build the documentation
doc: build demo
	make -C doc html

## tests : run tests
tests: mathml.js jquery-2.0.3.min.js
	make -C tests

## beautify : run beautifier
beautify:
	make -C src beautify
	make -C tests beautify

jquery-2.0.3.min.js:
	wget http://code.jquery.com/jquery-2.0.3.min.js
