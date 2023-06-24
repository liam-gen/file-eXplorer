element_model = `<img src="cdn/{{type}}.png"><p>{{name}}</p>`

function createElement(basename, name, infos){
    const element = document.createElement("div");
    element.className = "element"

    let id = Math.floor(Math.random() * 10000)

    add = "/"
        if(basename == window.os){
            add = ""
        }

    if(infos.isDirectory()){
        element.id = "folder-"+id
        element.setAttribute("path", basename+add+name)
        element.innerHTML = element_model.replaceAll("{{type}}", "folder").replaceAll("{{name}}", name)
        element.onclick = function(){
            const url = new URL(window.location.href)
            url.searchParams.delete("path")
            console.log(url)
            window.location.href = url.href+"?path="+basename+add+name
        }
    }
    else{

        element.id = "file-"+id
        
        element.setAttribute("path", basename+add+name)
        element.innerHTML = element_model.replaceAll("{{type}}", "file").replaceAll("{{name}}", name)
        element.onclick = function(){
            var cpm = require('child_process');
            path = basename+add+name
            cpm.exec(`"${path}"`, function(err, stderr, output) {
                console.log(err, stderr, output)
                if(err){
                    try{
                        cpm.exec(`notepad.exe "${path}"`)
                    }catch(e){
                        console.error(e)
                    }
                }
            })  
        }          
    }

    return element
}

document.getElementById("back").onclick = function(){history.back()}
document.getElementById("forward").onclick = function(){history.forward()}

function copyPath(){
    const path = document.getElementById("path").value.replaceAll("/", "\\")
    return navigator.clipboard.writeText(path);
}

document.getElementById("path").onfocus = function(){
    console.log(document.getElementById("path").value.replace(window.os, "").split("/"))
    document.getElementById("path").select()
}