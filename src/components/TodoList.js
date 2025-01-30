import React, {useState} from "react";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);         //Eklenen görevleri tutar. (task)
    const [newTask, setNewTask] = useState("");    //Kullanıcının input alanına yazdığı metni tutar. (newTask)

    const handleInputChange = (e) => {  //Kullanıcı input yazdıkça (newTask) değişkeni güncellenir.
        setNewTask(e.target.value);
    };
    const addTask = () => { //Yeni görev ekler.
        if (newTask.trim()==="")return; //Intput boşsa görev ekleme engellenir! (trim)
        setTasks([...tasks,{text: newTask, completed: false}]); //Spread Operator (...tasks)
        setNewTask("");
    };

    const toggleTask= (index) => { // Görev tamamlandıysa üstünü çizer, tamamlanmadıysa eski haline getirir.
        const updatedTasks=tasks.map((task,i)=> // .map() ile listedeki belirli bir görevi bulup tersine çevirdik.
        i===index?{...task, completed: !task.completed}: task // task.completed değeri true => false | false=>true
        );
        setTasks(updatedTasks);
    };
    const removeTask = (index) => {
        const updateTasks=tasks.filter((_,i)=>i!==index); // .filter() ile verilen index dışındaki tüm görevleri alarak yeni bir liste oluşturur ve belirli bir görevi listeden kaldırmış olur.
        setTasks(updateTasks);
    };
    return(
        <div>
            <h2>To-Do List</h2>
            <input
                title="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter a task..."
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task, index)=>(
                <li key={index} style={{textDecoration:task.completed ? "line-through": "none"}}>
                    {task.text}
                    <button onClick={() => toggleTask(index)}>✔</button>
                    <button onClick={() => removeTask(index)}>❌</button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;