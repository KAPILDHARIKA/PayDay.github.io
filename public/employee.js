function showForm(){
    console.log("test")
    document.getElementById("helpForm").style.display = "block"

}

function resolveHelp(id){
   location.href = "/manager/resolve/" + id;
}