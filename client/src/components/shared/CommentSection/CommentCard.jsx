import React from "react";
import Moment from "react-moment";

export default function CommentCard(props) {
  return (
    props.data && (
      <>
       <section class="comments">
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
              by <a href="#non">{props.data.author || "anonymus"}</a> at {" "}
              <Moment>{ props.data.date }</Moment>
            </p>
          </div>
        </article>
       </section>
      </>
    )
  );
}
