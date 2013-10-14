Setup
=====

The behavior of MathML.js are drive by some global variable. To change the
default behavior of MathML.js just give the desired value to the proper variable
in a script after the inclusion of MathML.js as show bellow::

    <script type='text/javascript' src="jquery-2.0.3.min.js"></script>
    <script type='text/javascript' src="mathml.js"></script>
    <script>
      var SOMEVAR1 = value1;
      var SOMEVAR2 = value2;
      ...
      var SOMEVARN = valueN;
    </script>

Selection color
---------------

To help the user the element select will change its color to blue. If you want
another color use the ``MATHCOLOR`` variable to store the name of the
color you want.

.. admonition:: Demo

   `A demo of the basic arithmetic operation in actions can be found here
   <../_static/demo-setup-color.html>`_.

Equation overwrite
------------------

When some manipulation are done the old expression can be saved or not. If you
don't want to keep the old expression attribute a ``true`` value to
``MATHOVERWRITE``.

.. warning::

   If you want to manipulate inline equations (see next option) you should
   enable this option.

.. admonition:: Demo

   `A demo manipulations inplace can be found here
   <../_static/demo-setup-overwrite.html>`_.

Only display equation
---------------------

When you want to enable the MathML.js for all math elements you can
attribute a ``false`` value to ``ONLYDISPLAY``.

.. admonition:: Demo

   `A demo where all math elements work can be found here
   <../_static/demo-setup-onlydisplay.html>`_.

