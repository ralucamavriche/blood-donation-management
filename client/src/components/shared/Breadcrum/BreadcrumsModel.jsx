import React from "react";
import {Link} from 'react-router-dom'
export default function BreadcrumsModel(props) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          {props.options.map((option) => {
            return (
              <li class="breadcrumb-item">
                <Link to={option.to}>{option.name}</Link>
              </li>
            );
          })}
          <li class="breadcrumb-item active" aria-current="page">
            {props.currentLink}
          </li>
        </ol>
      </nav>
    </>
  );
}
