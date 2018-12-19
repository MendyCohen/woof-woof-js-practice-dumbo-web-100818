document.addEventListener('DOMContentLoaded', () => {

  const dogBar = document.querySelector('#dog-bar')
  const dogContainer = document.querySelector('#dog-summary-container')
  const filterDogs = document.querySelector('#good-dog-filter')

  filterDogs.addEventListener('click', filteringDogs)

  dogBar.addEventListener('click', populatingDivWithDog)
  dogContainer.addEventListener('click', togglingDog)

 fetchingDogs()

  function fetchingDogs(){
    fetch('http://localhost:3000/pups')
     .then(res => res.json())
     .then(dogsToPage)
  }

  let allDogs = [];

  function dogsToPage(dogs){
    dogs.forEach(dog => {
      allDogs.push(dog)

      dogBar.innerHTML += `
      <span id="${dog.id}">${dog.name}</span>
      `
    })
  }

  function populatingDivWithDog(e){
    if(e.target.tagName === 'SPAN'){
      allDogs.forEach(dog => {
        if(parseInt(e.target.id) === dog.id){
          if(dog.isGoodDog){
            dogContainer.innerHTML = `
              <h2>${dog.name}</h2>
              <img src="${dog.image}"><br>
              <button id="${dog.id}">Good Dog!</button>
            `
          }
          else {
            dogContainer.innerHTML = `
              <h2>${dog.name}</h2>
              <img src="${dog.image}"><br>
              <button id="${dog.id}">Bad Dog!</button>
            `
          }
        }
      })
      // debugger
    }
  }

  function togglingDog(e){
    if(e.target.tagName === 'BUTTON'){
      if(e.target.innerText === 'Good Dog!'){
        e.target.innerText = 'Bad Dog!'
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            isGoodDog: false
          })
        })
        // .then(res => res.json())
        // .then(togledDog)
      } else {
        e.target.innerText = 'Good Dog!'
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            isGoodDog: true
          })
        })
        // .then(res => res.json())
        // .then(togledDog)
      }
    }
  }

  // function togledDog(updatedDog){
  //   if(updatedDog.isGoodDog){
  //     dogContainer.innerHTML = `
  //       <h2>${updatedDog.name}</h2>
  //       <img src="${updatedDog.image}"><br>
  //       <button id="${updatedDog.id}">Good Dog!</button>
  //     `
  //   }
  //   else {
  //     dogContainer.innerHTML = `
  //       <h2>${updatedDog.name}</h2>
  //       <img src="${updatedDog.image}"><br>
  //       <button id="${updatedDog.id}">Bad Dog!</button>
  //     `
  //   }
  // }

  function filteringDogs(e){
    if(e.target.innerText.includes('OFF')){
      e.target.innerText = 'Filter good dogs: ON'
      dogBar.innerHTML = ''
      allDogs.forEach(dog => {
        if(dog.isGoodDog === true){
          dogBar.innerHTML += `
          <span id="${dog.id}">${dog.name}</span>
          `
        }
      })
     } else if (e.target.innerText.includes('ON')){
      e.target.innerText = 'Filter good dogs: OFF'
      dogBar.innerHTML = ''
      allDogs.forEach(dog => {
        dogBar.innerHTML += `
        <span id="${dog.id}">${dog.name}</span>
        `
      })
    }
  }
})
