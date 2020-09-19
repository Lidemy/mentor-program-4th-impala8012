/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
const site_key = 'dylan';
const loadMoreButtonHTML = '<button class=\'btn btn-primary mt-5 load-more\'>載入更多</button>';
let lastID = null;
let isEnd = false;

function escape(toOutput) {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}
function appendCommentToDom(container, comment, isPrepend) {
  const html = `
      <div class="card mt-20">
        <div class="card-body">
        <h5 class="card-title">${comment.id} 暱稱：${escape(
  comment.nickname,
)}</h5>
        <span class="card-subtitle mb-2 text-muted">留言時間：${escape(
    comment.created_at,
  )}</span>
        <p class="card-text">
        內容：${escape(comment.content)}
        </p>
        </div>
      </div>
      `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}

$(document).ready(() => {
  const commentDOM = $('.comments');
  getComments();
  $('.comments').on('click', '.load-more', () => {
    getComments();
  });

  $('.add-comment-form').submit((e) => {
    e.preventDefault();
    const newComment = {
      site_key: 'dylan',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group4/impala8012/week12/discussion/api_add_comments.php',
      data: newComment,
      success: (data) => {
        if (!data.ok) {
          alert(data.message);
          return;
        }
        $('input[name=nickname]').val('');
        $('textarea[name=content]').val('');
        appendCommentToDom(commentDOM, newComment, ture);
      },
    });
  });
});

function getCommentsAPI(site_key, before, cb) {
  let url = `http://mentor-program.co/mtr04group4/impala8012/week12/discussion/api_comments.php?site_key=${site_key}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (data) => {
      cb(data);
    },
  });
}

function getComments() {
  const commentDOM = $('.comments');
  $('.load-more').hide();
  if (isEnd) {
    return;
  }
  getCommentsAPI(site_key, lastID, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }

    const comments = data.contents;
    for (const comment of comments) {
      appendCommentToDom(commentDOM, comment);
    }
    const { length } = comments;
    if (length === 0) {
      isEnd = true;
      $('.load-more').hide();
    } else {
      lastID = comments[length - 1].id;
      commentDOM.append(loadMoreButtonHTML);
    }
  });
}
