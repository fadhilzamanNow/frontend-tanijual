import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

const Ratings = ({rating}) => {

const starts = [];

for( let i = 1; i <= 5 ; i++){
    if(i <= rating){
        starts.push(
            <AiFillStar 
                key = {i}
                size = {20}
                color = "yellow"
                className="mr-2 cursor-pointer"
            />
        )
    }
    else if ( i === Math.ceil(rating) && !Number.isInteger(rating)){
        starts.push(
            <BsStarHalf
                key = {i}
                size = {17}
                color = "yellow"
                className = "mr-2 cursor-pointer"
            />
        )
    
    }
    else{
        starts.push(
            <AiOutlineStar 
                key ={i}
                size = {20}
                color = "yellow"
                className="mr-2 cursor-pointer"
            />

        )
    }
}
  return (
    <div className="flex pl-3">{starts}</div>
  )
}

export default Ratings