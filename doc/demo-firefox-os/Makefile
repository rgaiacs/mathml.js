FILES = demo.html \
	index.html \
	jquery-2.0.3.min.js \
	manifest.webapp mathml.js \
	img/icon-16.png \
	img/icon-48.png \
	img/icon-128.png \
	style

.PHONY: icon archive clean-icon clean clean-all

icon: img/icon.svg
	convert $< -resize 16 img/icon-16.png
	convert $< -resize 48 img/icon-48.png
	convert $< -resize 128 img/icon-128.png

archive: ${FILES}
	zip -r -0 mathmljs.zip $^

clean-icon:
	${RM} img/*.png

clean:
	${RM} *.zip

clean-all: clean-icon clean
