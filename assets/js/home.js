{

    let createTask = function (text) {



        // send ajasx request to server and add data to display
        $.ajax({
            type: "post",
            url: '/add-task',
            data: { description: text },
            success: (data) => {

                let newElement = createTaskElement(data.task.description, data.task._id);
                newElement.addClass('displayed-items')
                $('#display').prepend(newElement)
                deleteTask($('#delete-task', newElement))
            },
            error: (error) => {
                console.log(error);
            }
        })
    }



    let createTaskElement = function (task, taskID) {

        return $(`
        <li id="task-${taskID}">
            <input type="checkbox">
            <p>${task}</p>
            <a id="delete-task" href="/delete-task/${taskID}">X</a>
        </li>
        `)

    }

    let deleteTask = function (deleteLink) {
        $(deleteLink).on('click', function (e) {
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),

                success: (data) => {

                    $(`#task-${data.taskID}`).remove();
                },
                error: (error) => {
                    console.log(error);
                }
            })

        })
    }










    $(document).on('keypress', function (e) {

        if (e.which == 13) {
            let text = $('#task-description').val();
            if (text != '') {
                createTask(text);
            }
        }
    })



}