# text2html
Text to HTML formatter and more ...


## Basic usage
```javascript
const format = {
    blue:{tag:'span',style:'color:blue;'}
}
// returns I am <span style="color:blue;">stuck</span>
text2html(format)("I am \\blue{stuck}").output;
```
## Features
| #   | pattern       | Feature               |
| --- | ------------- |-----------------------|
|  1  | \key{text}    | wraps text            |
|  2  | \key\         | wraps content (start) |
|  3  | \\\           | wraps content (end)   |
|  4  | \key/         | adds  content         |
|  5  | \\_key[:type] | delimiters content*   |


\* not yet implemented

## Rules
* Empty lines are removed
* Pattern #1 can be inline, all others are on a separate line
* span is the default tag
* ul key/tag wraps new lines content