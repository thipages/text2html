import {text2html} from "../index.js";
const samp=fetch ("asFile")
    .then(response => response.text()
    .then(data => {
        test(data.split("\r\n**"))
    }));

const format={
    A:{style:"color:red;"},
    B:{style:"color:yellow;"},
    oops:{style:"color:blue;"},
    list:{tag:'ul'},
    hr: {tag:'hr'}
};
let testSet=[
    'basic non nested',
    `I am \\oops{stuck}`,
    `I am <span style="color:blue;">stuck</span>`,
    'non nested twice',
    `start\\A{Here I am} and \\B{Here I am stuck}end`,
    `start<span style="color:red;">Here I am</span> and <span style="color:yellow;">Here I am stuck</span>end`,
    'non nested with keys as html tag',
    `start\\em{Here I am} and \\h1{Here I am stuck}end`,
    `start<em>Here I am</em> and <h1>Here I am stuck</h1>end`,
    'nested span',
    `start\n\\\\A\nHere I am\n\\\\B\nembedded\n\\\\\n\\\\\nend`,
    `start<span style="color:red;">Here I am<span style="color:yellow;">embedded</span></span>end`,
    'simple list',
    `start\n\\\\list\nitem1\nitem2\n\\\\\nend`,
    `start<ul><li>item1</li><li>item2</li></ul>end`,
    'list with leading/trailing spaces li',
    `\\\\list\n   item1\nitem2   \n\\\\`,
    `<ul><li>item1</li><li>item2   </li></ul>`,
    'self-contained simple',
    `\\hr/`,
    `<hr />`,
];

const log=(r,i,pre)=> {
    if (r.output === testSet[i + 2]) {
        console.log("ok", pre,r.output,r.output.length);
    } else {
        console.log("nok",pre, r.output,r.output.length);
    }
};
const test=(data)=>  {
    let count=0;
    let valid=true;
    let comparison="";
    testSet.forEach(
        (v,i)=>{
            comparison="";
            if (i%3===0) {
                let r1 = text2html(format)(testSet[i+1]);
                log(r1,i,"string");
                let r2 = text2html(format)(data[count]);
                log(r2,i,"file");
                let rs1=r1.output.split("");
                r2.output.split('').forEach(
                    (v,i)=>{
                        if (valid && v===rs1[i]){
                            comparison+=v;
                        } else {
                            valid=false;
                        }
                    }
                );
                count++;
                if (!valid) console.log("identical part:"+comparison+"\n");
            }
        }
    );
};




