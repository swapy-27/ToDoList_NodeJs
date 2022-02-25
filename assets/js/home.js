


{
    let theme = true

    let createTask = function (text) {
        // send ajax request to server and add data to display
        $.ajax({
            type: "post",
            url: '/add-task',
            data: { description: text },
            success: (data) => {

                let newElement = createTaskElement(data.task.description, data.task._id);
                newElement.addClass('to-do-items')
                $('#display').prepend(newElement)
                deleteTask($('.delete-task', newElement))
                toggleTask($('input[name="task_status"]'), newElement);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }


    let createTaskElement = function (task, taskID) {

        return $(`
        <li id="task-${taskID}">
        <div class="to-do-item-container">
            
            <label>
            <input type="checkbox" value="${taskID}" name="task_status">
        
                ${task} 
           
        </label>
        </div>
            <a class="delete-task" href="/delete-task/${taskID}">X</a>
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


    //night theme
    $('#theme-change').on('click', function (e) {
        console.log('hii')
        e.preventDefault();


        if (theme) {
            $('#container').removeClass('night-theme');
            $('#container').addClass('day-theme');
            $("#theme-change").attr("src", "/images/icon-moon.svg");
            theme = false;
        }
        else {
            $('#container').removeClass('day-theme');
            $('#container').addClass('night-theme');
            $("#theme-change").attr("src", "/images/icon-sun.svg");
            theme = true
        }

    })

    // setting Ajax delete functionallity After reloading a page also 
    let settingDeleteOnReload = function () {

        let tasks = $('.delete-task');

        for (t of tasks) {
            deleteTask(t);
        }

    }
    let toggleTask = function (ele) {
        console.log(ele);
        $(ele).on('click', function (e) {
            let task_Id = $(this).val();
            let data_value = false;
            if ($(this).is(':checked')) {
                data_value = true
            }
            $.ajax({
                type: "POST",
                url: `/toggle-task/${task_Id}`,
                data: {
                    toggle: data_value
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

    
    let settindUpToggleOnRefresh =  function(){
            let elements = $('input[name="task_status"]');
            console.log(elements)

            for (ele of elements){
                toggleTask(ele);
            }
       
        
    }







    settindUpToggleOnRefresh();
    // settingDeleteOnReload();
}



