const obj_To_String = (Obj) => JSON.stringify(Obj);
const str_To_Object = (Str) => JSON.parse(Str);

const update_Message = (message, newlatest) => {
  message.archive.push(message.latest);
  message.latest = newlatest
}

export default { 
  obj_To_String, 
  str_To_Object,
  update_Message
};