import ogs from 'open-graph-scraper'
const promises = []
process.stdin.setEncoding('utf-8');
for await (const url of process.stdin) {
    promises.push(
        ogs({url: url.trim()})
            .then(({error, result}) => {
                const s = JSON.stringify(result)
                if (error) {
                    throw new Error(s)
                }
                console.log(s)
            })
            .catch(console.error)
    )
}
await Promise.all(promises)
