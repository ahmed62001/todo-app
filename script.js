class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.notificationPermission = false;
        this.reminderCheckInterval = null;
        this.currentLanguage = localStorage.getItem('language') || 'ar';
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.translations = {
            'ar': {
                appName: 'إدارة المهام اليومية',
                tagline: 'نظم مهامك وحقق أهدافك',
                taskInputPlaceholder: 'أدخل مهمة جديدة...',
                reminderInputPlaceholder: 'تحديد موعد التذكير',
                futureTimeError: 'يرجى اختيار وقت في المستقبل',
                addTask: 'إضافة',
                allTasks: 'الكل',
                pendingTasks: 'معلقة',
                completedTasks: 'مكتملة',
                tasksWithReminders: 'لها تذكير',
                clearCompleted: 'حذف المكتملة',
                noTasks: 'لا توجد مهام',
                addFirstTask: 'أضف مهمة جديدة لتبدأ',
                footerText: '© 2025 تطبيق إدارة المهام - صُمم بواسطة احمد محمد ',
                reminderTitle: 'تذكير بمهمة',
                reminderMessage: 'حان وقت تنفيذ المهمة!',
                markDone: 'تم الإنجاز',
                snoozeReminder: 'تأجيل 5 دقائق',
                dismissReminder: 'إغلاق',
                taskAddedSuccess: 'تم إضافة المهمة بنجاح',
                taskTextRequired: 'يرجى إدخال نص المهمة',
                reminderTimeFuture: 'يجب أن يكون موعد التذكير في المستقبل',
                taskEditedSuccess: 'تم تعديل المهمة بنجاح',
                taskDeletedSuccess: 'تم حذف المهمة',
                taskMarkedCompleted: 'تم تعليم المهمة كمكتملة',
                taskUnmarkedCompleted: 'تم إلغاء تعليم المهمة',
                errorSavingData: 'حدث خطأ أثناء حفظ البيانات',
                completedTasksCleared: 'تم حذف المهام المكتملة',
                editReminderTitle: 'تحديث التذكير',
                chooseReminderTime: 'اختر وقت التذكير:',
                save: 'حفظ',
                cancel: 'إلغاء',
                reminderUpdated: 'تم تحديث التذكير إلى',
                notificationTitle: 'تذكير بمهمة',
                lightTheme: 'الوضع الفاتح',
                darkTheme: 'الوضع الداكن',
            },
            'en': {
                appName: 'Daily Task Manager',
                tagline: 'Organize your tasks and achieve your goals',
                taskInputPlaceholder: 'Enter a new task...',
                reminderInputPlaceholder: 'Set reminder time',
                futureTimeError: 'Please select a future time',
                addTask: 'Add',
                allTasks: 'All',
                pendingTasks: 'Pending',
                completedTasks: 'Completed',
                tasksWithReminders: 'With Reminders',
                clearCompleted: 'Clear Completed',
                noTasks: 'No Tasks',
                addFirstTask: 'Add a new task to get started',
                footerText: '© 2025 Task Manager App - Designed by Ahmed Mohamed',
                reminderTitle: 'Task Reminder',
                reminderMessage: 'It\'s time to complete the task!',
                markDone: 'Mark Done',
                snoozeReminder: 'Snooze 5 minutes',
                dismissReminder: 'Dismiss',
                taskAddedSuccess: 'Task added successfully',
                taskTextRequired: 'Please enter task text',
                reminderTimeFuture: 'Reminder time must be in the future',
                taskEditedSuccess: 'Task edited successfully',
                taskDeletedSuccess: 'Task deleted',
                taskMarkedCompleted: 'Task marked as completed',
                taskUnmarkedCompleted: 'Task unmarked as completed',
                errorSavingData: 'Error saving data',
                completedTasksCleared: 'Completed tasks deleted',
                editReminderTitle: 'Update Reminder',
                chooseReminderTime: 'Choose reminder time:',
                save: 'Save',
                cancel: 'Cancel',
                reminderUpdated: 'Reminder updated to',
                notificationTitle: 'Task Reminder',
                lightTheme: 'Light Theme',
                darkTheme: 'Dark Theme',
            },
            'fr': {
                appName: 'Gestionnaire de Tâches Quotidiennes',
                tagline: 'Organisez vos tâches et atteignez vos objectifs',
                taskInputPlaceholder: 'Entrez une nouvelle tâche...',
                reminderInputPlaceholder: 'Définir l\'heure du rappel',
                futureTimeError: 'Veuillez sélectionner une heure future',
                addTask: 'Ajouter',
                allTasks: 'Tous',
                pendingTasks: 'En attente',
                completedTasks: 'Terminées',
                tasksWithReminders: 'Avec Rappels',
                clearCompleted: 'Effacer terminées',
                noTasks: 'Aucune tâche',
                addFirstTask: 'Ajoutez une nouvelle tâche pour commencer',
                footerText: '© 2025 Application de gestion de tâches - Conçue avec ❤️',
                reminderTitle: 'Rappel de tâche',
                reminderMessage: 'Il est temps de compléter la tâche !',
                markDone: 'Marquer comme fait',
                snoozeReminder: 'Répéter 5 minutes',
                dismissReminder: 'Fermer',
                taskAddedSuccess: 'Tâche ajoutée avec succès',
                taskTextRequired: 'Veuillez entrer le texte de la tâche',
                reminderTimeFuture: 'L\'heure du rappel doit être dans le futur',
                taskEditedSuccess: 'Tâche modifiée avec succès',
                taskDeletedSuccess: 'Tâche supprimée',
                taskMarkedCompleted: 'Tâche marquée comme terminée',
                taskUnmarkedCompleted: 'Tâche non marquée comme terminée',
                errorSavingData: 'Erreur lors de la sauvegarde des données',
                completedTasksCleared: 'Tâches terminées supprimées',
                editReminderTitle: 'Mettre à jour le rappel',
                chooseReminderTime: 'Choisissez l\'heure du rappel :',
                save: 'Enregistrer',
                cancel: 'Annuler',
                reminderUpdated: 'Rappel mis à jour à',
                notificationTitle: 'Rappel de tâche',
                lightTheme: 'Thème clair',
                darkTheme: 'Thème sombre',
            }
        };

        this.initializeElements();
        this.applyTheme(this.currentTheme);
        this.loadTranslations();
        this.initializeFlatpickr();
        this.initializeEventListeners();
        this.requestNotificationPermission();
        this.startReminderChecker();
        this.render();
    }

    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.reminderInput = document.getElementById('reminderInput');
        this.reminderCalendarIcon = document.querySelector('.reminder-calendar-icon');
        this.reminderBtn = document.querySelector('.reminder-btn');
        this.addBtn = document.querySelector('.add-btn');
        this.tasksList = document.querySelector('.tasks-list');
        this.emptyState = document.querySelector('.empty-state');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearBtn = document.querySelector('.clear-btn');
        this.allCount = document.querySelector('.all-count');
        this.pendingCount = document.querySelector('.pending-count');
        this.completedCount = document.querySelector('.completed-count');
        this.reminderCount = document.querySelector('.reminder-count');
        this.reminderModal = document.getElementById('reminderModal');
        this.modalTaskText = this.reminderModal.querySelector('.reminder-task');
        this.reminderTime = this.reminderModal.querySelector('.reminder-time');
        this.reminderSound = document.getElementById('reminderSound');

        this.languageSelect = document.getElementById('languageSelect');
        this.lightThemeIcon = document.querySelector('.light-theme-icon');
        this.darkThemeIcon = document.querySelector('.dark-theme-icon');
    }

    initializeFlatpickr() {
        const flatpickrLocale = this.currentLanguage === 'ar' ? flatpickr.l10ns.ar : (this.currentLanguage === 'fr' ? flatpickr.l10ns.fr : null);

        this.flatpickrInstance = flatpickr(this.reminderInput, {
            enableTime: true,
            noCalendar: false,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            defaultDate: new Date(),
            time_24hr: true,
            locale: flatpickrLocale,
            onClose: (selectedDates, dateStr, instance) => {
                this.validateReminderDate();
            }
        });

        this.reminderCalendarIcon.addEventListener('click', () => {
            this.flatpickrInstance.open();
        });
    }

    initializeEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.reminderBtn.addEventListener('click', () => this.toggleReminder());
        this.clearBtn.addEventListener('click', () => this.clearCompletedTasks());
        this.filterButtons.forEach(btn =>
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter))
        );
        this.reminderModal.querySelector('.done-btn').addEventListener('click', () => this.markReminderTaskAsDone());
        this.reminderModal.querySelector('.snooze-btn').addEventListener('click', () => this.snoozeReminder());
        this.reminderModal.querySelector('.dismiss-btn').addEventListener('click', () => this.closeReminderModal());
        this.reminderModal.querySelector('.close-modal').addEventListener('click', () => this.closeReminderModal());

        this.languageSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
        this.languageSelect.value = this.currentLanguage; // Set initial selection

        this.lightThemeIcon.addEventListener('click', () => this.applyTheme('light'));
        this.darkThemeIcon.addEventListener('click', () => this.applyTheme('dark'));
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;

        if (theme === 'dark') {
            this.darkThemeIcon.classList.add('active');
            this.lightThemeIcon.classList.remove('active');
        } else {
            this.lightThemeIcon.classList.add('active');
            this.darkThemeIcon.classList.remove('active');
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        this.loadTranslations();
        this.render(); // Re-render tasks to update reminder dates format
        this.initializeFlatpickr(); // Re-initialize Flatpickr for new locale
    }

    loadTranslations() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.dataset.key;
            if (this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });
        // Update placeholders
        this.taskInput.placeholder = this.translations[this.currentLanguage].taskInputPlaceholder;
        this.reminderInput.placeholder = this.translations[this.currentLanguage].reminderInputPlaceholder;
        // Update ARIA labels and titles
        document.querySelector('[aria-label="إدخال مهمة جديدة"]').setAttribute('aria-label', this.translations[this.currentLanguage].taskInputPlaceholder);
        document.querySelector('[aria-label="تحديد موعد التذكير"]').setAttribute('aria-label', this.translations[this.currentLanguage].reminderInputPlaceholder);
        document.querySelector('.reminder-btn').setAttribute('title', this.translations[this.currentLanguage].snoozeReminder); // This needs to be more specific for title
        document.querySelector('.light-theme-icon').setAttribute('title', this.translations[this.currentLanguage].lightTheme);
        document.querySelector('.dark-theme-icon').setAttribute('title', this.translations[this.currentLanguage].darkTheme);
    }

    validateReminderDate() {
        const reminderDate = this.flatpickrInstance.selectedDates[0];
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);

        const reminderErrorSpan = this.reminderInput.nextElementSibling.nextElementSibling; // Corrected to target the error span

        if (reminderDate && reminderDate <= now) {
            reminderErrorSpan.style.display = 'block';
        } else {
            reminderErrorSpan.style.display = 'none';
        }
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            try {
                this.notificationPermission = (await Notification.requestPermission()) === 'granted';
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            }
        }
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showAlert(this.translations[this.currentLanguage].taskTextRequired, 'error');
            return;
        }

        const reminderDate = this.reminderBtn.classList.contains('active') ?
            (this.flatpickrInstance.selectedDates[0] ? this.flatpickrInstance.selectedDates[0].toISOString() : null) : null;

        if (reminderDate) {
            const reminderDateTime = new Date(reminderDate);
            const now = new Date();
            now.setMinutes(now.getMinutes() + 1);

            if (isNaN(reminderDateTime.getTime()) || reminderDateTime <= now) {
                this.showAlert(this.translations[this.currentLanguage].reminderTimeFuture, 'error');
                return;
            }
        }

        const task = {
            id: Date.now(),
            text,
            completed: false,
            reminderDate: reminderDate,
            reminderShown: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveToStorage();
        this.render();
        this.taskInput.value = '';
        this.flatpickrInstance.clear();
        this.reminderBtn.classList.remove('active');
        this.reminderInput.style.display = 'none';
        this.reminderCalendarIcon.style.display = 'none';
        this.showAlert(this.translations[this.currentLanguage].taskAddedSuccess, 'success');
    }

    toggleReminder() {
        this.reminderBtn.classList.toggle('active');
        const isActive = this.reminderBtn.classList.contains('active');
        this.reminderInput.style.display = isActive ? 'block' : 'none';
        this.reminderCalendarIcon.style.display = isActive ? 'block' : 'none';

        if (isActive) {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 1);
            this.flatpickrInstance.set('minDate', now);
            this.flatpickrInstance.setDate(now);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;

        const taskItem = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        const taskContent = taskItem.querySelector('.task-content');

        taskContent.innerHTML = `
            <input type="text" class="task-text-input" value="${task.text}">
            <div class="task-actions">
                <button class="save-btn" title="${this.translations[this.currentLanguage].save}"><i class="fas fa-save"></i></button>
                <button class="cancel-btn" title="${this.translations[this.currentLanguage].cancel}"><i class="fas fa-times"></i></button>
            </div>
        `;

        const input = taskContent.querySelector('.task-text-input');
        const saveBtn = taskContent.querySelector('.save-btn');
        const cancelBtn = taskContent.querySelector('.cancel-btn');

        saveBtn.addEventListener('click', () => {
            const newText = input.value.trim();
            if (newText) {
                task.text = newText;
                this.saveToStorage();
                this.render();
                this.showAlert(this.translations[this.currentLanguage].taskEditedSuccess, 'success');
            } else {
                this.showAlert(this.translations[this.currentLanguage].taskTextRequired, 'error');
            }
        });

        cancelBtn.addEventListener('click', () => this.render());
    }

    editTaskReminder(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;

        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);

        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.translations[this.currentLanguage].editReminderTitle}</h3>
                    <button class="close-modal" aria-label="${this.translations[this.currentLanguage].dismissReminder}">×</button>
                </div>
                <div class="modal-body">
                    <label for="newReminderInput" class="reminder-label">${this.translations[this.currentLanguage].chooseReminderTime}</label>
                    <div class="reminder-container">
                        <input type="text" id="newReminderInput" placeholder="${this.translations[this.currentLanguage].reminderInputPlaceholder}" value="${task.reminderDate ? this.formatDateTimeForFlatpickr(task.reminderDate) : ''}" required>
                        <span class="reminder-calendar-icon"><i class="fas fa-calendar-alt"></i></span>
                        <span class="reminder-error">${this.translations[this.currentLanguage].futureTimeError}</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="save-btn"><i class="fas fa-save"></i> ${this.translations[this.currentLanguage].save}</button>
                    <button class="cancel-btn"><i class="fas fa-times"></i> ${this.translations[this.currentLanguage].cancel}</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const newReminderInput = modal.querySelector('#newReminderInput');
        const saveBtn = modal.querySelector('.save-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const closeBtn = modal.querySelector('.close-modal');
        const reminderErrorSpan = newReminderInput.nextElementSibling.nextElementSibling;

        const flatpickrLocale = this.currentLanguage === 'ar' ? flatpickr.l10ns.ar : (this.currentLanguage === 'fr' ? flatpickr.l10ns.fr : null);

        const modalFlatpickrInstance = flatpickr(newReminderInput, {
            enableTime: true,
            noCalendar: false,
            dateFormat: "Y-m-d H:i",
            minDate: now,
            time_24hr: true,
            locale: flatpickrLocale,
            onClose: (selectedDates, dateStr, instance) => {
                validateNewReminder();
            }
        });

        modal.querySelector('.reminder-calendar-icon').addEventListener('click', () => {
            modalFlatpickrInstance.open();
        });


        const validateNewReminder = () => {
            const reminderDate = modalFlatpickrInstance.selectedDates[0];
            if (reminderDate && reminderDate <= now) {
                reminderErrorSpan.style.display = 'block';
            } else {
                reminderErrorSpan.style.display = 'none';
            }
        };

        newReminderInput.addEventListener('input', validateNewReminder);

        const closeModal = () => {
            modal.remove();
        };

        saveBtn.addEventListener('click', () => {
            const reminderDate = modalFlatpickrInstance.selectedDates[0];
            if (!reminderDate || isNaN(reminderDate.getTime()) || reminderDate <= now) {
                this.showAlert(this.translations[this.currentLanguage].reminderTimeFuture, 'error');
                return;
            }

            task.reminderDate = reminderDate.toISOString();
            task.reminderShown = false;
            this.saveToStorage();
            this.render();
            this.showAlert(`${this.translations[this.currentLanguage].reminderUpdated} ${this.formatDateTime(reminderDate)}`, 'success');
            closeModal();
        });

        cancelBtn.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToStorage();
        this.render();
        this.showAlert(this.translations[this.currentLanguage].taskDeletedSuccess, 'success');
    }

    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveToStorage();
            this.render();
            this.showAlert(task.completed ? this.translations[this.currentLanguage].taskMarkedCompleted : this.translations[this.currentLanguage].taskUnmarkedCompleted, 'success');
        }
    }

    showReminderModal(task) {
        this.reminderModal.classList.add('show');
        this.modalTaskText.textContent = task.text;
        this.reminderTime.textContent = this.formatDateTime(task.reminderDate);
        this.reminderModal.dataset.taskId = task.id;
        this.playReminderSound();
    }

    playReminderSound() {
        if (this.reminderSound) {
            this.reminderSound.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    markReminderTaskAsDone() {
        const taskId = parseInt(this.reminderModal.dataset.taskId);
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            task.completedAt = new Date().toISOString();
            task.reminderShown = true;
            this.saveToStorage();
            this.render();
            this.showAlert(this.translations[this.currentLanguage].taskMarkedCompleted, 'success');
        }
        this.closeReminderModal();
    }

    snoozeReminder() {
        const taskId = parseInt(this.reminderModal.dataset.taskId);
        const task = this.tasks.find(t => t.id === taskId);
        if (task && task.reminderDate) {
            const newReminder = new Date(Date.now() + 5 * 60 * 1000);
            task.reminderDate = newReminder.toISOString();
            task.reminderShown = false;
            this.saveToStorage();
            this.render();
            this.showAlert(this.translations[this.currentLanguage].snoozeReminder, 'info');
        }
        this.closeReminderModal();
    }

    closeReminderModal() {
        this.reminderModal.classList.remove('show');
        delete this.reminderModal.dataset.taskId;
    }

    startReminderChecker() {
        if (this.reminderCheckInterval) clearInterval(this.reminderCheckInterval);
        this.reminderCheckInterval = setInterval(() => {
            const now = new Date();
            this.tasks.forEach(task => {
                if (task.reminderDate && !task.completed) {
                    const reminderTime = new Date(task.reminderDate);
                    // Check if reminderTime is valid and in the past/now
                    if (reminderTime.getTime() > 0 && reminderTime <= now && !task.reminderShown) {
                        task.reminderShown = true;
                        this.saveToStorage();

                        if (this.notificationPermission) {
                            new Notification(this.translations[this.currentLanguage].notificationTitle, {
                                body: task.text,
                                icon: './assets/icons/notification-icon.png' // Make sure you have this icon
                            });
                        }
                        this.showReminderModal(task);
                    }
                }
            });
        }, 5000); // Check every 5 seconds to be more responsive for reminders
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateFilterButtons();
        this.render();
    }

    formatDateTime(dateObj) {
        try {
            const options = {
                hour12: false,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateObj).toLocaleString(this.currentLanguage === 'ar' ? 'ar-EG' : this.currentLanguage, options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    }

    formatDateTimeForFlatpickr(dateObj) {
        try {
            const d = new Date(dateObj);
            const year = d.getFullYear();
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');
            const hours = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            console.error('Error formatting date for Flatpickr:', error);
            return '';
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving to storage:', error);
            this.showAlert(this.translations[this.currentLanguage].errorSavingData, 'error');
        }
    }

    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveToStorage();
        this.render();
        this.showAlert(this.translations[this.currentLanguage].completedTasksCleared, 'success');
    }

    updateFilterButtons() {
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    render() {
        const filteredTasks = this.tasks.filter(task => {
            if (this.currentFilter === 'pending') return !task.completed;
            if (this.currentFilter === 'completed') return task.completed;
            if (this.currentFilter === 'reminders') return task.reminderDate && !task.completed;
            return true;
        });

        this.tasksList.innerHTML = '';

        if (filteredTasks.length === 0) {
            this.emptyState.style.display = 'block';
        } else {
            this.emptyState.style.display = 'none';
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''} ${task.reminderDate ? 'has-reminder' : ''} ${task.reminderDate && new Date(task.reminderDate) <= new Date() && !task.reminderShown && !task.completed ? 'reminder-due' : ''}`;
                li.dataset.taskId = task.id;

                li.innerHTML = `
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
                    <div class="task-content">
                        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        ${task.reminderDate ? `<span class="task-reminder-info ${new Date(task.reminderDate) <= new Date() && !task.reminderShown && !task.completed ? 'due' : ''}">
                            <i class="fas fa-bell"></i> ${this.formatDateTime(task.reminderDate)}
                        </span>` : ''}
                    </div>
                    <div class="task-actions">
                        <button class="edit-btn" aria-label="${this.translations[this.currentLanguage].editTask}"><i class="fas fa-edit"></i></button>
                        <button class="reminder-action-btn" aria-label="${this.translations[this.currentLanguage].editReminderTitle}"><i class="fas fa-bell"></i></button>
                        <button class="delete-btn" aria-label="${this.translations[this.currentLanguage].taskDeletedSuccess}"><i class="fas fa-trash"></i></button>
                    </div>
                `;

                li.querySelector('.task-checkbox').addEventListener('click', () => this.toggleTask(task.id));
                li.querySelector('.edit-btn').addEventListener('click', () => this.editTask(task.id));
                li.querySelector('.reminder-action-btn').addEventListener('click', () => this.editTaskReminder(task.id));
                li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

                this.tasksList.appendChild(li);
            });
        }

        this.updateCounts();
    }

    updateCounts() {
        this.allCount.textContent = this.tasks.length;
        this.completedCount.textContent = this.tasks.filter(t => t.completed).length;
        this.pendingCount.textContent = this.tasks.filter(t => !t.completed).length;
        this.reminderCount.textContent = this.tasks.filter(t => t.reminderDate && !t.completed).length;

        // Update filter button texts with counts
        document.querySelector('[data-filter="all"] [data-key="allTasks"]').textContent = `${this.translations[this.currentLanguage].allTasks} (${this.tasks.length})`;
        document.querySelector('[data-filter="pending"] [data-key="pendingTasks"]').textContent = `${this.translations[this.currentLanguage].pendingTasks} (${this.tasks.filter(t => !t.completed).length})`;
        document.querySelector('[data-filter="completed"] [data-key="completedTasks"]').textContent = `${this.translations[this.currentLanguage].completedTasks} (${this.tasks.filter(t => t.completed).length})`;
        document.querySelector('[data-filter="reminders"] [data-key="tasksWithReminders"]').textContent = `${this.translations[this.currentLanguage].tasksWithReminders} (${this.tasks.filter(t => t.reminderDate && !t.completed).length})`;
    }


    showAlert(message, type = 'info') {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();

        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        alert.setAttribute('role', 'alert');
        alert.setAttribute('aria-live', 'assertive');
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => new TaskManager());