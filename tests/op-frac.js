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

var suite = [{
    name: opFracMiMi,
    tests: [
        ['<mfrac class="clickHere"><mi>x</mi><mi>x</mi></mfrac>',
            '<mn>1</mn>'
        ],
        ['<mfrac class="clickHere"><mi>x</mi><mi>y</mi></mfrac>',
            '<mfrac><mi>x</mi><mi>y</mi></mfrac>'
        ]
    ]
}, {
    name: opFracMnMn,
    tests: [
        ['<mfrac class="clickHere"><mn>1</mn><mn>1</mn></mfrac>',
            '<mn>1.00</mn>'
        ],
        ['<mfrac class="clickHere"><mn>1</mn><mn>2</mn></mfrac>',
            '<mn>0.50</mn>'
        ]
    ]
}, {
    name: opFracMrowMrow,
    tests: []
}];

run_suite(suite);
slimer.exit();
