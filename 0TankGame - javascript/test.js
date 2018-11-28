let cnv;
let camera;

function preload() {
    Stage.Instance.preloadAssets();
}

function setup() {

    Stage.Instance.initialize();

}


function draw() {
    Stage.Instance.update(0);
    Stage.Instance.render();
}

function windowResized() {

   /* resizeCanvas(windowWidth * 0.9, windowHeight * 0.9);*/

    /*Stage.Instance.cvn= createCanvas(windowWidth , windowHeight );*/
    width=windowWidth;
    height=windowHeight;
    /*let x = (windowWidth -width) / 2;
    let y =(windowHeight - height)/2;*/
    Stage.Instance.cnv.position(0, 0);
    Map.onResize();
    console.log("resize");

}

function keyReleased() {

    Stage.Instance.handleKeysReleased();

    return false;
}





  