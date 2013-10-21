TODO
====

Here is a list of that we hope that MathML.js do one day.

.. note::

   Some items in this list can't be done yet since Firefox MathML don't
   implement the full specifications. For more information see [1]_.


Drag and drop
-------------

Be capable to drag and drop part of equations to a new position.

Multiple indentation levels equations
-------------------------------------

.. warning::

   Some of MathML Token Elements attributes aren't implemented in Firefox.

Work using multiple indentation levels.

.. raw:: html

   <math>
   <mrow>
     <mrow>
       <mo>(</mo> <mi>x</mi> <mo>+</mo> <mi>y</mi> </mrow> <mo>)</mo>
     </mrow>
     <mo id='equals'>=</mo>
     <mrow>
       <mo>(</mo> <mi>x</mi> <mo>+</mo> <mi>y</mi> </mrow> <mo>)</mo>
     </mrow>
     <mo linebreak='newline' indentalign='id' indenttarget='equals'>=</mo>
     <mrow>
       <mo>(</mo> <mi>x</mi> <mo>+</mo> <mi>y</mi> </mrow> <mo>)</mo>
     </mrow>
   </mrow>
   </math>

Linear Algebra
--------------

.. warning::

   Some of MathML Tabular Math aren't implemented in Firefox.

   
Manipulate matrices will be nice.

K-6 Math
--------

.. warning::

   None of MathML Tabular Math aren't implemented in Firefox.

Manipulate mathematics used in the lower grades such as two-dimensional addition,
multiplication, and long division that tends to be tabular.

For example, the sum of 424 and 33 look as:

.. raw:: html

   <math>
   <mstack>
   <mn>424</mn>
   <msrow> <mo>+</mo> <mn>33</mn> </msrow>
   <msline/>
   </mstack>
   </math>

.. rubric:: References

.. [1] `Mozilla MathML Status
       <https://developer.mozilla.org/en-US/docs/Mozilla/MathML_Project/Status>`_
