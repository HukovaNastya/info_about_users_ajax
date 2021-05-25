const usersContainer = document.querySelector('.content');
const usersCount = 10;
const postsCount = 100
const tabsBody = document.querySelector('.tabs__body');
let users;

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

//Posts
async function fetchUsersPosts (userId){
  try{
    const response = await request(`posts/${userId}`);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

fetchUsersPosts(1);

async function getAllUsersPosts () {
  try {
    const arrayOfPromises = Array.from(new Array(postsCount)).map((post, index) => fetchUsersPosts(index + 1));
    const arrayOfPostsData = await Promise.all(arrayOfPromises);
    console.log(arrayOfPostsData);
    return arrayOfPostsData;
  } catch (err) {
    console.error(err);
  }
}

// getAllUsersPosts();
// async function getAllPostsOfUsers(id) {
//   try {
//     const user = await fetchUsers(id);
//     const postsPromises = user.id.map((id) => fetchUsersPosts (userId));
//     const posts = await Promise.all(postsPromises);
//     return posts;
//   } catch (err) {
//     console.error(err);
//   }
// }

// getAllPostsOfUsers();

// TODO создать функцию получения постов по id пользователя GET https://jsonplaceholder.typicode.com/posts?userId=1

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
  const tabsBlock = createTabsContentBody();
  users.forEach(user => tabsBlock.insertAdjacentHTML('beforeend', createTabBlock(user)));
  tabsBody.appendChild(tabsBlock);
}

function createTabsContentBody() {
  const tabsBlock = document.createElement('div');
  tabsBlock.classList.add('tabs__content-list');
  return tabsBlock;
}

function createTabBlock({id, username, email, address}) {
  return `
    <div id="tab_${id}" data-user-id="${id}" class="tabs__block">
       <p> username: ${username} (email:  ${email})</p>
       <p> ${addressToString(address)} </p>
       <p> ${geoToString(address.geo)} </p>
    </div>
  `;
}

function addressToString({ zipcode, city, street, suite } = {}) {
  return `${zipcode} - ${city}, ${street} ${suite}`;
}

function geoToString({lat = '', lng = ''} = {}) {
  return `X: ${lat} Y: ${lng}`;
}

function tabItemClickHandler(evt) {
  const target = evt.currentTarget.getAttribute('href');
  // const userId = evt.currentTarget.getAttribute('data-user-id')
  // console.log(userId)
  // if(users.id === posts.userId){
  //   renderTabsContentPosts(posts)
  // }

  deactivateActiveTabContent()
  setActiveTabContent(target)
}

// function getUserId (evt){
//   const userId = evt.currentTarget.getAttribute('data-user-id')
//   console.log(userId)
// }


function setActiveTabContent(target) {
  const currentTab = document.querySelector(target);
  console.log(currentTab);
  const id = currentTab.getAttribute('data-user-id');
  console.log(id);

  // const filterPosts = posts.filter(post => post.userId === id);
  // console.log(filterPosts )

  // TODO Получить id пользователя из data-user-id
  if (!currentTab) return
  currentTab.classList.add('tabs__block-active');
  // currentTab += getUserPostsHandler();
  // // getUserPostsHandler(id)

}


// async function filterPosts (users, posts){
//   users = await getAllUsers();
//   posts = await getAllUsersPosts();
//   const getFilterPosts = posts.filter(post => post.userId === users.id);
//   console.log(getFilterPosts)
// }
// filterPosts()
// TODO getUserPostsHandler
function getUserPostsHandler({title, body}){
  return `
  <div  class="tabs__block-active">
     <p> title: ${title} </br> body: ${body})</p>
  </div>
`;
}


function renderTabsContentPosts(posts) {
  const tabsBlock = createTabsContentBody();

  // console.log(posts)
  posts.forEach(post => tabsBlock.insertAdjacentHTML('beforeEnd', getUserPostsHandler(post)));
  tabsBody.appendChild(tabsBlock);
  console.log(tabsBody)
}




function deactivateActiveTabContent() {
  const currentActiveTab = document.querySelector('.tabs__block-active')
  if (currentActiveTab) {
    currentActiveTab.classList.remove('tabs__block-active')
  }
}

function setFirstActiveTab(users) {
  const [user] = users
  const firstTabContentId = `#tab_${user.id}`
  setActiveTabContent(firstTabContentId)
}

async function initApp() {
  try {
    users = await getAllUsers();
    posts = await getAllUsersPosts();
    renderTabs(users)
    renderTabsContent(users)
    renderTabsContentPosts(posts)
    setTabsEvents()
    setFirstActiveTab(users)
  } catch (err) {
    console.error(err)
  }
}



initApp();
