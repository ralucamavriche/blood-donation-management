import React from "react";
import {Link} from 'react-router-dom'
export default function BreadcrumsModel(props) {
  return (
    <>
  
  
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {props.options.map((option,index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={option.to}>{option.name}</Link>
              </li>
            );
          })}
          <li className="breadcrumb-item active" aria-current="page">
            {props.currentLink}
          </li>
        </ol>
      </nav>
    </>
  );
}
