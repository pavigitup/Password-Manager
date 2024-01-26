import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    addPassword: false,
    passwordList: [],
    website: '',
    username: '',
    searchInput: '',
    password: '',
    count: 0,
    showPassword: false,
  }

  getWebsite = event => {
    this.setState({website: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getSearchInput = event => {
    const inputValue = event.target.value
    this.setState({searchInput: inputValue})
  }

  deletePassword = id => {
    this.getDeleteId(id)

    this.setState(
      prevState => ({
        count: prevState.count - 1,
      }),
      () => {
        const {count} = this.state
        if (count === 0) {
          this.setState({addPassword: false})
        }
      },
    )
  }

  getDeleteId = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachList => eachList.id !== id)
    this.setState({passwordList: filteredList})
  }

  handlePasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    this.setState({addPassword: true})
    const newList = {
      id: uuidV4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newList],
      count: prevState.count + 1,
    }))
    this.setState({
      website: '',
      username: '',
      password: '',
    })
  }

  render() {
    const {
      addPassword,
      passwordList,
      website,
      username,
      password,
      count,
      showPassword,
      searchInput,
    } = this.state

    const searchResult = passwordList.filter(each => {
      const eachItem = each.password.toLowerCase()
      return eachItem.includes(searchInput.toLowerCase())
    })

    return (
      <div className="bg-con">
        <div className="app-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-manager-icon"
          />
        </div>
        <div className="card-1">
          <form className="password-card-con" onSubmit={this.addPassword}>
            <h1 className="header">Add New Password</h1>
            <div className="card-tag">
              <div className="site-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
              </div>
              <div className="website-input-box">
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="web-input"
                  onChange={this.getWebsite}
                  value={website}
                />
              </div>
            </div>
            <div className="card-tag">
              <div className="site-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
              </div>
              <div className="website-input-box">
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="web-input"
                  value={username}
                  onChange={this.getUsername}
                />
              </div>
            </div>
            <div className="card-tag">
              <div className="site-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
              </div>
              <div className="website-input-box">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="web-input"
                  value={password}
                  onChange={this.getPassword}
                />
              </div>
            </div>
            <div className="add-btn-con">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
          <div className="manager-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
        </div>
        <div className="card-2">
          <div className="pass-con">
            <div className="pass-letter-con">
              <h1 className="pass-h">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>

            <div className="search-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.getSearchInput}
              />
            </div>
          </div>
          <div className="horizontal-line" />
          <div className="check-box-con">
            <input
              type="checkbox"
              id="tick"
              className="search-tick"
              onChange={this.handlePasswords}
            />
            <label htmlFor="tick" className="pass-tick">
              Show Passwords
            </label>
          </div>

          {!addPassword || searchResult.length === 0 ? (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="password-manager-img"
                />
              </div>
              <p className="res-para">No Passwords</p>
            </div>
          ) : (
            <ul>
              {searchResult.map(eachPassword => (
                <li key={eachPassword.id} className="list-con">
                  <div>
                    <p>{eachPassword.website}</p>
                    <p>{eachPassword.username}</p>
                    {showPassword ? (
                      <p>{eachPassword.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="delete-btn"
                      data-testid="delete"
                      onClick={() => this.deletePassword(eachPassword.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="del-btn-img"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
