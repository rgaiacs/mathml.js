Introduction
============

MathML.js needs:

* `Lexical analysis <http://en.wikipedia.org/wiki/Lexical_analysis>`_ and
* `Syntax analysis <http://en.wikipedia.org/wiki/Syntax_analysis>`_

of MathML to work properly. Below you will find some information of the choices
that we made in this area for MathML.js.

Primary Tokens
--------------

For primary tokens we will mean a MathML element that has a very basic meaning.

mi
^^

An ``mi`` element represents a symbolic name or arbitrary text that should be
rendered as an identifier. Identifiers can include variables, function names,
and symbolic constants.

mn
^^

An ``mn`` element represents a "numeric literal" or other data that should be
rendered as a numeric literal. Generally speaking, a numeric literal is a
sequence of digits, perhaps including a decimal point, representing an unsigned
integer or real number.

Not all mathematical numbers should be represented using ``mn``. Examples of
mathematical numbers that should be represented differently include:

* complex numbers, ::

   <mrow>
   <mn> 3 </mn>
   <mo> &#x2062;<!--INVISIBLE TIMES--> </mo>
   <mi> &#x2148;<!--DOUBLE-STRUCK ITALIC SMALL I--> </mi>
   </mrow>

* ratios of numbers shown as fractions, ::

    <mfrac> <mn> 1 </mn> <mn> 2 </mn> </mfrac>

* names of numeric constants, ::

    <mi> &#x3C0;<!--GREEK SMALL LETTER PI--> </mi>
    <mi> &#x2147;<!--DOUBLE-STRUCK ITALIC SMALL E--> </mi>

mo
^^

An ``mo`` element represents an operator or anything that should be rendered as
an operator. Most of the operator are a UNICODE char (a full list can be found
in [2]_) but in some cases can be a expression.

Some ordinary  operators ::

    <mo> + </mo>
    <mo> &lt; </mo>
    <mo> &#x2264;<!--LESS-THAN OR EQUAL TO--> </mo>
    <mo> &#x2062;<!--INVISIBLE TIMES--> </mo>
    <mo> and<!--EXPRESSION AS OPERATOR-->  </mo>

Certain operators that are "invisible" in traditional mathematical notation
MUST be represented using specific entity references within ``mo`` elements,
rather than simply by nothing. The characters used for these "invisible
operators" are in the example below:: 

    <mrow>
    <mi> f </mi>
    <mo> &#x2061;<!--FUNCTION APPLICATION--> </mo>
    <mrow>
    <mo> ( </mo>
    <mi> x </mi>
    <mo> ) </mo>
    </mrow>
    </mrow>

    <mrow>
    <mi> sin </mi>
    <mo> &#x2061;<!--FUNCTION APPLICATION--> </mo>
    <mi> x </mi>
    </mrow>

    <mrow>
    <mi> x </mi>
    <mo> &#x2062;<!--INVISIBLE TIMES--> </mo>
    <mi> y </mi>
    </mrow>

    <msub>
    <mi> m </mi>
    <mrow>
    <mn> 1 </mn>
    <mo> &#x2063;<!--INVISIBLE
    SEPARATOR--> </mo>
    <mn> 2 </mn>
    </mrow>
    </msub>

In the case of integrals the differential operator symbol, usually denoted by
"d", MUST be used as ``&DifferentialD;`` (``U+2146``) in an ``mo`` element. ::

    <mrow>
    <msubsup>
    <mo> &#x222B;<!--INTEGRAL--> </mo>
    <mn> 0 </mn>
    <mn> 1 </mn>
    </msubsup>
    <mrow>
    <msup>
    <mi> &#x2147;<!--DOUBLE-STRUCK ITALIC SMALL E-->
    </mi>
    <mi> x </mi>
    </msup>
    <mo> &#x2062;<!--INVISIBLE
    TIMES--> </mo>
    <mrow>
    <mo>
    &#x2146;<!--DOUBLE-STRUCK
    ITALIC SMALL D--> </mo>
    <mi> x </mi>
    </mrow>
    </mrow>
    </mrow>

Secondary Tokens
----------------

For secondary tokens we will means a MathML element that enclose one or more
elements that is significant as a group.

mrow
^^^^

An ``mrow`` element is used to group together any number of sub-expressions, usually
consisting of one or more ``mo`` elements acting as "operators" on one or more other
expressions that are their "operands".  ::

    <mrow>
    <mrow>
    <mn> 2 </mn>
    <mo> &#x2062;<!--INVISIBLE TIMES--> </mo>
    <mi> x </mi>
    </mrow>
    <mo> + </mo>
    <mi> y </mi>
    <mo> - </mo>
    <mi> z </mi>
    </mrow>

mfrac
^^^^^

The ``mfrac`` element is used for fractions. It can also be used to mark up
fraction-like objects such as binomial coefficients and Legendre symbols. The
syntax for mfrac is ::

    <mfrac> numerator denominator </mfrac>

msqrt
^^^^^

The ``msqrt`` element is used for square roots. The syntax for this element is ::

    <msqrt> base </msqrt>

mroot
^^^^^

The mroot element is used to draw radicals with indices, e.g. a cube root.
The syntax for this element is ::

    <mroot> base index </mroot>

mfenced
^^^^^^^

The ``mfenced`` element provides a convenient form in which to express common
constructs involving fences (i.e. braces, brackets, and parentheses). ::

    <mfenced>
    <mrow>
    <mi> a </mi>
    <mo> + </mo>
    <mi> b </mi>
    </mrow>
    </mfenced>

    <mrow>
    <mi> f </mi>
    <mo> &#x2061;<!--FUNCTION APPLICATION--> </mo>
    <mfenced>
    <mi> x </mi>
    <mi> y </mi>
    </mfenced>
    </mrow>

msub
^^^^

The ``msub`` element attaches a subscript to a base using the syntax::

    <msub> base subscript </msub>

msup
^^^^

The ``msup`` element attaches a superscript to a base using the syntax::

    <msup> base superscript </msup>

msubsup
^^^^^^^

The ``msubsup`` element is used to attach both a subscript and superscript to a
base expression::

    <msubsup> base subscript superscript </msubsup>


munder
^^^^^^

The ``munder`` element attaches an accent or limit placed under a base using the
syntax::

    <munder> base underscript </munder>

mover
^^^^^

The ``mover`` element attaches an accent or limit placed over a base using the
syntax::

    <mover> base overscript </mover>

munderover
^^^^^^^^^^

The ``munderover`` element attaches accents or limits placed both over and under
a base using the syntax::

    <munderover> base underscript overscript </munderover>


.. rubric:: References

.. [1] `Mathematical operators and symbols in Unicode
       <http://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode>`_
.. [2] `Mathematical Operators Range: 2200–22FF
       <http://www.unicode.org/charts/PDF/U2200.pdf>`_
.. [3] `MathML in DAISY 3 Structure Guidelines
        <http://www.daisy.org/z3986/structure/SG-DAISY3/part2-math.html>`_
.. [4] `MathML Presentation Markup for the Impatient <http://www.xmlmind.com/tutorials/MathML/>`_
