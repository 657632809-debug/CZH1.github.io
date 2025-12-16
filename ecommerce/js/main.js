// 网站交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 资源搜索功能
    const searchInput = document.getElementById('resource-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            alert('搜索功能：正在搜索 "' + searchTerm + '"');
            // 实际搜索逻辑可以在这里实现
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // 项目筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterBtns.forEach(b => b.classList.remove('active'));
                // 给当前按钮添加active类
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // 筛选项目
                projectItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 日历导航功能
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    
    if (prevMonthBtn && nextMonthBtn && currentMonthEl) {
        // 月份数据
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        let currentMonthIndex = 2; // 3月
        let currentYear = 2025;
        
        function updateMonthDisplay() {
            currentMonthEl.textContent = months[currentMonthIndex] + ' ' + currentYear;
        }
        
        prevMonthBtn.addEventListener('click', function() {
            currentMonthIndex--;
            if (currentMonthIndex < 0) {
                currentMonthIndex = 11;
                currentYear--;
            }
            updateMonthDisplay();
            alert('切换到上一月：' + months[currentMonthIndex] + ' ' + currentYear);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonthIndex++;
            if (currentMonthIndex > 11) {
                currentMonthIndex = 0;
                currentYear++;
            }
            updateMonthDisplay();
            alert('切换到下一月：' + months[currentMonthIndex] + ' ' + currentYear);
        });
    }
    
    // 作业提交表单
    const assignmentForm = document.querySelector('.submission-form form');
    
    if (assignmentForm) {
        assignmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('assignment-title').value;
            const file = document.getElementById('assignment-file').files[0];
            const description = document.getElementById('assignment-description').value;
            
            if (title && file) {
                alert('作业提交成功！\n标题：' + title + '\n文件名：' + file.name);
                // 实际提交逻辑可以在这里实现
            } else {
                alert('请填写所有必填项');
            }
        });
    }
    
    // 讨论区主题发布
    const threadForm = document.querySelector('.create-thread form');
    
    if (threadForm) {
        threadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('thread-title').value;
            const category = document.getElementById('thread-category').value;
            const content = document.getElementById('thread-content').value;
            
            if (title && category && content) {
                alert('主题发布成功！\n标题：' + title + '\n分类：' + category);
                // 实际发布逻辑可以在这里实现
            } else {
                alert('请填写所有必填项');
            }
        });
    }
    
    // 学习进度跟踪动画
    const progressFills = document.querySelectorAll('.progress-fill');
    
    if (progressFills.length > 0) {
        // 延迟执行动画，让页面加载完成后再显示
        setTimeout(function() {
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                
                // 使用requestAnimationFrame实现平滑动画
                function animateProgress() {
                    const currentWidth = parseInt(fill.style.width) || 0;
                    const targetWidth = parseInt(width);
                    
                    if (currentWidth < targetWidth) {
                        fill.style.width = (currentWidth + 1) + '%';
                        requestAnimationFrame(animateProgress);
                    } else {
                        fill.style.width = width;
                    }
                }
                
                animateProgress();
            });
        }, 500);
    }
    
    // 滚动到顶部按钮
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background-color: #1E88E5;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // 滚动到顶部功能
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 动态通知栏
    const notifications = [
        { date: '2025-03-18', content: '第4周实训作业开始，请同学们按时完成' },
        { date: '2025-03-20', content: '第1-2周测验成绩已发布，请及时查看' },
        { date: '2025-03-25', content: '案例研讨活动将于本周四下午2点举行' }
    ];
    
    // 创建动态通知
    function createNotification(notification) {
        const notificationEl = document.createElement('div');
        notificationEl.className = 'notification-item';
        notificationEl.innerHTML = `
            <span class="notification-date">${notification.date}</span>
            <p>${notification.content}</p>
        `;
        return notificationEl;
    }
    
    // 将通知添加到页面
    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        notifications.forEach(notification => {
            const notificationEl = createNotification(notification);
            notificationList.appendChild(notificationEl);
        });
    }
    
    // 实训安排提醒
    const trainingReminders = [
        {
            title: '第4周：物流模式对比实训',
            time: '3月18日-3月22日',
            task: '对比京东自营物流与顺丰第三方物流差异'
        },
        {
            title: '第5周：仓储规划实训',
            time: '3月25日-3月29日',
            task: '设计小型电商的物流过程方案'
        }
    ];
    
    // 创建实训提醒
    function createTrainingReminder(reminder) {
        const reminderEl = document.createElement('div');
        reminderEl.className = 'training-item';
        reminderEl.innerHTML = `
            <h3>${reminder.title}</h3>
            <p>时间：${reminder.time}</p>
            <p>任务：${reminder.task}</p>
        `;
        return reminderEl;
    }
    
    // 将实训提醒添加到页面
    const trainingList = document.querySelector('.training-list');
    if (trainingList) {
        trainingReminders.forEach(reminder => {
            const reminderEl = createTrainingReminder(reminder);
            trainingList.appendChild(reminderEl);
        });
    }
    
    // 下载按钮点击事件
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('下载功能：正在下载文件...');
        });
    });
    
    // 开始测验按钮点击事件
    const startBtns = document.querySelectorAll('.start-btn:not(.disabled)');
    startBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('测验功能：正在加载测验...');
        });
    });
    
    // 查看项目详情按钮点击事件
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectTitle = this.closest('.project-item').querySelector('h3').textContent;
            alert('项目展示：查看 "' + projectTitle + '" 的详细内容');
        });
    });
    
    // 提交项目按钮点击事件
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('项目提交功能：跳转到作业提交页面');
            window.location.href = 'assignments.html';
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});