const BaseUrl = 'http://192.168.0.105:8080/wepay'

export default class HttpUtils {

    static getData(url) {
        console.log(url)
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    console.log(JSON.stringify(result))
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static postData(url, data) {
        console.log(url+JSON.stringify(data))
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log(JSON.stringify(result))
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    //使用案例
    componentDidMount() {
        HttpUtils.getData('https://www.baidu.com')
            .then(result => {
                this.setState({
                    result: 'result',
                    // result:JSON.stringify(result),
                })
            })
            .catch(error => {
                this.setState({
                    result: error.toString()
                })
            })
    }
}