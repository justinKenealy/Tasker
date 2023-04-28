import renderTaskDetails from './renderTaskDetails.js';

const renderComments = (commentsData, taskDetailsDiv, task, user, projectTitle, projectID, tasksArray) => {
  const commentParent = document.createElement('div');
  const commentHeader = document.createElement('h3');
  commentHeader.innerText = 'Comments';
  commentParent.appendChild(commentHeader);
  console.log(task.id)

  if (commentsData.length === 0) {
    const noComment = document.createElement('p')
    noComment.classList.add('no_note')
    noComment.textContent = 'No comment found.'
    commentParent.appendChild(noComment);   
  } else {
    for (let comment of commentsData) {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment-div');

      const commentDescription = document.createElement('p');
      commentDescription.innerText = comment.description;
      commentDiv.appendChild(commentDescription);

      const commentCreationDate = document.createElement('p');
      commentCreationDate.classList.add('creationDate-comment')
      commentCreationDate.innerText = new Date(comment.creation_date).toLocaleDateString();
      commentDiv.appendChild(commentCreationDate);

      const commentAuthor = document.createElement('p');
      commentAuthor.classList.add('author-comment')
      commentAuthor.innerText = "Posted by: " + comment.user_name;
      commentDiv.appendChild(commentAuthor);

      //add 'Delete' button for deleting a comment
      const deleteCommentBtn = document.createElement('i')
      deleteCommentBtn.className = 'fa-solid fa-trash'
      deleteCommentBtn.addEventListener('click', () => {
          deleteComment(user, commentDiv, task, tasksArray, projectTitle, projectID)
      })
      commentDiv.appendChild(deleteCommentBtn)

      commentParent.appendChild(commentDiv);
    }
  }

  const newCommentForm = document.createElement('div');
  const creation_date = moment().format('YYYY-MM-DD');
  newCommentForm.innerHTML = `
    <form id="create-comment-form">

      <textarea name="description" placeholder ="Leave a comment"></textarea>
      
      <input type="hidden" name="user_id" value="${user.id}" />
      <input type="hidden" name="user_name" value="${user.user_name}" />
      <input type="hidden" name="task_id" value="${task.id}" />
      <input type="hidden" name="creation_date" value="${creation_date}" />

      <br>
      <button type="submit" id="createCommentBtn">Add comment</button>
    </form>
  `;
  
  const form = newCommentForm.querySelector('#create-comment-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const body = {
      user_id: formData.get('user_id'),
      user_name: formData.get('user_name'),
      task_id: formData.get('task_id'),
      description: formData.get('description'),
      creation_date: formData.get('creation_date')
    };

    axios
      .post('/api/comments', body)
      .then((res) => {
        console.log(res);
          console.log(task.id)
          renderTaskDetails(task, tasksArray, projectTitle, projectID, user)
      })
    
      .catch((err) => {
        console.error(err);
      });
    })

  taskDetailsDiv.appendChild(commentParent);
  taskDetailsDiv.appendChild(newCommentForm); 
};

const deleteComment = (user, commentDiv, task, tasksArray, projectTitle, projectID) => {
  axios
      .delete(`/api/comments/${id}`)
      .then((res) => {
          commentDiv.remove();
          renderTaskDetails(task, tasksArray, projectTitle, projectID, user);
      })
      .catch((err) => {
          console.error(err)
      })
}

export default renderComments;