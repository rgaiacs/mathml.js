.PHONY: icon clean-icon clean

# This is a little hack.
icon: img/icon.svg
	convert -background none $< -resize 16 img/icon-16.png
	convert -background none $< -resize 48 img/icon-48.png
	convert -background none $< -resize 128 img/icon-128.png

clean-icon:
	${RM} img/*.png

clean: clean-icon
