import { fetchUserData, fetchRepositories } from './gateways.js'
import { renderUserData } from './user.js'
import { renderRepos, cleanRepoList } from './repos.js'
import { showSpinner, hideSpinner } from './spinner.js'

export const defaultUser = {
  avatar_url: 'https://avatars3.githubusercontent.com/u10001',
  name: '',
  location: '',
}

renderUserData(defaultUser)

const showUserBtnElem = document.querySelector('.name-form__btn')
const userNameInputElem = document.querySelector('.name-form__input')
const listElem = document.querySelector('.repo-list')

const onSearchUser = () => {
  showSpinner()
  cleanRepoList()
  const userName = userNameInputElem.value
  fetchUserData(userName)
    .then(userData => {
      renderUserData(userData)
      return userData.repos_url
    })
    .then(url => fetchRepositories(url))
    .then(reposList => {
      renderRepos(reposList)
      hideSpinner()
    })
    .catch(err => {
      hideSpinner()
      alert(err.message)
    })
    .finally(() => {
      hideSpinner()
    })
}

showUserBtnElem.addEventListener('click', onSearchUser)
