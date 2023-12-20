var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var btn = document.getElementById('btn');
var tableRow = document.getElementById('tableRow');
var searchInput = document.getElementById('searchInput');
var modal = document.getElementById('modalCard');



var bookMarkList = [];

if(localStorage.getItem('bookMark') != null){
    bookMarkList= JSON.parse(localStorage.getItem('bookMark'));
    display(bookMarkList)
    console.log(bookMarkList)
}

btn.onclick= function(){
    addBookMark();
    display(bookMarkList);
    if (validationName() == true && validationUrl() == true ){    
    clearForm();
    }
}

function addBookMark (){
    
    if (validationName() == true && validationUrl() == true ){    
    
        var bookMarks={
            siteName: siteNameInput.value,
            siteUrl : siteUrlInput.value
            }
        bookMarkList.push(bookMarks);
        localStorage.setItem('bookMark' , JSON.stringify(bookMarkList));
        console.log(bookMarkList);
    }   

    if (validationName() == false || validationUrl() == false ){    
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
}

function display (arrayList){
    var box = '';
    for(var i=0 ; i<arrayList.length ; i++){
        box += `
        <tr>
            <td>${i+1}</td>
            <td>${arrayList[i].siteName}</td>
            <td><button class='btn btn-outline-light' onclick="visit(${i})">Visit <i class="fa fa-eye fa-sm"></i></button></td>
            <td><button class='btn btn-outline-dark'  onclick= "deleteItem(${i})">Delete <i class="fa fa-trash fa-sm"></i></button></td>
        </tr>`
    }
        tableRow.innerHTML = box;

}

function deleteItem(index){
    bookMarkList.splice(index,1);
    localStorage.setItem('bookMark' ,JSON.stringify(bookMarkList))
    display(bookMarkList);
    console.log(bookMarkList)
}

function clearForm (){
    siteNameInput.value = '';
    siteUrlInput.value = ''
    

}

function searchItem (term){
    var matchItem = [];
    for(var i =0 ; i<bookMarkList.length ; i++){
        if(bookMarkList[i].siteName.toLowerCase().includes(term.toLowerCase()) == true){
            matchItem.push(bookMarkList[i]);
        }
    }
    
    console.log(matchItem);
    display(matchItem);
}

searchInput.oninput= function(){
    searchItem(this.value);  
}

function visit(index){
    
    var url = bookMarkList[index].siteUrl;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    window.location.href = url;
}




function validationName (){

    var text = siteNameInput.value;  
    var regexName = /^[A-Za-z]{3,20}$/; 
    console.log(regexName.test(text));

    if(regexName.test(text) == true){      
        
        siteNameInput.classList.add('is-valid'); 
        siteNameInput.classList.remove('is-invalid');

        return true; 
    }
    else{       
       
        siteNameInput.classList.add('is-invalid'); 
        siteNameInput.classList.remove('is-valid');

        return false; 
    }
}

siteNameInput.oninput= function(){
    validationName();
}

function validationUrl (){

    var text = siteUrlInput.value;  
    const pattern =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/    
    console.log(pattern.test(text));

    if(pattern.test(text) == true){        
        siteUrlInput.classList.add('is-valid'); 
        siteUrlInput.classList.remove('is-invalid');

        return true; 
    }
    else{ 

        siteUrlInput.classList.add('is-invalid'); 
        siteUrlInput.classList.remove('is-valid');
        return false; 
    }
}

siteUrlInput.oninput= function(){
    validationUrl();
}



