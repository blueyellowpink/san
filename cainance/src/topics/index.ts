const toTradeTopic = (pair: string): string => {
    return `${pair}-trades`
}

const toOrderbookTopic = (pair: string): string => {
    return `${pair}-orderbook-data`
}

export default { toTradeTopic, toOrderbookTopic }
