import React from "react";
import { useFetch } from "../punkapi/punkapi";
import './card.css';
import { Star, } from "react-bootstrap-icons";
import {gql, useMutation} from '@apollo/client';

const Cards = (props) => {
    const [data, loading] = useFetch("https://api.punkapi.com/v2/beers");
    const SAVE_BEER = gql`
    mutation createBeers($picture: String!, $name: String!, $description: String!, $ibu: String!, $malts: String!, $houblons: String!,){
    createBeers(picture: $picture, name: $name, description: $description, ibu: $ibu, malts: $malts, houblons: $houblons){
    savedbeer{
    name
    }
    } 
    }
    `;
    const [startmutation, {loading2, error} ] = useMutation(SAVE_BEER, {
      onCompleted: (data) => {
          console.log("ok");
      },
      onError: (error) => console.log("Error"),
  });
    const saveBeer = (image_url, name, description, ibu, malt, hops) =>{
        startmutation({
        variables: {
            picture: image_url,
            name: name,
            description: description,
            ibu: ibu,
            malts: malt.map(({name}) => name).join(),
            houblons: hops.map(({name}) => name).join(),
        }
    }).then(r =>console.logging).catch(err => console.logging)



    }
    return (
        <>
            {data.map(({name, description, ibu, image_url, ingredients}, index) =>
                (<div key={index} className="card" style={{justifyContent: "center", border: "2px solid black", borderRadius: "10px"}} >
                <div className="card-horizontal">
                        <img className="" src={image_url} alt="Card image cap" />
                        <div style={{marginLeft: "1%"}} className="card-body">
                        <div className="row">
                        <h4 style={{textAlign: "left"}} className="card-title">{name}</h4>
                        <Star onClick={() => saveBeer(image_url, name, description, ibu, ingredients.malt, ingredients.hops)} style={{position: "absolute", right: "5%"}} />
                        </div>
                        <p style={{textAlign: "left"}} className="card-text">{description}</p>
                        <p style={{textAlign: "left"}} className="card-text">IBU : {ibu}</p>
                        <div style={{borderColor: "black"}}>
                        <div style={{textAlign: "left"}} className="card-text">Malts :
                            {ingredients.malt.map(({name}, index) => (
                            <p key={index} style={{display:"inline" }}>
                                {" "}{name}{index === ingredients.malt.length - 1 ? "" : ","}
                            </p>
                            ))}</div>
                        <div style={{textAlign: "left"}} className="card-text">Hops :
                            {ingredients.hops.map(({name}, index) => (
                            <p key={index} style={{display:"inline"}}>
                                {" "}{name}{index === ingredients.hops.length - 1 ? "" : ","}
                            </p>
                            ))}</div>
                        </div>
                    </div>
                </div>
            </div>))}
        </>
    )
}

export default Cards;
