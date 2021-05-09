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
	try{
		const arrayOfPromises = Array.from(new Array(usersCount)).map((user, index) => fetchUsers(index + 1))
		const arrayOfUsersData = await Promise.all(arrayOfPromises);
    console.log(arrayOfUsersData)
		renderUsers(arrayOfUsersData);
	} catch (err) {
		console.error(err);
	}
}



function createUsersTabs (respanse){
  const fragment = document.createDocumentFragment();
  response.forEach( user => {
    const content = document.createElement('div');
    content.classList.add('content');
    const tabs = document.createElement('div');
    tabs.classList.add('tabs');
    const tabsItems = document.createElement('div');
    tabsItems.classList.add('tabs__items');
    const tabsItem = document.createElement('a');
    tabsItem.classList.add('tabs__item');
    const span = document.createElement('span');
    span.textContent = user.name;
    tabsItem.appendChild(span);
    tabsItems.appendChild(tabsItem);
    tabs.appendChild(tabsItem);
    content.appendChild(tabs);
    fragment.appendChild(content);
 })
 usersContainer.appendChild(fragment);
 }

getAllUsers();