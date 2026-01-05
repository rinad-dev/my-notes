let users=[]

const getusers=JSON.parse(localStorage.getItem('users'));
let active_users=JSON.parse(localStorage.getItem('active_user'));

console.log(active_users);

if(getusers){
    users=[...getusers]
}
if(active_users){
    document.querySelector('.profile p').innerHTML=active_users.username;
    document.querySelector('.nav').style.display='flex';
    document.querySelector('.notes').style.display='flex';
    displaynotes();
    document.querySelector('.login').style.display='none';
}

function login(){
    console.log(active_users);



    let change=document.getElementById('change');

const username=document.getElementById('username').value;
const password=document.getElementById('password').value;

const find_user=users.find(ele=>ele.username === username && ele.password === password);
if(!find_user){
    change.innerHTML='invalid username or password'
    change.style.color='red';
return;
}
if(!username || !password){
    change.innerHTML='enter username or password'
    change.style.color='red';
    return;
}
document.querySelector('.profile p').innerHTML=username;


active_users = find_user;
localStorage.setItem('active_user',JSON.stringify(find_user));
document.querySelector('.nav').style.display='flex';
document.querySelector('.notes').style.display='flex';
document.querySelector('.login').style.display='none'
displaynotes();

}



function logout(){
document.querySelector('.nav').style.display='none';
document.querySelector('.login').style.display='flex';
localStorage.removeItem('active_user');
 document.querySelector('.notes').style.display='none';
}

function getsignup(){
document.querySelector('.signup').style.display='flex';
document.querySelector('.login').style.display='none';
}


function signup(){
const username=document.getElementById('username_signup').value;
const password=document.getElementById('paswword_signup').value;
const age_signup=document.getElementById('age_signup').value;
const chank=document.getElementById('chank');
if(!username || !password){
    chank.innerHTML='invalid username or password'
    chank.style.color='red';
    return;
}
if(password !== age_signup){
     chank.innerHTML=' sorry! passwords dont match'
    chank.style.color='red';
    return;
}
const new_user={
    id:users.length + 1,
    username,
    password
}

document.querySelector('.signup').style.display='none';
document.querySelector('.nav').style.display='flex';


document.querySelector('.profile p').innerHTML=username;
users.push(new_user);
localStorage.setItem('users',JSON.stringify(users));
localStorage.setItem('active_user',JSON.stringify(new_user))

}
function getlogin(){
    document.querySelector('.signup').style.display='none';
document.querySelector('.login').style.display='flex';
}


function displaynotes(){

    console.log('runing....');
     const notes_div = document.querySelector('.notes');
     notes_div.innerHTML = "";

        const getNotes = JSON.parse(localStorage.getItem("notes"))
      
        if(getNotes){
            getNotes.map((note)=>{

                if(note.createdBy !== active_users.username) return;
                // if(note.createdBy !== "Renad Talal") return; // active_user.username
                
                notes_div.innerHTML += `
            <div class="note">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
                <h3>${note.createdBy}</h3>
            </div>
                `
            })
        }
}