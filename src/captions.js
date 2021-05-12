import WebVTTParser from 'paella-core/js/captions/WebVTTParser';

console.log("Captions");

let text = "WEBVTT\r\n\r\n" +
    "line 1\r\n" +
    "12:33 --> 12:36\r\n" +
    "Lorem ipsum dolor sit amet,\r\n" +
    "\r\n" +
    "line 2\r\n" +
    "12:37 --> 12:39\r\n" +
    "consectetur adipiscing elit,\r\n" +
    "\r\n" +
    "line 3\r\n" +
    "12:40 --> 12:44\r\n" +
    "sed do eiusmod tempor\r\n" +
    "incididunt ut labore et dolore magna\r\n" +
    "\r\n" +
    "12:45 --> 12:55\r\n" +
    "aliqua. Ut enim ad \r\n" +
    "minim veniam, quis nostrud\r\n" +
    "\r\n" +
    "line 4\r\n" +
    "12:56 --> 12:59\r\n" +
    "exercitation ullamco laboris\r\n" +
    "\r\n" +
    "line 5\r\n" +
    "13:00 --> 13:11\r\n" +
    "nisi ut aliquip ex ea commodo\r\n" +
    "consequat. Duis aute irure dolor\r\n" +
    "in reprehenderit in voluptate\r\n" +
    "\r\n" +
    "line 6\r\n" +
    "13:13 --> 13:16\r\n" +
    "velit esse cillum dolore\r\n" +
    "\r\n" +
    "line 7\r\n" +
    "13:16 --> 13:24\r\n" +
    "eu fugiat nulla pariatur.\r\n" +
    "\r\n";

const parser = new WebVTTParser(text);
const captions = parser.captions;

console.log(captions.cues);