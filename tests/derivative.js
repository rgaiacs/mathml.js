// MathML.js
// Copyright (C) 2014  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

phantom.injectJs("driver.js");

var suite = [
    {
        name: difMn,
        tests: [
            ['<mrow><frac><mo>d</mo><mrow><mo>d</mo><mi>x</mi><mrow></frac><mn>c</mn></mrow>',
             '<mrow><mn>0</mn></mrow>']
                 ]
    },
    {
        name: difMi,
        tests: [
            ['<mrow><frac><mo>d</mo><mrow><mo>d</mo><mi>x</mi><mrow></frac><mi>x</mi></mrow>',
             '<mrow><mn>1</mn></mrow>'],
            ['<mrow><frac><mo>d</mo><mrow><mo>d</mo><mi>x</mi><mrow></frac><mi>y</mi></mrow>',
             '<mrow><mn>0</mn></mrow>']
                 ]
    },
    {
        name: difPlus,
        tests: [
            ['<mrow><frac><mo>d</mo><mrow><mo>d</mo><mi>x</mi><mrow></frac><mrow><mi>f</mi><mo>+</mo><mi>g</mi></mrow>',
             '<mrow><mn>0</mn></mrow>']
                 ]
    }
];

run_suite(suite);
slimer.exit();
