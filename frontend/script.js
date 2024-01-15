
console.log("Heyo")

function generate(){
    const doc = fetch('http://localhost:3000/report');
    console.log("Document has been sent");
    console.log(doc);
}

function getData(){
    console.log("testing")
    console.log(document.getElementById('job_address').value)
    console.log(getCheckboxes('job_category'))
    console.log(document.getElementById('water_damage_class').value)
}

function generateRoom(){

}

function getCheckboxes(checkbox_parent){
    let checkedVals = []
    let inputElements = document.getElementsByClassName(checkbox_parent)
    for(let i=0; i < inputElements.length; i++){
        if(inputElements[i].checked){
            checkedVals.push(inputElements[i].value)
        }
    }
    return checkedVals
}
