import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

import { Header, Footer, ControlPanel } from "./components";
import { TIMEOUTGAME } from "./constants";
import { getRandom } from "./helpers";
let timerId = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [nick1, setNick1] = useState([]); //[nickname, letra]
  const [nick2, setNick2] = useState([]); //[nickname, letra]
  const [timer, setTimer] = useState(TIMEOUTGAME);

  /*
   * valor entre 1 e 2
   * 1 - jogador 1
   * 2 - jogador 2 ou computador
   */
  const [playerTime, setPlayerTime] = useState();

  /*
   * Quando começa o jogo
   * */
  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setPlayerTime(getRandom); //primeiro jogador aleatorio
      //jogo começa
      //chamar a função para ir buscar os valores de X e O para o jogador
      // 1 - X
      // 2 - O
      let aux = getRandom;
      console.log("Aux " + aux);
      switch (1) {
        case 1:
          setNick1([...nick1, "X"]);
          setNick2([...nick2, "O"]);
          break;
        case 2:
          setNick1([...nick1, "O"]);
          setNick2([nick2, "X"]);
          break;
        default:
          break;
      }
      setGameStarted(true);
    }
    console.log("PLAYER 1: " + nick1 + "\n");
    console.log(nick2);
  };

  /*
   * Quando seleciona modo de jogo
   */
  const handleTypeChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedType(value);

    switch (value) {
      case "1":
        //Um jogador
        break;
      case "2":
        //Multijogador
        break;
      default:
        break;
    }
  };

  /*
   * Quando insere nome no nick1
   */
  const handleNick1Change = (event) => {
    setNick1([]);
    setNick1([event.target.value]);
    console.log(nick1);
  };

  /*
   * Quando insere nome no nick2
   */
  const handleNick2Change = (event) => {
    setNick2([]);
    setNick2([event.target.value]);
    console.log(nick2);
  };

  /*
   *Controla tempo de jogo
   */
  useEffect(() => {
    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });
        if (nextTimer === 0) {
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== TIMEOUTGAME) {
      setTimer(TIMEOUTGAME);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  return (
    <div className="App">
      <Header />
      <ControlPanel
        gameStarted={gameStarted}
        onGameStart={handleGameStart}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        timer={nick1}
        onNick1Change={handleNick1Change}
        onNick2Change={handleNick2Change}
      />
      <Footer />
    </div>
  );
}

export default App;
