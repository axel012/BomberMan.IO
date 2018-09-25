(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("map1",
{ "height":15,
 "layers":[
        {
         "data":[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"left-down",
 "tileheight":32,
 "tilesets":[
        {
         "columns":3,
         "firstgid":1,
         "image":"tiles.png",
         "imageheight":32,
         "imagewidth":96,
         "margin":0,
         "name":"Bomber",
         "spacing":0,
         "tilecount":3,
         "tileheight":32,
         "tilewidth":32,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":32,
 "version":1,
 "width":15
});