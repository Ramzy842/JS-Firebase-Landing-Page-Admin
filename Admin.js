
const table = document.querySelector(".data table")
const numberOfEmails = document.querySelector(".numberOfEmails")
const refresh = document.querySelector(".header button")

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDGr1iRf7qIA07NraPO46cPR55KJCIP_bM",
    authDomain: "landingpage-cf490.firebaseapp.com",
    projectId: "landingpage-cf490",
    storageBucket: "landingpage-cf490.appspot.com",
    messagingSenderId: "844044880650",
    appId: "1:844044880650:web:58950e72cc8710be0e48f3",
    measurementId: "G-SV4E0R1TYL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

window.addEventListener("DOMContentLoaded", getData)

const createEntry = (name, email) => {
    let tableRow = document.createElement("tr")
    let nameColumn = document.createElement("td")
    let emailColumn = document.createElement("td");
    let deleteBtn = document.createElement("td");

    deleteBtn.classList.add("del")

    nameColumn.innerText = name;
    emailColumn.innerText = email;
    deleteBtn.innerText = "X";

    tableRow.appendChild(nameColumn);
    tableRow.appendChild(emailColumn);
    tableRow.appendChild(deleteBtn);

    table.appendChild(tableRow)
}


refresh.addEventListener("click", (e) => {
    getData();
})

refresh.addEventListener("dblclick", (e) => {
    location.reload();
})



let counter = 0;

function getData (){
    counter = 0;
    table.innerHTML = `<tr>
    <th>Name</th>
    <th>Email</th>
</tr>`
    db.collection("Entries").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            counter += 1
            //console.log(doc.id, " => ", doc.data());
            createEntry(doc.data().name,doc.data().email)
            //console.log(counter)
            numberOfEmails.innerText = counter
            
        });

        
    });
}



function deleteData (e){
    let clickedTarget = e.target;
    if (clickedTarget.classList.contains("del")) {
        console.log("target found")
        console.log(clickedTarget.parentElement.children[0].innerText)
        db.collection("Entries").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if(doc.data().name === clickedTarget.parentElement.children[0].innerText) {
                    let idOfDoc = doc.id;
                    db.collection("Entries").doc(idOfDoc).delete().then(() => {
                        clickedTarget.parentElement.remove()
                        console.log("Document successfully deleted!");
                        counter -= 1;
                        numberOfEmails.innerText = counter
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                    
                    
                }
                
                
            });
        });
        
    }
}

table.addEventListener("click", deleteData)







