import DataUriParser from "datauri/parser.js";
import path from "node:path";

const getBuffer = (file: { originalname: string; buffer: Buffer }) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);

}


export default getBuffer;


// DataURI ka main kaam hai image ke binary data (Buffer) ko ek string format mein convert karna, taaki usse Data URL ke form mein represent ya upload kiya ja sake.

