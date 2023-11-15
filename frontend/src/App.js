import './App.css';

const PORT = process.env.PORT()

async function fetchData(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: `${formData.get('url')}`}),
    };

    const getTitle = await fetch('https://ytb2mp3-stg-0840c0604471.herokuapp.com/', requestOptions).then((res) => res.json())

    const response = await fetch('https://ytb2mp3-stg-0840c0604471.herokuapp.com/', requestOptions, {responseType: 'blob'}).then((res) => res.blob())
    
    const url = window.URL.createObjectURL(new Blob([response], {type: 'audio/mpeg'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${getTitle.url}.mp3`);
    document.body.appendChild(link);
    link.click();

}

function App() {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Youtube MP3 Downloader</h1>
            <form onSubmit={fetchData}>
                <input name="url" placeholder="Link"/>
                <br/>
                <button type="submit" style={{margin:'20px'}}>Download</button>
            </form>
        </div>
        )
}

export default App;