/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
let id = 1;
let todoCounts = 0;
let uncompleteTodoCount = 0;
const template = `
<div class="todo list-group-item justify-content-between align-items-center {todoClass}">
  <div class="todo__content-wrapper custom-control custom-checkbox">
    <input type="checkbox" class="check-todo custom-control-input" id="todo-{id}">
    <label class="todo__content custom-control-label" for="todo-{id}">{content}</label>
  </div>
  <button type="button" class="btn-edit btn btn-secondary mr-2" data-toggle="modal"  data-target="#edit-todo">編輯</button>
  <button type="button" class="btn-delete btn btn-danger">刪除</button>
</div>
    `;

const templatModal = `
<div class="modal fade" id={modalId} tabindex="-1" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{title}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <input type="text" class="form-control {inputClass}"/>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">返回</button>
      <button type="button" class="btn btn-primary btn-confirm" data-dismiss="modal">送出</button>
    </div>
  </div>
</div>
</div>
`;
const searchParam = new URLSearchParams(window.location.search);
const todoId = searchParam.get('id');

if (todoId) {
  $.getJSON(`http://mentor-program.co/mtr04group4/impala8012/week12/todos/get_todo.php?id=${todoId}`, (data) => {
    const todos = JSON.parse(data.data.todo);
    restoreTodos(todos);
  });
}

// 新增TODO
$('.input-add-todo').keypress((e) => {
  if (e.which === 13) {
    addTodo();
  }
});

$('.btn-add').click(() => {
  addTodo();
});
// 刪除TODO
$('.todos').on('click', '.btn-delete', (e) => {
  const btnDelete = $(e.target);
  btnDelete.parent().remove();
  todoCounts--;
  const isChecked = btnDelete.parent().find('.check-todo').is(':checked');
  if (!isChecked) {
    uncompleteTodoCount--;
  }
  updateCounter();
});

// 編輯TODO
$('.todos').on('click', '.btn-edit', (e) => {
  if (!$('.modal-template').find('#edit-todo').length) {
    $('.modal-template').append(
      templatModal
        .replace('{modalId}', 'edit-todo')
        .replace('{title}', '編輯留言')
        .replace('{inputClass}', 'input-edit-todo'),
    );
  }
  const label = $(e.target).parent().find('.todo__content');
  const oldTodo = label.text();
  $('.input-edit-todo').val(oldTodo);
  $('.container').on('click', '.btn-confirm', () => {
    const newTodo = $('.input-edit-todo').val();
    if (!newTodo) {
      alert('請輸入內容才能送出喔');
      return;
    }
    label.text(newTodo);
    $('.container').off();
  });
});


// 標記已完成功能
$('.todos').on('change', '.check-todo', (e) => {
  const target = $(e.target);
  const isChecked = target.is(':checked');
  if (isChecked) {
    target.parents('.todo').addClass('checked');
    uncompleteTodoCount--;
  } else {
    target.parents('.todo').removeClass('checked');
    uncompleteTodoCount++;
  }
  updateCounter();
});

// 移除已完成功能
$('.clear-all').click(() => {
  // 同時滿足兩種 class 名稱
  $('.todo.checked').each((i, el) => {
    todoCounts--;
    el.remove();
  });
  // todoCounts -= $('.todo.checked').length
  // $('.todo.checked').remove()
});

// 篩選功能
$('.options').on('click', 'div', (e) => {
  const target = $(e.target);
  const filter = target.attr('data-filter');
  if (filter === 'all') {
    $('.todo').show();
  } else if (filter === 'uncomplete') {
    $('.todo').show();
    $('.todo.checked').hide();
  } else {
    $('.todo').hide();
    $('.todo.checked').show();
  }
});

// 清空 todo
$('.delete-all').click(() => {
  deleteAllTodo();
});

function deleteAllTodo() {
  $('.todo').remove();
  uncompleteTodoCount = 0;
  updateCounter();
}

// 讀取 todo
$('.container').on('click', '.btn-read', (e) => {
  $('.modal-template').append(
    templatModal
      .replace('{modalId}', 'read-todo')
      .replace('{title}', '輸入ID')
      .replace('{inputClass}', 'input-read-todo'),
  );
  $('.btn-confirm').click(() => {
    readTodo();
  });
});

function readTodo() {
  const readId = $('.input-read-todo').val();
  $.getJSON(`http://mentor-program.co/mtr04group4/impala8012/week12/todos/get_todo.php?id=${readId}`, (data) => {
    const todos = JSON.parse(data.data.todo);
    restoreTodos(todos);
    window.location = `index.html?id=${readId}`;
  });
}
// 儲存至資料庫功能
$('.btn-save').click(() => {
  let todos = [];
  $('.todo').each((i, el) => {
    const input = $(el).find('.check-todo');
    const label = $(el).find('.todo__content');
    todos.push({
      id: input.attr('id').replace('todo-', ''),
      content: label.text(),
      isChecked: $(el).hasClass('checked'),
    });
  });
  const data = JSON.stringify(todos);
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group4/impala8012/week12/todos/add_todo.php',
    data: {
      todo: data,
    },
    success: (res) => {
      const resID = res.id;
      window.location = `index.html?id=${resID}`;
      alert(`你的ID為${res.id}`);
    },
    error: () => {
      alert('出錯');
    },
  });
});

// 跳脫字元
function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateCounter() {
  $('.uncompleted-count').text(uncompleteTodoCount);
}

// 新增TODO
function addTodo() {
  const todoTxt = $('.input-add-todo').val();
  if (!todoTxt) {
    e.preventDefault();
    alert('請輸入內容才能送出喔');
  } else {
    $('.todos').append(
      template.replace('{content}', escape(todoTxt)).replace(/{id}/g, id),
    );
    id++;
    todoCounts++;
    uncompleteTodoCount++;
    updateCounter();
    $('.input-add-todo').val('');
  }
}

// 後端抓回來的todo
function restoreTodos(todos) {
  if (todos.length === 0) return;
  id = todos[todos.length - 1].id + 1;
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    $('.todos').append(
      template
        .replace('{content}', escape(todo.content))
        .replace(/{id}/g, todo.id)
        .replace('{todoClass}', todo.isChecked ? 'checked' : ''),
    );
    todoCounts++;
    if (todo.isChecked) {
      $(`#todo-${todo.id}`).prop('checked', true);
    }
    if (!todo.isChecked) {
      uncompleteTodoCount++;
    }
  }
  updateCounter();
}
