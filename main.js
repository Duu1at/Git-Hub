const API = 'https://api.github.com/users/'



const input = document.getElementById('input')
const btn = document.getElementById('btn')
const output = document.getElementById('output')
const output2 = document.getElementById('output2')
const profile=document.getElementById('profile')
const container=document.getElementById('container')






if(localStorage.getItem('bg')==='changed'){
    container.style.backgroundColor='white'
}
if(localStorage.getItem('bg')==='changed'){
    container.style.backgroundColor='black'
}

if (localStorage.getItem('isChecked')){
    input.checked=true
}


input.addEventListener('change',()=>{
    if (localStorage.getItem('isChecked')==='true'){
        localStorage.removeItem('isChecked')
    }else{
        localStorage.setItem('isChecked',true)
    }
})

sun.addEventListener('click',()=>{
    if(localStorage.getItem('bg')==='changed'){
        localStorage.removeItem('bg')
        container.style.backgroundColor='white'
        container.style.color='black'
    }else{
        localStorage.setItem('bg','changed')
        container.style.backgroundColor='white'
        container.style.color='black'
    }
})

night.addEventListener('click',()=>{
    if(localStorage.getItem('bg')==='changed'){
        localStorage.removeItem('bg')
        container.style.backgroundColor='black'
        container.style.color='white'
    }else{
        localStorage.setItem('bg','changed')
        container.style.backgroundColor='black'
        container.style.color='white'
    }
})




const getUser = async () => {
    const req = await fetch(API + input.value)
    const res = await req.json()
    renderUser(res)
}




const getFollowers = async () => {
    const req = await fetch(API + input.value + '/followers')
    const res = await req.json()
    renderFollowers(res)
}
const renderFollowers = (info) => {
    output2.innerHTML=''
    info.forEach((el) => {
        let avatar = document.createElement('img')
        let name = document.createElement('h3')

        avatar.src = el.avatar_url
        name.innerHTML = el.login

        let card = document.createElement('div')
        
        output2.append(card)
        card.append(avatar, name)
    })
}




const getFollowing = async () => {
    const req = await fetch(API + input.value + '/following')
    const res = await req.json()
    renderFollowing(res)

}
const renderFollowing = (info) => {
    output2.innerHTML=''
    info.forEach((el) => {
        let avatar = document.createElement('img')
        let name = document.createElement('h3')

        avatar.src = el.avatar_url
        name.innerHTML = el.login

        let card = document.createElement('div')
        output2.append(card)
        card.append(avatar, name)
    })
}



const getRepos = async () => {
    const req = await fetch(API + input.value + '/repos')
    const res = await req.json()
    renderRepos(res)

}
const renderRepos = (info) => {
     
    output2.innerHTML=''
    
    info.forEach((el) => {
        let visibility = document.createElement('h3')
        let name = document.createElement('h3')

        visibility.innerHTML = el.visibility
        name.innerHTML = el.name
        
        let card = document.createElement('div')
        card.className='card'
        output2.append(card)
        card.append(name, visibility)
    
    })
   
}



const getOverview = async () => {
    const req = await fetch(API + input.value + 'overview')
    const res = await req.json()
    console.log(res)
    renderOverview(res)
}



const renderOverview =(info)=>{
output2.innerHTML=''
info.forEach((el)=>{
let img=document.createElement('img')
img.src=el.gists_url

card.className='card'
output2.append(card)
card.append(img)
})


}



const renderUser = (data) => {
   
    output.innerHTML = ''
 
    let output__child = document.createElement('div')
    output__child.className='output__child'
    let h1 = document.createElement('h1')
    let img = document.createElement('img')
    let profile__img = document.createElement('img')
    let followers = document.createElement('h5')
    let following = document.createElement('h5')
    let repos = document.createElement('h5')
    let overview = document.createElement('h5')
 

    
    repos.innerHTML='Repositories  '+data.public_repos
    overview.innerHTML=data.gists_url+'  Overview'
    followers.innerHTML = data.followers + ' followers'
    following.innerHTML = data.following + ' following'
    h1.innerHTML = data.login
    img.src = data.avatar_url
    profile.innerHTML=' '
    profile__img.src=data.avatar_url
   

    followers.addEventListener('click', () => {
        getFollowers()
    })
    following.addEventListener('click', () => {
        getFollowing()
    })

    repos.addEventListener('click', () => {
        getRepos()
    })

    output.append(output__child)
    output__child.append( img,h1, followers, following, repos)
  
    profile.append(profile__img)
}


btn.addEventListener('click',()=>{
    getUser()
})