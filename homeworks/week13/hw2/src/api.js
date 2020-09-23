/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import $ from 'jquery';

export function getComments(apiUrl, site_key, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${site_key}`;
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

export function addComments(apiUrl, site_key, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
    success: (data) => {
      cb(data);
    },
  });
}
