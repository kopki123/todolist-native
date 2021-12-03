export function getNotCheckedTemplate(id, value) {
  return `<div class="todo-text">
                        <label for=${id}>
                            <input type="checkbox" name="done" />
                            <span >${value}</span>
                        </label>
                    </div>
                    <div class="btn-container">
                        <button class="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
}

export function getEditTemplate(todoText) {
  return `<div class="todo-text">
            <input type="text" name="title" id="title" value=${todoText} /> 
            </div>
            <div class="btn-container">
                        <button class="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete">
                            <i class="fas fa-trash"></i>
                        </button>
            </div>`;
}

export function getCheckedTemplate(id, value) {
  return `<div class="todo-text">
                        <label for=${id}>
                            <input type="checkbox" name="done" checked/>
                            <span class='line-through'>${value}</span>
                        </label>
                    </div>
                    <div class="btn-container">
                        <button class="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
}
