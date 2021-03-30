import React, {useEffect} from "react";
import './favouritecard.css';
import { useQuery, gql } from '@apollo/client';


const FavouriteCard = (props) => {
    const GET_FAVOURITE_BEERS = gql`
    query{
        favouritebeers{
            picture
            name
            description
            ibu
            malts
            houblons
            }
    }
    `;
    const {loading, error, data} = useQuery(GET_FAVOURITE_BEERS, {fetchPolicy: "network-only"})


    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error : {error.message}</p>);
    console.log(data);
    console.log(data.favouritebeers);

    return (
        <>
             {data.favouritebeers.map(({picture, name, description, ibu, malts, houblons}, index) =>
                (<div key={index} className="card" style={{justifyContent: "center", border: "2px solid black", borderRadius: "10px"}} >
                <div className="card-horizontal">
                        <img className="" src={picture} alt="Card image cap" />
                        <div style={{marginLeft: "1%", marginRight: "1%"}} className="card-body">
                        <div className="row">
                        <h4 style={{textAlign: "left"}} className="card-title">{name}</h4>
                        </div>
                        <p style={{textAlign: "left"}} className="card-text">{description}</p>
                        <p style={{textAlign: "left"}} className="card-text">IBU : {ibu}</p>
                        <div style={{borderColor: "black"}}>
                        <p style={{textAlign: "left"}} className="card-text">Malts :
                            {malts}</p>
                        <p style={{textAlign: "left"}} className="card-text">Hops :
                            {houblons}</p>
                        </div>
                    </div>
                </div>
            </div>))}
        </>
    )
}

export default FavouriteCard;
