var all = [];

var fromStorage = localStorage.getItem('all');

if (fromStorage != null){
    all = JSON.parse(fromStorage);
}

function add(){
        
    var name = parseInt(document.querySelector('#product').value);
    var price = { price: name };
    all.push(price);
    render();
       
    localStorage.setItem('all', JSON.stringify(all));

    document.querySelector('#product').value = '';
}
render ();
function del (index) {
    all.splice(index, 1);
    render ();

    localStorage.setItem('all', JSON.stringify(all));
}

function render (){
    document.querySelector('#list').innerHTML = '';

    for (var i = 0; i < all.length; i++) {
        document.querySelector('#list').innerHTML += `<li class="list-group-item">${all[i].price} <i class="fa fa-times" aria-hidden="true" 
        onClick = "del(${i})"></i></li> `
    }

    var sum = 0;
    for(var i = 0; i < all.length; i++){
        sum += all[i].price;
    }
    
     document.querySelector('#jami').innerHTML = 'Jami ' + sum + ' so\'m.'
}

function deleteAll(){

    all = [];
    render();
    localStorage.setItem('all', JSON.stringify(all));
}

function downloadAll() {
    var content = 'price\n';
    for(var i = 0; i < all.length; i++ ) {
        content += all[i].price + '\n';
    }
    
    download(content, 'alldata.csv', 'text/csv')
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}










