import React, { useState, useEffect } from 'react'
import "./App.css"

function GameGrid() {
    const numberArr = [{ id: 1, tileValue: "" }, { id: 2, tileValue: "" }, { id: 3, tileValue: "" }, { id: 4, tileValue: "" }, { id: 5, tileValue: "" },
    { id: 6, tileValue: "" }, { id: 7, tileValue: "" }, { id: 8, tileValue: "" }, { id: 9, tileValue: "" }]

    const [tileArr, setTileArray] = useState(numberArr);
    const [player, setPlayer] = useState(1)
    const [tileScore, setTileScore] = useState("X")
    const [winner, setWinner] = useState([false, ""]);

    function ticTacHandler(ind) {
        if (!winner[0]) {
            const updatedArr = tileArr.map((item) => {
                if (item.id === ind && item.tileValue==="") {
                    if (player === 1) {
                        setPlayer(2)
                    }
                    else {
                        setPlayer(1)
                    }
                    return { ...item, tileValue: tileScore }
                }
                else {
                    return item;
                }
            });

            //console.log(updatedArr)

            setTileArray(updatedArr)
            let winner = checkWinner(updatedArr)
            console.log("winner value", winner)
            if (winner === "X") {
                setTileArray(numberArr)
                const updatedwin = [true, "Player 1 wins the match"]
                setWinner(updatedwin)
            }
            else if (winner === "O") {
                setTileArray(numberArr)
                const updatedwin = [true, "Player 2 wins the match"]
                setWinner(updatedwin)
            }
        }

    }

    function checkWinner(tilesArr) {

        let winningCombination = [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]]

        for (let combination of winningCombination) {
            console.log(combination)
            const [a, b, c] = combination;

            const tileA = tilesArr.find(item => item.id === a)
            const tileB = tilesArr.find(item => item.id === b)
            const tileC = tilesArr.find(item => item.id === c)

            if (tileA.tileValue === tileB.tileValue && tileA.tileValue === tileC.tileValue) {
                return tileA.tileValue;
            }
            
        }
        
            return null;
        
    }

    useEffect(() => {
        console.log("player turn", player)
        if (player === 2) {
            setTileScore("O")
        }
        else {
            setTileScore("X")
        }
    }, [player])



    return (
        <div>

            <h2 style={{ textAlign: "center" }}>Tic Tac Toe Game</h2>
            <h3 style={{ textAlign: "center" }}>Player 1 : X</h3>
            <h3 style={{ textAlign: "center" }}>Player 2 : O</h3>
            <h3 style={{ textAlign: "center" }}>It's player {player} turn</h3>
            <h1 style={{ color: 'gold', textAlign: "center" }}>{winner[0] && winner[1]}</h1>
            <div className='parent-fig'>
                {tileArr.map((item, ind) => {
                    return (
                        <div className='child-tile' key={item.id} onClick={() => ticTacHandler(item.id)}>
                            <span >
                                {item.tileValue}
                            </span>

                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default GameGrid