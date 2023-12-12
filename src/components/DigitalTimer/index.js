// Write your code here
import {Component} from 'react'
import './index.css'

const PlayUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PauseUrl = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class Digital extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Hours: 24,
      Minutes: 59,
      isStart: false,
      limitset: 25,
      isReseted: false,
    }
    console.log('constructer called')
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
    console.log('component did mount called')
  }

  componentWillUnmount() {
    console.log('Intervel cleared')
    clearInterval(this.timerID)
  }

  tick = () => {
    const {Minutes, Hours} = this.state
    this.setState(prevState => ({
      Minutes: prevState.Minutes - 1,
    }))

    if (Minutes <= 1) {
      this.setState(prevState => ({Hours: prevState.Hours - 1, Minutes: 59}))
    }
  }

  ontoggle = () => {
    this.setState(prevState => {
      const {isStart} = prevState

      return {isStart: !isStart}
    })
    const {isStart} = this.state
    if (isStart) {
      this.componentDidMount()
    } else {
      clearInterval(this.timerID)
    }
  }

  resetTimer = () => {
    const {Hours, Minutes} = this.state
    this.setState({Hours: 25, Minutes: 0, isReseted: true})
    clearInterval(this.timerID)
  }

  IncreaseHours = () => {
    const {isReseted} = this.state
    if (isReseted) {
      this.setState(prevState => ({
        Hours: prevState.limitset + 1,
        limitset: prevState.limitset + 1,
      }))
    }
  }

  DecreaseHours = () => {
    const {isReseted} = this.state
    if (isReseted) {
      this.setState(prevState => ({
        Hours: prevState.limitset - 1,
        limitset: prevState.limitset - 1,
      }))
    }
  }

  render() {
    const {isStart, Hours, Minutes, limitset} = this.state
    const imgUrl = isStart ? PlayUrl : PauseUrl
    const text = isStart ? 'pause icon' : 'play icon'
    const minutes = Minutes < 10 ? `0${Minutes}` : Minutes
    console.log(minutes)
    console.log('render called')

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="timer-container">
          <div className="digital-time-container">
            <div className="time-container">
              <h1 className="timer">
                {Hours} : {minutes}
              </h1>
              <p className="pause-running-heading">
                {isStart ? 'Paused' : 'Running'}
              </p>
            </div>
          </div>
          <div className="set-timer-container">
            <div className="button-icon-container">
              <button
                type="button"
                onClick={this.ontoggle}
                className="play-pause-button"
              >
                <img src={imgUrl} alt={text} className="icon-img" />
                <span className="spanE">{isStart ? 'Start' : 'Pause'}</span>
              </button>
              <button
                type="button"
                onClick={this.resetTimer}
                className="ResetBtn"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon-img"
                />
              </button>
              <p className="options">Reset</p>
            </div>
            <div>
              <p className="setlimit-heading">Set Timer Limit</p>
              <div className="button-icon-container">
                <button
                  type="button"
                  onClick={this.DecreaseHours}
                  className="add-decreaseBtn"
                >
                  -
                </button>
                <p className="TimeLimit">{limitset}</p>
                <button
                  type="button"
                  onClick={this.IncreaseHours}
                  className="add-decreaseBtn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Digital
