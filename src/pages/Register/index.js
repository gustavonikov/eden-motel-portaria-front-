/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import sinespApi from 'sinesp-api';

import Escopo from '../../components/Header';

import api from '../../services/api';
import './styles.css';

export default function Register() {

    // Pessoa
    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [orgao, setOrgao] = useState('');

    // Diaria
    const [numero, setNumero] = useState('');
    const [diaria, setDiaria] = useState('');
    const [hora, setHora] = useState('');

    // Veiculo
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [cor, setCor] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    // Observação
    const [observations, setObservations] = useState('');

    const [numbers, setNumbers] = useState([]);

    const [cards, setCards] = useState([]);

/*     if (status === 'OCUPADO') cardClass = 'card-occupied'; */

    useEffect(() => {
        api.get(`/apartamentos`).then((response) => {
            setCards(response.data);
        });
    }, []);

    useEffect(() => {
        api.get(`/apartamento`).then((response) => {
            setNumbers(response.data);
        });
    }, []);

    useEffect(() => {
        async function loadCar() {
            try {
                const response = await sinespApi.search(placa);

                setFabricante(response.marca);
                setModelo(response.modelo);
                setCor(response.cor);
                setCidade(response.municipio);
                setUf(response.uf);

                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }

        loadCar();
    }, [placa]);

    const data = {
        nome,
        rg,
        orgao,
        numero,
        diaria,
        placa,
        modelo,
        fabricante,
        cor,
        cidade,
        observations,
        uf,
        hora
    };

    async function handleInsertEntry(e) {
        e.preventDefault();

        try {
            await api.post('/entry', data);
            setNome('');
            setRg('');
            setOrgao('');
            setNumero('');
            setDiaria('');
            setPlaca('');
            setModelo('');
            setFabricante('');
            setCor('');
            setCidade('');
            setObservations('');
            setHora('');

            api.get(`/apartamentos`).then((response) => {
                setCards(response.data);
            });
        } catch (err) {
            console.log(err);
        }

        window.location.reload();
    }

    return (
        <body>
            <Escopo />
            <div id="page">
                <div className="dashboard-container">
                    <form onSubmit={handleInsertEntry}>
                        <div className="part1">
                            <div className="pessoais">
                                <fieldset>
                                    <legend>Dados Pessoais</legend>

                                    <div className="input-block">
                                        <label htmlFor="nome">Nome</label>
                                        <input
                                            name="nome"
                                            id="nome"
                                            required
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <div className="input-block">
                                            <label htmlFor="sobrenome">RG</label>
                                            <input
                                                name="sobrenome"
                                                id="sobrenome"
                                                required
                                                value={rg}
                                                onChange={(e) => setRg(e.target.value)}
                                            />
                                        </div>

                                        <div className="input-block">
                                            <label htmlFor="email">Orgão</label>
                                            <input
                                                name="email"
                                                id="email"
                                                required
                                                value={orgao}
                                                onChange={(e) => setOrgao(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="diaria">
                                <fieldset>
                                    <legend>Dados da Estadia</legend>

                                    <div className="select-block">
                                        <label htmlFor="numbers">Apartamento</label>
                                        <select required name="numbers" id="numbers" onChange={(e) => setNumero(e.target.value)}>
                                            <option value="" disabled selected hidden>Selecione o apartamento disponível</option>
                                            {numbers?.map((number) => (
                                                <option key={number.number} value={number.number}>
                                                    {number.number}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="input-block">
                                            <label htmlFor="hora">Hora</label>
                                            <input
                                                type="time"
                                                name="hora"
                                                id="hora"
                                                required
                                                value={hora}
                                                onChange={(e) => setHora(e.target.value)}
                                            />
                                        </div>
                                </fieldset>
                            </div>
                        </div>

                        <div className="part2">
                            <div className="veiculo">
                                <fieldset>
                                    <legend>Dados do Veículo</legend>

                                    <div className="double-input-block">
                                        <div className="input-wrapper">
                                            <label htmlFor="placa">Placa</label>
                                            <input
                                                name="placa"
                                                id="placa"
                                                required
                                                value={placa}
                                                onChange={(e) => setPlaca(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="modelo">Modelo</label>
                                            <input
                                                name="modelo"
                                                id="modelo"
                                                required
                                                value={modelo}
                                                onChange={(e) => setModelo(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="double-input-block">
                                        <div className="input-wrapper">
                                            <label htmlFor="cor">Cor</label>
                                            <input
                                                name="cor"
                                                id="cor"
                                                required
                                                value={cor}
                                                onChange={(e) => setCor(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="cidade">Cidade</label>
                                            <input
                                                name="cidade"
                                                id="cidade"
                                                required
                                                value={cidade}
                                                onChange={(e) => setCidade(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="observacao">
                                <fieldset>
                                    <legend>Observações</legend>
                                    <div className="input-block">
                                        <textarea
                                            name="observations"
                                            id="observations"
                                            value={observations}
                                            onChange={(e) => setObservations(e.target.value)}
                                        />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <button className="button-enterprise" type="submit">Registrar Entrada</button>
                        </div>
                    </form>
                </div>
               
               <div className="cards-container">
                    <h4>Status dos Apartamentos</h4>

                    <div className="cards-grid">
                        <ul>
                            {cards?.map(({ status, number, type }) => (
                                <li className={status === 'LIVRE' ? 'card-available' : 'card-occupied' }>
                                    <strong key={number}>{number}</strong>
                                    <span>{type}</span>
                                </li>
                            ))}
                        </ul>  
                    </div>
                </div>
            </div>
        </body>
    );
}
