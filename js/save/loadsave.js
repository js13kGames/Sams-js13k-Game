let saveData = null;
function loadSave(){

//localStorage.removeItem(saveDataHeader);
  saveData=JSON.parse(localStorage.getItem(saveDataHeader));

  // if there is no save data, setup a save data object
  if(saveData==null){
    newGameSave();
  }
  else console.log("Loaded Save")
}

// newgamesave()
//
// resets the save game data
function newGameSave(){

  console.log("new save")
  saveData = {
    levels:[],
  }
}

window.onbeforeunload=saveGame;
