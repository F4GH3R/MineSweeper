//plan storlek
var sizePx = 20;
const generated = [];
shuffler = () => {
    let assign = sizePx * sizePx;
    let bombcount = ((sizePx/10)*sizePx*1.25);
    for(let x = 1; x <= bombcount; x++){
    let r = Math.floor(Math.random() * assign) + 1;
    generated.push(r);
    }
    return generated;
}
shuffler();

function tableCreator(){
    //var imageDiv = 0;
    var tile = 0;
    for(let x = 1; x <= sizePx; x++){        
        var row = document.createElement('tr')
        row.setAttribute('id', 'row ' + x)
        tableVar = document.getElementById('tableid');
        tableVar.appendChild(row);
        for(let y = 1; y <= sizePx; y++){
            tile = tile + 1;
            var column = document.createElement('td');
            column.setAttribute('id', tile);
            row.appendChild(column);
            let hidden = '';
        //tull
            if (generated.includes(tile)){
               hidden = 'bomb';
            } else {
                hidden = '0'
            }
            var imageDiv= document.createElement('img');
            imageDiv.setAttribute('id', 'imgid:' + tile)
            imageDiv.src = 'images/' + hidden + '.png';
            column.appendChild(imageDiv);
            column.setAttribute('onmousedown', 'downfunc(this.id)')
            column.setAttribute('onmouseup', 'upfunc(this.id)')
        }
    }
    return imageDiv;
}
tableCreator();

function downfunc(downVar){  
    document.getElementById(downVar).childNodes[0].src = 'images/0.png';   
}
function upfunc(upVar){

    if(generated.includes(Number(upVar))){
        console.log('Du klickade på en bomb!')
        document.getElementById(upVar).childNodes[0].src = 'images/boom.png';
    } else {
        console.log('Du klickade inte på en bomb!')
        document.getElementById(upVar).childNodes[0].src = 'images/1.png';
    }

    //ekolod
    var ekoNumber = 0;
    for(let g = 0; g < 3; g++){
        let ekoVar = 0;
        for(let h = -1; h < 2; h++){
            //
            if(g === 0){
                ekoVar = document.getElementById(Number(upVar) - sizePx + h);
                if(ekoVar.childNodes[0].src.includes('images/bomb.png')){
                    ekoNumber++;
                } else if (g === 1){
                ekoVar = document.getElementById(Number(upVar) + h);
                if(ekoVar.childNodes[0].src.includes('images/bomb.png')){
                    ekoNumber++;
                }
            } else{
                ekoVar = document.getElementById(Number(upVar) + sizePx + h);
                if(ekoVar.childNodes[0].src.includes('images/bomb.png')){
                    ekoNumber++;
                }
            }
            
           //console.log(upVar);
           
            }
        }
        
    }
    console.log(ekoNumber);
}
//Kasta in Ekolod i tablecreator 
// fixa bombräkning

    

