const fs = require("fs");
const loader = require("@assemblyscript/loader");

(async () => {
  let importObject = {
    env: {
      abort: () => {},
    },
  };

  let wasm = fs.readFileSync("vector_loader.wasm");
  let module = await loader.instantiate(wasm);

  let obj = await WebAssembly.instantiate(wasm, importObject);

  // Direct call version
  let dVector2D = {
    init: function (x, y) {
      return obj.instance.exports["Vector2D#constructor"](0, x, y);
    },
    getX: obj.instance.exports["Vector2D#get:x"],
    setX: obj.instance.exports["Vector2D#set:x"],
    getY: obj.instance.exports["Vector2D#get:y"],
    getY: obj.instance.exports["Vector2D#set:y"],
    Magnitude: obj.instance.exports["Vector2D#Magnitude"],
    add: obj.instance.exports["Vector2D#add"],
  };

  // Direct call version
  let dVector3D = {
    init: function (x, y, z) {
      return obj.instance.exports["Vector3D#constructor"](0, x, y, z);
    },
    getX: obj.instance.exports["Vector3D#get:x"],
    setX: obj.instance.exports["Vector3D#set:x"],
    getY: obj.instance.exports["Vector3D#get:y"],
    setY: obj.instance.exports["Vector3D#set:y"],
    getZ: obj.instance.exports["Vector3D#get:z"],
    setZ: obj.instance.exports["Vector3D#set:z"],
    Magnitude: obj.instance.exports["Vector3D#Magnitude"],
    add: obj.instance.exports["Vector3D#add"],
  };

  let start_time_direct = new Date().getTime();

  let vec1_id = dVector2D.init(1, 2);
  let vec2_id = dVector2D.init(3, 4);
  let vec3_id = dVector3D.init(5, 6, 7);

  for (let i = 0; i < 1_000_000; i++) {
    dVector2D.add(vec1_id, vec2_id);
    dVector3D.setX(vec3_id, dVector3D.getX(vec3_id) + 10);
    dVector2D.setY(vec2_id, dVector2D.getY(vec2_id) + 1);
    dVector2D.Magnitude(vec2_id);
  }

  console.log("direct time =" + new Date().getTime() - start_time_direct);
})();
