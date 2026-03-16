import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const ChessListPage = () => {
    const [chesses, setChess] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);

        axios
            .get("https://chess.sulla.hu/chess")
            .then((response) => {
                setChess(response.data);
            })
            .catch(console.log)
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakkozók</h2>
                    {chesses.map((chess, index) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Sakkozó neve: {chess.name}</p>
                            <p className="text-danger">Születési éve: {chess.birth_date}</p>
                            <p className="text-danger">Nyert világbajnokságai: {chess.world_ch_won}</p>
                            <div className="card-body">
                                {chess.profile_url.startsWith('http') ? (
                                    <a href={chess.profile_url} target="_blank" rel="noopener noreferrer">
                                        Profile link
                                    </a>
                                ) : (
                                    <NavLink to={chess.profile_url} end>
                                        Profile link
                                    </NavLink>
                                )}
                                <br />
                                <NavLink to={"/chess/" + chess.id}>
                                    <img alt={chess.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={chess.image_url || "https://placehold.co/400x800"} />
                                </NavLink>
                                <br />
                                <NavLink to={"/mod-chess/" + chess.id}><i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                <NavLink to={"/del-chess/" + chess.id}><i className="bi bi-trash3"></i></NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
