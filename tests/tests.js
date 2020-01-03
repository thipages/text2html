import {text2html} from "../index.js";
const format=[
    'A',{style:"color:red"},
    'B',{style:"color:yellow"},
    'oops',{style:"color:blue;"},
    'list',{tag:'ul'},
];

let source= [
    `start/A_Here I am_/ and /B_Here I am stuck_/end`,
    `start/A_Here I am/B_embedded_/_/end`,
    `start/list_\nitem1\nitem2\n_/end`,
    `I am /oops_stuck_/`,
    `/list_   item1\nitem2   _/`
];
//let source2= (source,c1,c2)=>source.map(v=>v.replace(/\//g,'|').replace(/_/g,'^'));
let excepted= [
    `start<span style="color:red">Here I am</span> and <span style="color:yellow">Here I am stuck</span>end`,
    `start<span style="color:red">Here I am<span style="color:yellow">embedded</span></span>end`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    `I am <span style="color:blue;">stuck</span>`,
    `<ul><li>item1</li><li>item2   </li></ul>`
];

source.forEach(
    (v,i)=>{
        let r=text2html(source[i],format,'/','_');
        if (r.output===excepted[i]) {
            console.log("ok");
        } else {
            console.log("nok",r.output);
        }

    }
);



