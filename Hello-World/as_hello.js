const fs = require("fs");

const bytes = fs.readFileSync(__dirname + "/as_hello.wasm");

let memory = null;

let importObject = {
  as_hello: {
    console_log: function (index) {
      if (memory == null) {
        console.log("memory buffer is null");
        return;
      }
      const len_index = index - 4;
      const len = new Uint32Array(memory.buffer, len_index, 4)[0];

      const str_bytes = new Uint16Array(memory.buffer, index, len);

      const log_string = new TextDecoder("utf-16").decode(str_bytes);
      console.log(log_string);
    },
  },
  env: {
    abort: () => {},
  },
};

async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);

  memory = obj.instance.exports.memory;
  obj.instance.exports.HelloWorld();
};
