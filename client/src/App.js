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
import Nav from './components/Nav'

import Settings from './components/Settings'



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
      return
    }
    alert('something went wrong!\nPlease refesh the page and try again.\nIf problems persist, email tech@mrc.org')
    setLoading(false)
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
              <div className="app-nav">
                <Nav />
              </div>
              <div className="app-main">
                <Route path="/dashboard/main">

                  <div className="app-main--body">
                    {
                      report === null && loading === false
                        ?
                        <>
                          <div className="app-main--body--date">
                            <div className="app-main--body--date--label">Select Date: </div>
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
                          <div className="app-main--body--report">
                            <div className="app-main--body--report--item">
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
                            <div className="app-main--body--report--item">
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
                </Route>
                <Route path="/dashboard/settings">
                  <Settings />
                </Route>
              </div>
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
