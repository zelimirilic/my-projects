// event hendlers

document.getElementById('inputBtn').addEventListener('click', function () {
    searchProductById(document.getElementById('input').value);

});

api.searchAllProducts().then(function (value) {
    updateTable('mainTable', value);
});

// functions definitions

function searchProductById(searchId) {
    api.searchProductById(searchId)
        .then(function (val) {
            return Promise.all([
                api.searchProductsByPrice(val.price, 50),
                api.searchProductsByType(val.type),
                val
            ]);
        })
        .then(function (val) {
            var similarArr = getIntersection(val[0], val[1], val[2].id);
            updateExaminedText(val[2]);
            updateTable('similarTable', similarArr);
        })
        .catch(function (val) {
            alert(val);
        });
}

function getIntersection(arr1, arr2, searchedId) {
    var samePrice = arr1;
    var sameType = arr2;
    var similarArr = [];
    samePrice.forEach(function (obj1) {
        sameType.forEach(function (obj2) {
            if (obj1.id === obj2.id && obj1.id !== searchedId)
                similarArr.push(obj1);
        });

    });
    return similarArr;
}

function updateExaminedText(product) {
    var outputString = 'Product ID ' + product.id;
    outputString += '<br> Price: ' + product.price;
    outputString += '<br> Type: ' + product.type;
    document.getElementById('productText').innerHTML = outputString;
}

function createTableHeader(tableId) {
    var tableHeaderRow = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    th1.appendChild(document.createTextNode('ProductID'));
    th2.appendChild(document.createTextNode('Type'));
    th3.appendChild(document.createTextNode('Price'));
    th4.appendChild(document.createTextNode('Examine'));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArr) {
    var tableBody = document.getElementById(tableId);
    // reset table
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // create header of the table
    createTableHeader(tableId);
    // filling table rows
    for (var i = 0; i < productArr.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('button');
        td4.addEventListener('click', function () {

            searchProductById(this.parentNode.firstChild.innerHTML);

        });
        td1.appendChild(document.createTextNode(productArr[i].id));
        td2.appendChild(document.createTextNode(productArr[i].type));
        td3.appendChild(document.createTextNode(productArr[i].price));
        td4.appendChild(document.createTextNode('Examine'));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}













