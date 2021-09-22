import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch, Route

} from "react-router-dom"
import Login from './components/Login'
import { NewAdSvg, LoadingSVG } from './components/svg'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import './sass/app.scss'
import { generateReport } from './utils/requests'



const App = () => {

  const [dates, setDates] = useState([])
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateReport = async () => {
    console.log('report!')
    setLoading(true)
    const resp = await generateReport(dates)
    if (resp) {
      setReport(resp.data)
      setLoading(false)

    }
  }

  const handleDate = (dateArray) => {
    setDates(dateArray)
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>


        <Route path="/dashboard">
          <div className="app-wrapper">
            <div className="app">
              {
                report === null && loading === false
                  ?
                  <>
                    <div className="app--date">
                      <div className="app--date--label">Select Date:</div>
                      <DateRangePicker onChange={handleDate} />
                    </div>
                    {
                      dates.length > 0
                        ?
                        <button className="hoverAnim" onClick={handleGenerateReport}><NewAdSvg /><span>Generate Report</span></button>
                        : false
                    }
                  </>
                  : report === null && loading === true
                    ?
                    <>
                      <LoadingSVG />
                      <h1>Loading...</h1>
                    </>
                    :
                    <div className="app--report">
                      <div className="app--report--item">
                        <h3>
                          Best Facebook Image
                        </h3>
                        <a href={report.topPhoto.fbpostlink} target="_blank" rel="noreferrer">{report.topPhoto.message}</a>
                        <p>
                          <strong>
                            Reach: {report.topPhoto.post_impressions_unique}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Comments: {report.topPhoto.comments}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Likes: {report.topPhoto.reactions}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Shares: {report.topPhoto.shares}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Total: {report.topPhoto.total}
                          </strong>
                        </p>
                      </div>
                      <div className="app--report--item">
                        <h3>
                          Best Engagement Rate
                        </h3>
                        <a href={report.topLink.story_url} target="_blank" rel="noreferrer">{report.topLink.message}</a>
                        <p>
                          <strong>
                            Reach: {report.topLink.post_impressions_unique}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Comments: {report.topLink.comments}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Likes: {report.topLink.reactions}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Shares: {report.topLink.shares}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Total: {report.topLink.total}
                          </strong>
                        </p>
                      </div>
                    </div>
              }
            </div>
          </div>
        </Route>
        <Route path="/*">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
