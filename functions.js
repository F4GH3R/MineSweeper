//plan storlek
const sizePx = 10;
const reactorVar = 0;
const bombArr = [];
const DangerZone = [];
const borderArr = [];
const bigArray = [];

const validCellsBunker = [];
const validCellsBunker2 = [];

const usedCells = [];

const dimensionTable = [];
const dimensionTable2 = [];

const width = [];

const exploredSquares = [];
const exploredSquares2 = [];

var audio = new Audio('sounds/click.mp3');
audio.play();


for(let k = 1; k <= sizePx * sizePx; k++){ //creates a array containing all numbers on the table (width * height = area)
    bigArray.push(k);
}

shuffler = () => { //creates a array containing numbers that later will be assigned to bombs, (the numbers are doomed)
    let assign = sizePx * sizePx;//assign = squares on playing field
    let bombcount = ((sizePx/10)*sizePx*1);//bombcount = max amount of bombs
    let right = 0;
    let left = 0;
        for(let i = 1; i <= sizePx; i++){
            //if(sizePx * i === r){
                right = sizePx * i
                borderArr.push(right)
                
            //}
        }
        //console.log('-----')
        for(let i = 0; i < sizePx; i++){
            //if(sizePx * i === r){
                left = (sizePx * i) + 1
                borderArr.push(left)
                
            //}
        }
        for(let x = 1; x <= bombcount; x++){ // give the bombs values
        let r = Math.floor(Math.random() * assign) + 1;
            if(bombArr.includes(r)){ // checks so theres no coordinate has 2 bombs
                x--;
            } else{
                bombArr.push(r);
            }
            
        }
        //console.log(bombArr)
        return bombArr
}
shuffler()

function tableCreator3(){
        var total = 0;
        for(let i = 0; i < sizePx; i++){
            dimensionTable[i] = new Array()
            for(let j = 0; j < sizePx; j++){
                total += 1;
                dimensionTable2[j] = new Array()
                dimensionTable2[j] = total
                dimensionTable[i].push(dimensionTable2[j])
            }
        }
}
tableCreator3()

function findIndexes(num){ //locate coordinates of a given number
    //console.log('findIndexes start: num = ' + num)
    const y = Math.floor(num / sizePx)
    //console.log('y = ' + y)
    const x = (num - 1) % sizePx;
    //console.log('x = ' + x)
    return [y, x];
}

function tableCreator2(){//assign images and creates a table
    var tile = 0; // coordinate
    for(let x = 0; x < sizePx; x++){// printing out 'facing down' images and assigning bomb values to tiles created top to bottom
        var row = document.createElement('tr') //tr = table row, left to right
        row.setAttribute('id', 'row ' + x) // example: id = row 62
        tableVar = document.getElementById('tableid2'); // creating a vaiable for the table
        tableVar.appendChild(row); // assigning the rows to the table
            for(let y = 0; y < sizePx; y++){ //creates sizePX amount columns for each row             
                tile = dimensionTable[x][y];
                var column = document.createElement('td');
                column.setAttribute('id', tile);
                row.appendChild(column);
                let hidden = '';
           
                if (bombArr.includes(tile)){ //locating bomb values
                hidden = 'bomb';
                } else {
                    hidden = '0'
                }
                
                var imageDiv = document.createElement('img');//creating images divs
                imageDiv.setAttribute('id', 'imgid:' + tile)
                imageDiv.src = 'images/facingDown.png';
                column.appendChild(imageDiv);
                column.setAttribute('onmousedown', 'downfunc(this.id)')
                column.setAttribute('onmouseup', 'upfunc(this.id)')
            }
    }
}
tableCreator2();

//blacklistReactor creates a "Danger Zone" that contains the coordinates for every bomb, plus every 8 boxes around a bomb
//This danger zone is used as boundries for the chainReactor
function blackListReactor(){
    //ekolod
    const tempDanger = [];//tempDanger = temporary dangerZone variable

    
   
    let dangerVar = 0; //dangerVar = used to temporary locate and store coordinates for a specific box and then inserting it into the dangerZone array
    //locating the 8 boxes around the bomb
    for(let i = 0; i < bombArr.length; i++){ // i is used to look through all the bomnbs (bombArr)
        for(let g = 0; g < 3; g++){ // g = what line of boxes your on
            for(let h = -1; h < 2; h++){ // h is used to find what specific box
                if(g == 0){ //first line
                    dangerVar = bombArr[i] - sizePx + h
                    if(dangerVar > 0 && dangerVar < sizePx*sizePx){
                        tempDanger.push(dangerVar)   
                    }
                }
                else if (g == 1){ //second line
                    dangerVar = bombArr[i] + h
                    if(dangerVar > 0 && dangerVar < sizePx*sizePx){
                        tempDanger.push(dangerVar)   
                    }  
                } else{ // third line
                    dangerVar = bombArr[i] + sizePx + h
                    if(dangerVar > 0 && dangerVar < sizePx*sizePx){
                        tempDanger.push(dangerVar)   
                    }
                }
            }
        }
    }


    tempDanger.forEach((element) => {    //remove duplicates and insert tempDanger values to the dangerZone array
    if (!DangerZone.includes(element)) {
        DangerZone.push(element);
    }
    });

    DangerZone.sort(function(a, b){return a - b});    //sorting the array, ascending numerically
    return DangerZone

}
let testMinister = 0;
function chainReactorV2(tempArray){
    testMinister = testMinister + 1

    const cellInspector = [];
    const validCells = [];
    if(tempArray.length < 1){
        return console.log('WARNING, EMPTY ARRAY!!!!')
    }
    const chainArray = [];
    if(!Array.isArray(tempArray)){
        //console.log('tempArray contains an integer!')
        chainArray.push(tempArray)
    } else {
        //console.log('tempArray contains an array!')
        for(let u = 0; u < tempArray.length; u++){
            chainArray.push(tempArray[u])
        }
    }

    for(let k = 0; k < chainArray.length; k++){
        let indexValue = 0;
        upVar = chainArray[k]
       
            for(let g = -1; g < 2; g++){
                for(let h = -1; h < 2; h++){
                    let [yVar, xVar] = findIndexes(upVar)
                    yindex = yVar + g
                    xindex = xVar + h
                    if(yindex >= 0 && yindex <= sizePx - 1 && xindex >= 0 && xindex <= sizePx - 1){
                        indexValue = dimensionTable[yindex][xindex]
                        if(!exploredSquares2.includes(indexValue)){
                            ekolod(indexValue)
                            if(!DangerZone.includes(indexValue)){
                                cellInspector.push(indexValue)
                            }
                        }
                    }
                }
            }
        
            cellInspector.forEach((element) => {//removing duplicatess
            if (!validCells.includes(element)){
                if(/*!exploredSquares.includes(element) && */!DangerZone.includes(element)){
                    validCells.push(element);
            }}});
            validCells.sort(function(a, b){return a - b});//sorting the array numerically
    //BUNKER----------------------------------------------------------

            for(let i = 0; i < validCells.length; i++){// Push all valid cells into a larger array that contains this 'rounds' un-explored cells
                if(!DangerZone.includes(validCells[i])){
                    validCellsBunker.push(validCells[i])
                    //exploredSquares.push(validCells[i])
                }
            }
            for(let z = validCells.length - 1; z >= 0; z--){ // insert all un-explored squares into an array
                if(!exploredSquares.includes(validCells[z])){
                    exploredSquares.push(validCells.splice(z, 1)[0])
                }
            }
            exploredSquares.forEach((element) => {//removing duplicatess
                if (!exploredSquares2.includes(element)){
                    exploredSquares2.push(element);
                }});        
    }
    validCellsBunker.forEach((element) => {//removing duplicatess
    if (!validCellsBunker2.includes(element)){
            validCellsBunker2.push(element);
    }});
    
    validCellsBunker2.sort(function(a, b){return a - b});
    //exploredSquares2.sort(function(a, b){return a - b});

    // validCellsBunker2.forEach((element) => {
    //     exploredSquares.push(element)
    // })
    if(testMinister < 10){
        chainReactorV2(validCellsBunker2)
    }
}

blackListReactor();
const ToDeleteSet = new Set(DangerZone);
const safeZone = bigArray.filter((name) => {
return !ToDeleteSet.has(name);
});

function ekolod(upVar){//scans a 3x3 around a given coordinate and gives a number 0-9 
    //ekolod
    //console.log('ekolod start: upVar = ' + upVar)
    let indexValue = 0;
    if(upVar > 0 && upVar <= sizePx*sizePx){
        var ekoNumber = 0;
        const reactorArr = [];
            for(let g = -1; g < 2; g++){
                for(let h = -1; h < 2; h++){
                    let [yVar, xVar] = findIndexes(upVar)
                    yindex = yVar + g
                    xindex = xVar + h
                    if(yindex >= 0 && xindex >= 0 && yindex <= sizePx - 1 && xindex <= sizePx - 1){
                        indexValue = dimensionTable[yindex][xindex]
                        if(bombArr.includes(indexValue)){
                            ekoNumber++;
                        } 
                        reactorArr.push(indexValue);//maybe delete this?
                    } else {
                        //console.log('utanför banan! yindex = ' + yindex + ' xindex = ' + xindex)
                    }
                }
            }
    
            if(bombArr.includes(Number(upVar))){
                document.getElementById(upVar).childNodes[0].src = 'images/boom.png';
            } else {
                if(upVar !== undefined){
                    document.getElementById(upVar).childNodes[0].src = 'images/' + ekoNumber + '.png';
                } 
            }
            usedCells.push(upVar)
            return reactorArr
    }
}

function downfunc(downVar){//mousebutton down
    document.getElementById(downVar).childNodes[0].src = 'images/0.png';   
    audio.play();
}
function upfunc(upVar){//mousebutton up

    var numberUpVar = Number(upVar)
    console.log('clicked: ' + numberUpVar)
    ekolod(numberUpVar);
    compressedFunc(numberUpVar);
}
function compressedFunc(numberUpVar){
    //might remove this function and insert contains into upfunc instead!!!!!
    chainReactorV2(numberUpVar);
}


