const htmlMap=(o)=> {
    let map=new Map();
    for (let temp of Object.entries(o)) {
        let t=temp[1].tag;
        if (['script'].indexOf(t)===-1) {
            map.set(temp[0],
                {
                    tag: t ? t : 'span',
                    attr: Object.keys(temp[1]).reduce((acc, v) => {
                        if (v !== 'tag') acc.push(`${v}="${temp[1][v]}"`);
                        return acc;
                    }, []).join(' ')
                });
        }
    }
    return map;
};
const voidTagger=(t,a)=>`<${t}${a?' '+a:''} />`;
const oTagger=(t,a)=>`<${t}${a?' '+a:''}>`;
const cTagger=(t)=>`</${t}>`;
const wrapper=(tag,text,attr)=>`${oTagger(tag,attr)}${text}${cTagger(tag)}`;
const sc='[\\^$.|?*+()';
const regExps=(config)=> {
    const c=config.map(v=>v.split('').map(w=>sc.indexOf(w)>0?'\\'+w:w).join(''));
    return {
        begin: new RegExp('^' + c[0] + '([a-zA-Z][A-Za-z0-9]*)' + c[1] + '$', 'gm'),
        end: new RegExp('^' + c[2] + '$', 'gm'),
        nonNested: new RegExp(c[0] + '([a-zA-Z][a-zA-Z0-9]*)' + c[1] + '(.+?)' + c[2], 'g'),
        auto: new RegExp('^' + c[1] + '([a-z][a-z]+)' + c[2] + '$', 'gm')
    };
};
const trimNewline=(s)=>s.replace(/^[\r\n|\r|\n]|[\r\n|\r|\n]$/g,'');
const defaultTags=['ul','i','strong','b','em','code','pre','blockquote','h1','h2','h3','h4','h5','h6'];
const ul=(a)=> a.join('').split("\n").map(
    v=>wrapper('li',v.replace(/^\s*/,''))
).join('')+cTagger('ul');
export const text2html=(def={})=>(input,transformer={})=> {
    return t2h(['$','{','}'])(def)(input,transformer);
};
export const t2h=(config)=>(def={})=>(input,transformer={})=> {
    let map=htmlMap(def),warnings=[];
    let re=regExps(config);
    defaultTags.forEach (t=>{
        if (!map.has(t)) map.set(t,{tag:t,attr:""});
    });
    if (!transformer['ul']) transformer.ul=ul;
    let output=input
        // normalize line breaks
        .replace(/[\r\n]+/g,'\n')
        // remove first/last lines break
        .replace(/^\n|\n$/g,'')
        // resolve non nested pattern
        .replace (re.nonNested,function (all,key,text) {
            if (map.has(key)) {
                let t=map.get(key);
                return  wrapper(t.tag,text,t.attr);
            } else {
                warnings.push();
                return wrapper('unknown',text);
            }
        }).replace(re.auto,function($,key) {
            if (map.has(key)) {
                let t=map.get(key);
                return  voidTagger(t.tag,t.attr);
            } else {
                warnings.push();
                return voidTagger('undefined');

            }
        });
    // resolve nested pattern
    let final=[], buffer=[],index=0;
    const nested=[...Array.from(output.matchAll(re.begin)), ...Array.from(output.matchAll(re.end))]
        .sort((a,b)=>a.index===b.index?0:a.index<b.index?-1:1);
    //console.log(nested);
    if (nested.length!==0) {
        nested.forEach(
            v => {
                // store text before wrapping structure, remove linebreaks belonging to the pattern
                let o = trimNewline(output.substring(index, v.index));
                if (o!=="") final.push(o);
                if (v[0] === config[2]) {
                    let nItem = buffer.pop();
                    if (!nItem) {
                        warnings.push();
                    } else if (map.has(nItem[1])) {
                        let tag=map.get(nItem[1]).tag;
                        final.push(
                            transformer[tag]
                                ? transformer[tag](final.splice(nItem[0]+1, final.length))
                                : cTagger(tag)
                        );
                    } else {
                        warnings.push();
                    }
                } else {
                    if (map.has(v[1])) {
                        let t=map.get(v[1]);
                        final.push(oTagger(t.tag,t.attr));
                    } else {
                        final.push(oTagger("unknown"));
                        warnings.push();
                    }
                    buffer.push([final.length-1, v[1]]);
                }
                index = v[0].length + v.index;
            }
        );
        final.push(output.substr(index + 1));
        output=final.join('');
    }
    return {output, warnings}
};