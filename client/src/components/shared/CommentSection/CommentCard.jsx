import React from 'react';

export default function CommentCard() {
  return (
    <>
    <article class="comment">
            <a class="comment-img" href="#non">
              <img
                src="https://pbs.twimg.com/profile_images/444197466133385216/UA08zh-B.jpeg"
                alt=""
                width="50"
                height="50"
              />
            </a>
            <div class="comment-body">
              <div class="text">
                <p>Hello, this is an example from me</p>
              </div>
              <p class="attribution">
                by <a href="#non">Besnik Hetemi</a> at 14:23pm, 4 Dec 2015
              </p>
            </div>
          </article>
    </>
  );
}
