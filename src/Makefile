OUT = mathml.js

FILES = mouseover.js \
	token.js \
	assumptions.js \
	op-plus.js \
	op-minus.js \
	op-times.js \
	op-div.js \
	op-frac.js \
	op-root.js \
	op-pow.js \
	trigonometry.js \
	click.js \
	delete.js \
	dnd.js \
	core.js

build: lint ${FILES}
	cat ${FILES} > ${BUILDDIR}/${OUT}

lint: ${FILES}
	for i in $^; \
	    do jshint $${i}; \
	done

beautify: ${FILES}
	for i in $^; \
	    do js-beautify -r $${i}; \
	done
