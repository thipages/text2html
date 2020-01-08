# text2html
Text formatter


## What it does

```javascript
// Latex like inline formatting
// returns I am <span style="color:blue;">stuck</span>
text2html("I am \\oops{stuck},{['oops',{style:'color:blue;'}).output;

// Latex like block formatting where items are separated by newlines. Any item leading spaces are removed
// returns <ul><li>item1</li><li>item2   </li></ul>
text2html("\\begin(list)\n   item1\nitem2   \n\\end,{['list',{tag:'ul'}).output;
```

## Basic Usage

through a text file
```
\begin(list)
I am
    \oops{stuck}
\end
```
associated with a JavaScript definition array [key1,value1, key2, value2, ..]
```javascript
const def=['oops',{style:'color:blue;'},'list',{tag:'ul'}];
// returns <ul><li>I am</li><li><span style="color:blue;">stuck</span></li></ul>
const html=text2html(textFileAsString,def).output;
```
