class Assets{
  

    static initialize(){
        this._assets={};
    }

    static registerAsset(name,data){
        this._assets[name]=data;
    }

    static get(name){
        return this._assets[name];
    }
}