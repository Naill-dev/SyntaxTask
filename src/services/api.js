const STORAGE_KEY = 'devjoint_tasks_db';

const initialTasks = [
  { id: '1', title: 'Auth modulunu tamamlamaq', category: 'Dev', status: 'completed', priority: 'high' },
  { id: '2', title: 'Global State (Context API) qurmaq', category: 'Dev', status: 'in-progress', priority: 'high' },
  { id: '3', title: 'Error Boundary inteqrasiyası', category: 'QA', status: 'pending', priority: 'medium' }
];

const getStoredTasks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getTasks: async () => {
    await delay(400);
    return getStoredTasks();
  },
  createTask: async (taskData) => {
    await delay(500);
    const tasks = getStoredTasks();
    const newTask = { ...taskData, id: Date.now().toString() };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  },
  updateTask: async (id, updatedFields) => {
    await delay(400);
    const tasks = getStoredTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedFields };
      saveTasks(tasks);
      return tasks[index];
    }
    throw new Error('Task tapılmadı');
  },
  deleteTask: async (id) => {
    await delay(400);
    const tasks = getStoredTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    saveTasks(filtered);
    return { success: true, id };
  }
};
