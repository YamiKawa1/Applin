const getData = ()=> {
    url = 'http://localhost:4001/api/v1/products';
        options = { 
            method: 'GET'
        };

    fetch(url, options)
    .then(result =>{
        if (result.status == 204) {
            alert('there is no data, yet')
        
        } else if (result.status >= 400) {
            alert('internal error');

        } else if (result.status == 200) {
            return result.json()
       } 
    })
    .then(result => {
        if (result) {
            let index = 1;
            result.data.map((data) => {
                data.skus.map(sku => {
                    let newRow = document.createElement('tr')
                    newRow.innerHTML = `
                        <tr>
                            <th>${index}</th>
                            <td>${data.id}</td>
                            <td>${sku.name}</td>
                            <td>${sku.quantity}</td>
                        </tr>
                    `
                    document.getElementById('table-body').append(newRow);
                    index+=1;
                });
            })  
        }
    })
    .catch(error=> console.log(error))
}
getData();

let file;
csvFile = document.getElementById('csv');
csvFile.addEventListener('change', (event) => {
    file = event.target.files[0];
});

const saveFileData = () => {
    if (file) {
        url = 'http://localhost:4001/api/v1/products';
        const formData = new FormData();
        formData.append('file', file);
        options = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/csv'
            },
            body: formData
          };
        fetch(url, options)
    } else {
        alert('There is no file');
    }
}
 
