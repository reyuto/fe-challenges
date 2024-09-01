// write your JavaScript here
function deepClone(o) {
  return o;
}

O = {
  a: {
    b: {
      c: {
        d: "This is a sting",
      },
      e: "This is another string",
    },
    f: "Some more string",
  },
};
cloneO = deepClone(O);

console.error(O !== cloneO, "These objects shouldn't be copies");

function cloneObject(obj, cloneObj) {
  for (prop in obj) {
    if (!obj.hasOwnProperty(prop)) continue;

    if (obj[prop].isObject()) {
      cloneObj[prop] = cloneObject(obj[prop], cloneObj[prop]);
    } else {
    }
  }
}
