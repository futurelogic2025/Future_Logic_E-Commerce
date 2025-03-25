import { Stack } from "./stack.model.js";

class ContentText {
  constructor(text){
    this.latest = text;
    this.archive = new Stack;
  }

  #_update_ContentText = (message, newlatest) => {
    if(message.latest){
      message.archive.push(message.latest);
    }
    message.latest = newlatest
  }

  setLatest(newlatest){
    this.#_update_ContentText(this, newlatest);
  }

  asArray(){
    return this.archive.toArray();
  }

}

export default ContentText;