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
    name: opRootMiMi,
    tests: [
        ['<mroot class="clickHere"><mi>x</mi><mi>x</mi></mroot>',
            '<mroot><mi>x</mi><mi>x</mi></mroot>'
        ],
        ['<mroot class="clickHere"><mi>y</mi><mi>x</mi></mroot>',
            '<mroot><mi>y</mi><mi>x</mi></mroot>'
        ]
    ]
}, {
    name: opSqrtMi,
    tests: [
        ['<mroot class="clickHere"><mi>x</mi></mroot>',
            '<mroot><mi>x</mi></mroot>'
        ]
    ]
}, {
    name: opRootMnMn,
    tests: [
        ['<mroot class="clickHere"><mn>1</mn><mn>2</mn></mroot>',
            '<mn>1.00</mn>'
        ],
        ['<mroot class="clickHere"><mn>1</mn><mn>3</mn></mroot>',
            '<mn>1.00</mn>'
        ],
        ['<mroot class="clickHere"><mn>2</mn><mn>2</mn></mroot>',
            '<mn>1.41</mn>'
        ],
        ['<mroot class="clickHere"><mn>2</mn><mn>3</mn></mroot>',
            '<mn>1.26</mn>'
        ]
    ]
}, {
    name: opSqrtMn,
    tests: [
        ['<mroot class="clickHere"><mn>1</mn></mroot>',
            '<mn>1.00</mn>'
        ],
        ['<mroot class="clickHere"><mn>2</mn></mroot>',
            '<mn>1.41</mn>'
        ]
    ]
}, {
    name: opRootMrowMrow,
    tests: []
}, {
    name: opSqrtMrow,
    tests: []
}];

run_suite(suite);
slimer.exit();
