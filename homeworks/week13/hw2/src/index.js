/* eslint-disable import/prefer-default-export */
/* eslint-disable */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDom, appendStyle } from './utils';
import { getLoadMoreButton, cssTemplate, getForm } from './template';

// 初始化
export function init(options) {
  // let site_key = '';
  // let apiUrl = '';
  let containerElement = null;
  let commentDOM = null;
  let lastID = null;
  let isEnd = false;
  let loadMoreClassName;
  let commentClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  // site_key = options.site_key;
  // apiUrl = options.apiUrl;
  let { site_key, apiUrl } = options;
  loadMoreClassName = `${site_key}-load-more`;
  commentClassName = `${site_key}-comments`;
  formClassName = `${site_key}-add-comment-form`;
  commentsSelector = `.${commentClassName}`;
  formSelector = `.${formClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentClassName));
  appendStyle(cssTemplate);

  commentDOM = $(commentsSelector);
  getNewComments();
  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments();
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key,
      // 表單底下的 input 和 textarea
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComments(apiUrl, site_key, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentToDom(commentDOM, newCommentData, true);
    });
  });

  function getNewComments() {
    const commentDOM = $(commentsSelector);
    $(`.${loadMoreClassName}`).hide();
    if (isEnd) {
      return;
    }
    getComments(apiUrl, site_key, lastID, (data) => {
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
        $(`.${loadMoreClassName}`).hide();
      } else {
        lastID = comments[length - 1].id;
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName);
        $(commentsSelector).append(loadMoreButtonHTML);
      }
    });
  }
}
