//plan storlek
var sizePx = 10;
const generated = [];
shuffler = () => {
    let assign = sizePx * sizePx;
    for(let x = 1; x <= sizePx; x++){
    let r = Math.floor(Math.random() * assign) + 1;
    generated.push(r);
    }
    return generated;
}

function tableCreator(){
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
            if (generated.includes(tile)){
               hidden = 'bomb';
            } else {
                hidden = 'facingDown'
            }
            var hiddenDiv = document.createElement('img');
            hiddenDiv.src = 'images/' + hidden + '.png';
            column.appendChild(hiddenDiv);
        }
    }
    console.log(tableVar)
}
shuffler();
tableCreator()
