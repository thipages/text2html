import {text2html} from "../index.js";
const format=[
    'A',{style:"color:red"},
    'B',{style:"color:yellow"},
    'oops',{style:"color:blue;"},
    'list',{tag:'ul'},
];
let sources= [
    `start|A^Here I am^| and |B^Here I am stuck^|end`,
    `start|A^Here I am|B^embedded^|^|end`,
    `start|list^\nitem1\nitem2\n^|end`,
    `I am |oops^stuck^|`,
    `|list^   item1\nitem2   ^|`
];
let excepted= [
    `start<span style="color:red">Here I am</span> and <span style="color:yellow">Here I am stuck</span>end`,
    `start<span style="color:red">Here I am<span style="color:yellow">embedded</span></span>end`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    `I am <span style="color:blue;">stuck</span>`,
    `<ul><li>item1</li><li>item2   </li></ul>`
];

sources.forEach(
    (v,i)=>{
        let r=text2html(sources[i],format);
        if (r.output===excepted[i]) {
            console.log("ok");
        } else {
            console.log("nok",r.output);
        }

    }
);



