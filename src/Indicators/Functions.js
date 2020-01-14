import firebase from 'firebase'

export function getNumber(value){
    var number = value.replace(",", ".");
    if (isNaN(number))
        return null;
    else
        return parseFloat(number);
}

export function downloadJsonFile(content, fileName){
    let file = new Blob([JSON.stringify(content)], {type: 'application/json'});
    let outputFileName = fileName + '.json'

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, outputFileName);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = outputFileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export function saveJsonFile(content, fileName){
    // let ref = firebase.storage().ref().child(fileName + '.json')
    // let file = new Blob([JSON.stringify(content)], {type: 'application/json'})
    // ref.put(file).then((snap) => {
    //     console.log('Uploaded!')
    // })

    let ref = firebase.storage().ref().child("message")
    var message = 'This is my message.';
    ref.putString(message).then(function(snapshot) {
      console.log('Uploaded a raw string!');
    });

}


export function getIndicatorStructure(type, name, parameters){
    return {
        id: "",
        type: type,
        name: name,
        parameters: parameters
    }
}
