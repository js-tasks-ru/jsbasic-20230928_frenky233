function makeFriendsList(friends) { 
  let ul = document.createElement('UL');
  ul.insertAdjacentHTML('beforeend', friends.map(item => `<li>${item.firstName} ${item.lastName}</li>`).join(''));
  return ul;
}