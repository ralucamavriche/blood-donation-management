import React from "react";
import Moment from "react-moment";

export default function CommentCard(props) {
   const authorTemp = props.data.author.length > 0 ? (props.data.author[0].toUpperCase() +  props.data.author.slice(1)):''
  return (
    props.data && (
      <>
       <section className="comments">
       <article className="comment">
          <a className="comment-img" href="#non" >
              <img
                src="https://www.greenhandle.in/images/default_profile_greenhandle.png?%3E"
                alt=""
                width="50"
                height="50"
              />
            </a>
          <div className="comment-body">
            <div className="text">
              <p>{props.data.description || "no"}</p>
            </div>
            <p className="attribution">
              by <a href="#non">{ authorTemp || "anonymus"}</a> |
               {" "}<Moment fromNow>{ props.data.date }</Moment>
            </p>
          </div>
        </article>
       </section>
      </>
    )
  );
}
