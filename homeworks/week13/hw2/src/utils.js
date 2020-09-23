/* eslint-disable no-useless-escape */
export function escape(toOutput) {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

export function appendCommentToDom(container, comment, isPrepend) {
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

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}
