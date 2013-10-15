Actions with mi
===============

In this section we will describe how ``mi`` elements will handle DOM events.

Mouse over and out
------------------

When the pointing device is moved onto an ``mi`` the element should change its
color (default to blue).

When the pointing device is moved away from an ``mi`` it should change its
color to back.

This behavior can be achieve changing the color value attribute.

Double left click
-----------------

The double left click will be bubbling.

Right click
-----------

When right clicked a prompt window will raise asking for the numerical
value to replace the symbolic name.

After the user type the value, all ``mi`` with the symbolic name selected will
be replaced.
