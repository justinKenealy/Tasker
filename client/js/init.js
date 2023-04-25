import renderHeader from "./components/renderHeader.js";
import renderLeftPane from "./components/renderLeftPane.js";

axios.get('/api/session')
.then(({data}) => {
    if('user' in data){
        renderHeader(data.user)
        renderLeftPane(data.user)
    }else{
        window.location = '/entry.html'
    }
}).catch(err => console.error(err))
