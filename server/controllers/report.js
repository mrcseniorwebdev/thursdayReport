const reportRouter = require('express').Router()
const axios = require('axios')
const { authCheck } = require('../utils/authMiddleware')
const { getToken } = require('../utils/utils')
reportRouter.use(authCheck)

const getUrl = fburl => {
    //use regex to extract the url from the attachment
    const matches = fburl.match(/\?u=(.+?)&h=/)
    //matches[1] will whatever is found in the regex group (our encoded url)
    //return the decoded url
    return decodeURIComponent(matches[1])
}

const fbGraphURL = 'https://graph.facebook.com/v12.0'

reportRouter.post('/', async (req, res) => {


    const [beginingDate, endDate] = req.body

    //get the access token for the FB user
    const userAccessToken = await getToken()

    const pageIds = ['newsbusters', 'mrctv', 'cnsnewscom', 'mediaresearchcenter']
    // const pageId = 'mrctv'

    const photoMap = new Map()
    const linkMap = new Map()

    await Promise.all(pageIds.map(async pageId => {
        console.log(pageId)
        //first lets get the page access token
        let response = await axios.get(`${fbGraphURL}/${pageId}`, {
            params: {
                'fields': 'access_token',
                'access_token': userAccessToken
            }
        })
        const pageAccessToken = response.data.access_token
        // console.log('pageAccessToken', pageAccessToken)

        let pageItems = []

        response = await axios.get(`${fbGraphURL}/${pageId}/posts`, {
            params: {
                'fields': 'message,created_time,permalink_url,status_type,attachments,insights.metric(post_impressions_unique, post_engaged_users),reactions.summary(true),shares.summary(true),comments.limit(0).summary(true)',
                'since': new Date(beginingDate).getTime() / 1000,
                'until': new Date(endDate).getTime() / 1000,
                'limit': 100,
                'access_token': pageAccessToken
            }
        })

        pageItems.push(...response.data.data)
        let next = response.data.paging.next
        while (next) {
            response = await axios.get(next)
            pageItems.push(...response.data.data)
            next = response.data.paging.next
        }

        // console.log(pageId, pageItems)
        // console.log(mrctvItems)


        pageItems = pageItems
            .map(elem => {
                return {
                    type: elem.status_type,
                    reactions: elem.reactions.summary.total_count,
                    shares: elem?.shares ? elem.shares.count : 0,
                    comments: elem.comments.summary.total_count,
                    message: elem.message,
                    // created: new Date(elem.created_time).toLocaleDateString(),
                    fbpostlink: elem.permalink_url,
                    post_impressions_unique: elem.insights.data[0].values[0].value,
                    post_engaged_users: elem.insights.data[1].values[0].value,
                    story_url: elem.status_type === 'shared_story' ? getUrl(elem.attachments.data[0].url) : false
                }
            })

        // .sort((a, b) => b.post_impressions_unique - a.post_impressions_unique)

        pageItems
            .filter(elem => elem.type === 'added_photos')
            .forEach(elem => {
                if (photoMap.has(elem.message)) {
                    const old = photoMap.get(elem.message)
                    photoMap.set(elem.message, {
                        ...old,
                        reactions: old.reactions + elem.reactions,
                        shares: old.shares + elem.shares,
                        comments: old.comments + elem.comments,
                        post_impressions_unique: old.post_impressions_unique + elem.post_impressions_unique,
                        post_engaged_users: old.post_engaged_users + elem.post_engaged_users

                    })
                }
                else {
                    photoMap.set(elem.message, elem)
                }
            })

        pageItems
            .filter(elem => elem.type === 'shared_story')
            .forEach(elem => {
                if (linkMap.has(elem.story_url)) {
                    const old = linkMap.get(elem.story_url)
                    linkMap.set(elem.story_url, {
                        ...old,
                        reactions: old.reactions + elem.reactions,
                        shares: old.shares + elem.shares,
                        comments: old.comments + elem.comments,
                        post_impressions_unique: old.post_impressions_unique + elem.post_impressions_unique,
                        post_engaged_users: old.post_engaged_users + elem.post_engaged_users
                    })
                }
                else {
                    linkMap.set(elem.story_url, elem)
                }
            })




        // console.log(pageId, pageItems)
    }))

    // console.log(photoMap)
    let sortedPhotos = []
    photoMap.forEach(value => {
        sortedPhotos.push(value)
    })

    sortedPhotos = sortedPhotos
        .map(elem => {
            return {
                ...elem,
                total: elem.comments + elem.reactions + elem.shares
            }
        })
        .sort((a, b) => b.post_impressions_unique - a.post_impressions_unique)
    // console.log('sortedPhotos', sortedPhotos)

    let sortedLinks = []
    linkMap.forEach(value => {
        sortedLinks.push(value)
    })

    sortedLinks = sortedLinks
        .map(elem => {
            return {
                ...elem,
                total: elem.comments + elem.reactions + elem.shares
            }
        })
        .sort((a, b) => b.post_engaged_users - a.post_engaged_users)
    // console.log('sortedLinks', sortedLinks)

    const retArray = {
        topPhoto: sortedPhotos[0],
        topLink: sortedLinks[0]
    }
    // console.log('fin')

    res.json(retArray).send()
})

module.exports = reportRouter
