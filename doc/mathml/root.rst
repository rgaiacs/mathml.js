Top-Level Element
=================

MathML specifies a single top-level or root math element, which encapsulates
each instance of MathML markup within a document. All other MathML content must
be contained in a math element; in other words, every valid MathML expression
is wrapped in outer <math> tags. The math element must always be the outermost
element in a MathML expression; it is an error for one math element to contain
another. 

Attributes
----------

In addition to the attributes listed :doc:`previously <attributes>`, the math
element accepts the following attributes and for a full list look at [1]_. 

display
^^^^^^^

Specifies whether the enclosed MathML expression should be rendered as a
separate vertical block (in display style) or inline, aligned with adjacent
text.

The possibles values are ``block`` and ``inline`` (default).

.. raw:: html
   :file: samples/root-display-0.html

.. literalinclude:: samples/root-display-0.html

.. raw:: html
   :file: samples/root-display-1.html

.. literalinclude:: samples/root-display-1.html

maxwidth
^^^^^^^^

Specifies the maximum width to be used for linebreaking. The default is the
maximum width available in the surrounding environment. If that value cannot be
determined, the renderer should assume an infinite rendering width. 

overflow
^^^^^^^^

Specifies the preferred handing in cases where an expression is too long to fit
in the allowed width.

The possibles valueas are ``linebreak`` (default), ``scroll``, ``elide``,
``truncate`` and ``scale``.

With ``linebreak``, the expression will be broken across several lines.

.. raw:: html
   :file: samples/root-overflow-0.html

.. literalinclude:: samples/root-overflow-0.html

With ``scroll``, the window provides a viewport into the larger complete
display of the mathematical expression. Horizontal or vertical scroll bars are
added to the window as necessary to allow the viewport to be moved to a
different position.

.. raw:: html
   :file: samples/root-overflow-1.html

.. literalinclude:: samples/root-overflow-1.html

With ``elide``, the display is abbreviated by removing enough of it so that the
remainder fits into the window. For example, a large polynomial might have the
first and last terms displayed with ``+ ... +`` between them. Advanced renderers
may provide a facility to zoom in on elided areas.

.. raw:: html
   :file: samples/root-overflow-2.html

.. literalinclude:: samples/root-overflow-2.html

With ``truncate``, the display is abbreviated by simply truncating it at the
right and bottom borders. It is recommended that some indication of truncation
is made to the viewer.

.. raw:: html
   :file: samples/root-overflow-3.html

.. literalinclude:: samples/root-overflow-3.html

With ``scale``, the fonts used to display the mathematical expression are
chosen so that the full expression fits in the window. Note that this only
happens if the expression is too large. In the case of a window larger than
necessary, the expression is shown at its normal size within the larger window.

.. raw:: html
   :file: samples/root-overflow-4.html

.. literalinclude:: samples/root-overflow-4.html


altimg
^^^^^^

Provides a URI referring to an image to display as a fall-back for user agents
that do not support embedded MathML. 

alttext
^^^^^^^

Provides a textual alternative as a fall-back for user agents that do not
support embedded MathML or images. 

.. rubric:: References

.. [1] http://www.w3.org/TR/MathML3/chapter2.html
