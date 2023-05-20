import React from "react";
import "./control-panel.css";

function ControlPanel(props){
    const {gameStarted, selectedType, onGameStart, onTypeChange, timer, onNick1Change, onNick2Change} = props;
    const gameStartedClass = gameStarted ? "gameStarted" : "";
    
    return(
        <section id="panel-control">
            <h3 className="sr-only">Tipo de Jogo</h3>
            <form className="form">
                <fieldset className="form-group">
                    <label htmlFor="btLevel">Nível:</label>
                    <select 
                        id="btLevel"
                        defaultValue="0"
                        onChange={onTypeChange}
                        disabled={gameStarted}
                    >
                        <option value="0">Selecione...</option>
                        <option value="1">Um jogador</option>
                        <option value="2">Multijogador</option>
                    </select>
                </fieldset>
                <input 
                    id="firstNickName" 
                    type="text" 
                    size="16" 
                    placeholder="Introduzir nome" 
                    className={ selectedType === '1' || selectedType === '2' ? "" : "hide"} 
                    disabled={gameStarted}
                    onChange={onNick1Change}
                />
                <input 
                    id="secondNickName" 
                    type="text" 
                    size="16" 
                    placeholder="Introduzir nome" 
                    className={ selectedType === '2' ? "" : "hide"} 
                    disabled={gameStarted}
                    onChange={onNick2Change}
                />
                <button 
                    type="button"
                    id="btPlay"
                    disabled={selectedType === "0"}
                    onClick={onGameStart}
                >
                    {gameStarted ? "Parar Jogo" : "Iniciar Jogo"}
                </button>
            </form>
            <div className="form-metadata">
                <p id="message" role="alert" className="hide">Cliique em iniciar Jogo</p>
                <dl className={`list-item left${gameStartedClass}`}>
                    <dt>Tempo de Jogo:</dt>
                    <dd id="gameTime">{timer}</dd>
                </dl>
                <dl className={`list-item right${gameStartedClass}`}>
                    <dt>Pontuação Top:</dt>
                    <dd id="pointsTop">0</dd>
                </dl>
                <dl className={`list-item left${gameStartedClass}`}>
                    <dt>Pontuação:</dt>
                    <dd id="points">0</dd>
                </dl>
                <div id="top10" className={'right'}>
                    <button id="btTop">Ver Top 10</button>
                </div>
            </div>
        </section>
    );
}

export default ControlPanel;