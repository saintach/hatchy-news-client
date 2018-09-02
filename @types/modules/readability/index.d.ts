declare module 'readability'{
  export default class Readability{
    constructor(htmltxt: Document);
    parse: () => void;
  }
}