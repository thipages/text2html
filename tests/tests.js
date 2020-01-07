import {text2html} from "../index.js";
const format=[
    'A',{style:"color:red"},
    'B',{style:"color:yellow"},
    'oops',{style:"color:blue;"},
    'list',{tag:'ul'},
];

let sources=[
    [
        `start/A_Here I am_/ and /B_Here I am stuck_/end`,
        `start/A_Here I am/B_embedded_/_/end`,
        `start/list_\nitem1\nitem2\n_/end`,
        `I am /oops_stuck_/`,
        `/list_   item1\nitem2   _/`
    ],
    [
        `start_A/Here I am/ and _B/Here I am stuck/end`,
        `start/A_Here I am/B_embedded_/_/end`,
        `start/list_\nitem1\nitem2\n_/end`,
        `I am /oops_stuck_/`,
        `/list_   item1\nitem2   _/`
    ],
    [
        `start\\A{Here I am} and \\B{Here I am stuck}end`,
        `start\n\\begin(A)\nHere I am\n\\begin(B)\nembedded\n\\end\n\\end\nend`,
        `start\n\\begin(list)\nitem1\nitem2\n\\end\nend`/*,
        `I am /oops_stuck_/`,
        `/list_   item1\nitem2   _/`*/
    ]
];

let excepted= [
    `start<span style="color:red">Here I am</span> and <span style="color:yellow">Here I am stuck</span>end`,
    `start<span style="color:red">Here I am<span style="color:yellow">embedded</span></span>end`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    `I am <span style="color:blue;">stuck</span>`,
    `<ul><li>item1</li><li>item2   </li></ul>`
];

let patternId=2;
sources[patternId].forEach(
    (v,i)=>{
        let r=text2html(sources[patternId][i],format);
        if (r.output===excepted[i]) {
            console.log("ok");
        } else {
            console.log("nok",r.output);
        }

    }
);
/*
let m="start_a/je suis là/end".replace(/_+([a-zA-Z][a-zA-Z0-9]*)\/([^\/]*)\//g,
    function (key,text){
    console.log(key,text);
});
*/

//console.log(Array.from(m));



