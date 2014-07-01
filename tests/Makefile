DRIVER = driver.js

TESTS = op-plus.js \
	op-minus.js \
	op-times.js \
	op-div.js \
	op-frac.js \
	op-root.js \
	op-pow.js \
	trigonometry.js

test: ${TESTS}
	for i in $^; do \
	    slimerjs $$i; \
	done;

beautify: ${DRIVER} ${TESTS}
	for i in $^; \
	    do js-beautify -r $${i}; \
	done
