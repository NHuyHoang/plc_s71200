const fetchData = async () => {
    const a = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(data => data.json())
    console.log(a);
}