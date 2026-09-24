#!/usr/bin/env node

import fs from 'node:fs/promises'
import {parseArgs} from 'node:util'
import ogs from 'open-graph-scraper-lite'

const {positionals} = parseArgs({allowPositionals: true})

const promises = []
process.stdin.setEncoding('utf-8')
for await (const filePath of positionals) {
    promises.push(
        fs.readFile(filePath, {encoding: 'utf8'})
          .then(html => ogs({html}))
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
