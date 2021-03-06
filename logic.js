document.getElementById("myForm").addEventListener("submit",saveBookmark);

function saveBookmark(){
    var siteName = document.getElementById("Sitename").value;
    var siteUrl = document.getElementById("SiteUrl").value;

    if(!validateForm(siteName, siteUrl)){
        return false;
      }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
   
 
if (localStorage.getItem("bookmarks") === null)
{
    var bookmarks =[];

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
}
else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
   // console.log( localStorage.setItem("bookmarks", JSON.stringify(bookmarks)));
} 

document.getElementById('myForm').reset();
fetchbookMark();

}

function deleteBookmark(url){
    //console.log(url);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url= url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchbookMark();

}


function fetchbookMark(){
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    var bookmarksresult = document.getElementById('bookmarkresult');

    bookmarksresult.innerHTML = '';
    for(var i =0; i<bookmarks.length; i++){
        var name =  bookmarks[i].name;
        var url =   bookmarks[i].url;
        
    bookmarksresult.innerHTML += '<div class="well">'+
                                  '<h3>' + name +
                                  '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';

    }
}

// validate from

function validateForm(siteName, siteUrl){
         
    if(!siteName || !siteUrl){
        alert("Please fill in the form");
        return false;
     }
     var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
     var regex = new RegExp(expression);
   
     if(!siteUrl.match(regex)){
       alert('Please use a valid URL');
       return false;
     }

     return true;
   
}
    