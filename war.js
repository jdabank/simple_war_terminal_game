const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const suits = ["♠", "♡", "♢", "♣"]

const deck = []

const player = {
    hand: [],
    deck: []
}

const cpu = {
    hand: [],
    deck: []
}

for (let suit of suits) {
  for (let rank of ranks) {
    deck.push({rank: rank, suit: suit})
  }
}

const shuffler = (deck) => {
     const shuffledDeck = deck.sort(() => Math.random() - 0.5)
     player.deck.push(...shuffledDeck.slice(0, 26))
     cpu.deck.push(...shuffledDeck.slice(26, 52))
}

const drawCards = () => {
    player.hand.push(player.deck[0])
    player.deck.shift()
    cpu.hand.push(cpu.deck[0])
    cpu.deck.shift()
}

const compareHands = () => {
    if (ranks.indexOf(player.hand[0].rank) > ranks.indexOf(cpu.hand[0].rank)){
        console.log("Player has won the hand!")
        player.deck.push(cpu.hand[0], player.hand[0])
        player.hand.shift()
        cpu.hand.shift()
    } else if (ranks.indexOf(cpu.hand[0].rank) > ranks.indexOf(player.hand[0].rank)){
        console.log("CPU has won the hand!")
        cpu.deck.push(player.hand[0], cpu.hand[0])
        cpu.hand.shift()
        player.hand.shift()
    } else if (ranks.indexOf(player.hand[0].rank) === ranks.indexOf(cpu.hand[0].rank)){
        console.log('This is a war!')
        player.hand.push(...player.deck.splice(0, 4))
        cpu.hand.push(...cpu.deck.splice(0, 4))
        if (ranks.indexOf(player.hand.shift().rank > ranks.indexOf(cpu.hand.shift().rank))){
            console.log("Player has won the war!")
            player.deck.push(...cpu.hand, ...player.hand)
            player.hand = []
            cpu.hand = []
                if (cpu.deck.length === 0){
                    return
                } else {
                    drawCards()
                    compareHands()
                }
            } else if (ranks.indexOf(player.hand[4].rank < ranks.indexOf(cpu.hand[4].rank))){
                console.log("CPU has won the war!")
                cpu.deck.push(...player.hand, ...cpu.hand)
                player.hand = []
                cpu.hand = []
                    if (player.deck.length === 0){
                        return
                    } else {
                        drawCards()
                        compareHands()
                    }
            }
    }
}

const playGame = () => {
    console.log("Let's play War!")
    shuffler(deck)
    while (player.deck.length > 0 && cpu.deck.length > 0){
    console.log("===============================")
    drawCards()
    console.log('Player drew ' + player.hand[0].rank + player.hand[0].suit)
    console.log('CPU drew ' + cpu.hand[0].rank + cpu.hand[0].suit)
    console.log("===============================")
    compareHands()
    console.log("Player: " + player.deck.length)
    console.log("CPU: " + cpu.deck.length)
    } 
    if (player.deck.length === 0){
        console.log("CPU has won the game!")
    } else if (cpu.deck.length === 0){
        console.log("Player has won the game!")
    }
}

playGame()
