/*
function getClasses(){
    
    //var output = document.getElementById('text')
    //output.innerHTML = "new content"
    fetch('classes.json')
    .then(function (response){
      return response.json()
    })
    .then(function (classes){
        console.log(classes)
      for(var i = 0; i < classes.length; i++){
        if (classes[i].Name === "ece361"){
            document.getElementById("text").innerHTML += classes[i]
        }
      }        
    })   

}
*/


function getFormInfo(){
    var newInfo = document.getElementById('message-text').value 
    var className = document.getElementById('title').innerHTML
    if(newInfo && className == 'ece361'){
        addFormEce(className, newInfo)
    }
    else if (newInfo && className == 'math'){
        addFormMath(className, newInfo)
    }
    else if (newInfo && className == 'c'){
        addFormC(className, newInfo)
    }
    else{
        alert('please enter notes')
    }
}

function addFormEce(name, textInfo){
    let newNotes = {Text: textInfo}
    var reqURL = name
    var newBody = JSON.stringify(newNotes)
        fetch(reqURL,
             {method: 'POST', 
             headers: {'Content-type': 'application/json'}, 
             body: newBody
        }).then(function (res){
            return res.json()
        }).then(function (data){
            let newLength = data.length
            document.getElementById('ecs-name').innerHTML += "<br />" + data[newLength - 1].Text 
        })  
        

}

function addFormMath(name, textInfo){
    let newNotes = {Text: textInfo}
    var reqURL = name
    var newBody = JSON.stringify(newNotes)
        fetch(reqURL, 
            {method: 'POST', 
            headers: {'Content-type': 'application/json'}, 
            body: newBody
        }).then(function (res){
            return res.json()
        }).then(function (data){
            let newLength = data.length
            document.getElementById('math-name').innerHTML += "<br />" + data[newLength - 1].Text 
        })  
}

function addFormC(name, textInfo){
    let newNotes = {Text: textInfo}
    var reqURL = name
    var newBody = JSON.stringify(newNotes)
        fetch(reqURL, 
            {method: 'POST', 
            headers: {'Content-type': 'application/json'}, 
            body: newBody
        })
        .then(function (res){
            return res.json()
        }).then(function (data){
            let newLength = data.length
            document.getElementById('c-name').innerHTML += "<br />" + data[newLength - 1].Text 
        })  
}

window.addEventListener('DOMContentLoaded', function(){
    var submitInfo = document.getElementById('save-changes')
    if (submitInfo){
        submitInfo.addEventListener('click', getFormInfo)
    }
    
})
