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
