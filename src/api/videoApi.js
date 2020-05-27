const baseUrl = 'http://14.18.195.212:10022'
export default {
    getMenu: baseUrl + '/api/v1/tvapph5/getMenu',
    getDramaAndVideo: baseUrl + '/api/v1/tvapph5/getDramaAndVideo',
    getEpisode: baseUrl + '/api/v1/tvapph5/getEpisode',
    getClick: baseUrl + '/api/v1/tvapph5/getClick',
    getCollect: baseUrl + '/api/v1/tvapph5/getCollect',
    addCollect: baseUrl + '/api/v1/tvapph5/addCollect',
    checkUser: baseUrl + '/api/v1/tvapph5/verifyuser',
    updateToken:baseUrl + '/api/v1/tvapph5/refreshusertoken',
    serviceAuth:baseUrl+'/api/v1/tvapph5/serviceAuth',
    addOrder:baseUrl+'api/v1/tvapph5/addOrder'
}