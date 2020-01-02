# text2html
flow text formatter


## Usage

```javascript
// Default usage : |^ as delimiters, span tag
text2html("I am |oops^stuck^|,{['oops',{style:'color:blue;'}).output ==='I am <span style="color:blue;">stuck</span>';

// List support (items separated by newlines), remove any leading spaces
text2html("|list^   item1\nitem2   ^|,{['list',{tag:'ul'}).output ==='<ul><li>item1</li><li>item2   </li></ul>';
```
