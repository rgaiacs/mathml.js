MathML Attributes
=================

MathML elements take attributes with values that further specialize the meaning
or effect of the element. Only part of the attributes are listed below, for a
full list look at [1]_.

For example we will use the following equation:

.. raw:: html
   :file: samples/attributes-0.html

.. literalinclude:: samples/attributes-0.html

color
-----

The color, or background color, of presentation elements may be specified as a
color using ``color=#RGB|#RRGGBB|html-color-name``.

.. raw:: html
   :file: samples/attributes-color-0.html

.. literalinclude:: samples/attributes-color-0.html

The same result can be achieved using the CSS.

.. raw:: html
   :file: samples/attributes-color-1.html

.. literalinclude:: samples/attributes-color-1.html

id
--

Establishes a unique identifier associated with the element to support linking,
cross-references and parallel markup.

xref
----

References another element within the document.

class
-----

Associates the element with a set of style classes for use with XSLT and CSS.

style
-----

Associates style information with the element for use with XSLT and CSS.

href
----

Can be used to establish the element as a hyperlink to the specfied URI.

.. rubric:: References

.. [1] http://www.w3.org/TR/MathML3/chapter2.html
