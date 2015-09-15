import Cog from "./cog/cog";
import React from "react";

import gl from "./cog/gl";


class MySceneOverlay extends React.Component {
  constructor(props) {
    super(props);

    let loader = new Cog.Loader("http://localhost:8000/assets");
    loader.load(
      ["cube.cog", "deferred.frag", "surface.vert"], 
      (name, _) => { console.log("Resource " + name + " loaded"); },
      () => { this.props.scene.start(); }
    );
  }

  render() {
    return (
      <div>
        <span>
          {this.props.scene.name}
        </span>
      </div>
    );
  }
}



class MyScene extends Cog.Scene {
  constructor() {
    super("my scene", MySceneOverlay);
  }

  setup() {
    gl.clearColor(0.7, 0.7, 0.7, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  update() {

  }

  render() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}



let game = new Cog(MyScene);