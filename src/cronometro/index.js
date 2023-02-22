import { useEffect, useState } from "react";
import "./styles/styles.css"

export default function Cronometro() {


    // State com os valores do cronômetro
    const [tempo, setTempo] = useState({
        stateHoras: 0,
        stateMinutos: 0,
        stateSegundos: 0,
        stateMilissegundos: 0,
    })

    const [isRunning, setIsRunning] = useState(false)

    // Definindo state para guardar o setInterval
    const [intervalo, setIntervalo] = useState()

    // Variáveis para serem atribuídas como valores para os states dos cronômetros
    let horas = tempo.stateHoras
    let minutos = tempo.stateMinutos
    let segundos = tempo.stateSegundos
    let milissegundos = tempo.stateMilissegundos

    // Função que incrementa e retorna os states atualizados
    const incrementa = () =>{

        if(milissegundos === 99){
            segundos ++
            milissegundos = 0
        }
        if(segundos === 60){
            minutos ++
            segundos = 0
        }

        if(minutos === 60){

            horas ++
            minutos = 0
        }

        milissegundos++

        return setTempo({
            stateHoras: horas,
            stateMinutos: minutos,
            stateSegundos: segundos,
            stateMilissegundos: milissegundos,
        })
    }

    const conditions = () => {

        // Remove os itens que estão zerados da tela
        if(horas === 0){
            document.getElementById("horas").style.display = "none"
        }else{
            document.getElementById("horas").style.display = "flex"
        }

        if(minutos === 0){
            document.getElementById("minutos").style.display = "none"
        }else{
            document.getElementById("minutos").style.display = "flex"
        }

        if(segundos === 0){
            document.getElementById("segundos").style.display = "flex"
        }
    }

    // Função responsável por rodar a função incrementa a cada 1segundo
    const iniciar = () =>{
        setIntervalo(setInterval(() => {
            incrementa()
        }, 10))

        setIsRunning(true)
    }

    

    // Função responsável por pausar o cronômetro
    function pausar() {

        clearInterval(intervalo)
        conditions()

        setIsRunning(false)
    }

    // Função responsável por zerar os valores do cronômetro
    const reiniciar = () => {
        conditions()

        setTempo({
            stateHoras: 0,
            stateMinutos: 0,
            stateSegundos: 0,
            stateMilissegundos: 0,
        })

        horas = 0
        minutos = 0
        segundos = 0
        milissegundos = 0

        pausar()

        setIsRunning(false)
        
    }

    // Inicia o cronometro verificando as condições!
    useEffect(() => {
        if(isRunning === true){
            document.title = `${horas + `:` + minutos + `:` + segundos}`
        }else{
            document.title = "Cronômetro | React JS"
        }

        conditions()
    })

    

    return (
        <div className="Cronometro">

            <h1>Cronômetro</h1>

            <div className="clock">
                <div className="display">

                    <span id="horas">{horas < 10 ? "0" + minutos : minutos}:</span>
                    <span id="minutos">{minutos < 10 ? "0" + minutos : minutos}:</span>
                    <span id="segundos">{segundos < 10 ? "0" + segundos : segundos}</span>
                    
                    <span>.{milissegundos < 10 ? "0" + milissegundos : milissegundos}</span>
                </div>
                
            </div>

            <div className="buttons">
                <button className="start" onClick={iniciar}>Start</button>
                <button className="pause" onClick={pausar}>Pause</button>
                <button className="reset" onClick={reiniciar}>Reset</button>
            </div>

        </div>
    );
}