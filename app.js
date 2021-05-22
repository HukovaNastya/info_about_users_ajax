const usersContainer = document.querySelector('.content');
const usersCount = 10;
const tabsBody = document.querySelector('.tabs__body');
let users;
const tabsList =  document.querySelectorAll('.tabs__block');
// console.log(tabsList)




async function request(route, options = { method: "GET" }) {
  const API_URL = "https://jsonplaceholder.typicode.com";
  return await fetch(`${API_URL}/${route}`, options)
    .then((response) => { return response.json() });
}

async function fetchUsers(id) {
  try {
    const response = await request(`users/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const arrayOfPromises = Array.from(new Array(usersCount)).map((user, index) => fetchUsers(index + 1));
    const arrayOfUsersData = await Promise.all(arrayOfPromises);
    return arrayOfUsersData
  } catch (err) {
    console.error(err);
  }
}

function renderTabs(users) {
  const wrapper = createTabsWrapper()
  users.forEach(user => wrapper.insertAdjacentHTML('beforeend', createTabItem(user.id, user.name)))

  usersContainer.prepend(wrapper)
}

function createTabsWrapper() {
  const wrapper = document.createElement('nav')
  wrapper.classList.add('tabs__items')
  return wrapper
}

function createTabItem(id, name) {
  return `
    <a href="#tab_${id}" data-user-id="${id}" class="tabs__item">
        <span>${name}</span>
    </a>
  `
}

function setTabsEvents() {
  const items = document.querySelectorAll('.tabs__item')
  items.forEach(item => item.addEventListener('click', tabItemClickHandler));

}

function renderTabsContent(users) {
  // console.log(users)
  const tabsBlock = createTabsContentBody();
  users.forEach(user => tabsBlock.insertAdjacentHTML('beforeend', createTabBlock(user.id, user.username, user.email, user.address)));
  tabsBody.appendChild(tabsBlock);
}

function createTabsContentBody() {
  const tabsBlock = document.createElement('div');
  tabsBlock.classList.add('tabs__block');

  return tabsBlock;
}

function createTabBlock(id, username, email, address) {
  const tabStr = `
    <div id="tab_${id}" data-user-id="${id}" class="tabs__list">
       <p> username: ${username} (email:  ${email})</p>
       <p> ${addressToString(address)} </p>
       <p> ${geoToString(address.geo)} </p>
    </div>
  `;
  // console.log(tabStr)
  return tabStr;
}

function addressToString(address) {
  const addressSring = `${address.zipcode} - ${address.city}, ${address.street} ${address.suite}`;
  return addressSring;
}

function geoToString(geo) {
  const str = `X: ${geo.lat} Y: ${geo.lng}`;
  return str;
}

function tabItemClickHandler(evt) {
  const target = evt.currentTarget.getAttribute('href');

  console.log(target);

  let currentTab = document.querySelector(target);
  console.log(currentTab)
  // let tabsBtn = document.querySelector('.tabs__block-active');



  tabsList.forEach(function(item){
   item.classList.remove('tabs__block-active')

  })

  currentTab.classList.add('tabs__block-active');


}

async function initApp() {
  try {
    users = await getAllUsers()
    renderTabs(users)
    renderTabsContent(users)
    setTabsEvents()


    // TODO сделать первый таб и его контент активным.
    // TODO Получить данные про посты пользователя GET https://jsonplaceholder.typicode.com/posts?userId=1
  } catch (err) {
    console.error(err)
  }
}



initApp();
