

const usersCount = 10;
const usersContainer = document.getElementById('wrapper');


async function request (route, options = {method: "GET"}) {
  const API_URL = "https://jsonplaceholder.typicode.com";
  return await fetch(`${API_URL}/${route}`, options)
  .then((response) => {return response.json()});
}

async function fetchUsers(id){
  try{
    const response = await request(`users/${id}`);
    return response;
  }catch(err){
    console.log(err);
    throw err;
  }
}



async function getAllUsers() {
	try {
		const arrayOfPromises = Array.from(new Array(usersCount)).map((user, index) => fetchUsers(index + 1))
		const arrayOfUsersData = await Promise.all(arrayOfPromises);
    console.log(arrayOfUsersData)
		renderUsers(arrayOfUsersData);
	} catch (err) {
		console.error(err);
	}
}

function renderUsers(arr) {
	const fragment = document.createDocumentFragment()
	arr.forEach(item => {
		const el = createUsersTabs(item)
		fragment.appendChild(el)
	})

	UsersContainer.appendChild(fragment)
}




function createUsersTabs (response){
  const fragment = document.createDocumentFragment();
  response.forEach( user => {
     const card = document.createElement('div');
     card.classList.add('card');
     const cardBody = document.createElement('div');
     cardBody.classList.add('card-body');
    const tittle = document.createElement('h5');
    tittle.classList.add('card-title');
    tittle.textContent = user.name;
    const article = document.createElement('p');
    article.classList.add('card-text');
    article.textContent = user.email;
    cardBody.appendChild(tittle);
    cardBody.appendChild(article);
    card.appendChild(cardBody);
    fragment.appendChild(card);
  })
  container.appendChild(fragment);
 }

getAllUsers();