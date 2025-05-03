// Mock notifications data
const mockNotifications = [
    {
      id: '1',
      platform: 'fiverr',
      title: 'New Order Received',
      message: 'Client John D. has placed a new order for Logo Design. Budget: $150',
      time: '5 minutes ago',
      status: 'new',
      read: false,
      orderId: 'FVR-2023-001'
    },
    {
      id: '2',
      platform: 'upwork',
      title: 'Interview Request',
      message: 'Tech Solutions Inc. wants to interview you for Web Development project',
      time: '1 hour ago',
      status: 'pending',
      read: false,
      orderId: 'UW-2023-042'
    },
    {
      id: '3',
      platform: 'paypal',
      title: 'Payment Received',
      message: 'You received $450.00 from Creative Agency for Website Development',
      time: '3 hours ago',
      status: 'completed',
      read: true,
      orderId: 'PP-2023-127'
    },
    {
      id: '4',
      platform: 'cgtrader',
      title: 'Model Sold',
      message: 'Your 3D City Model has been purchased. You earned $85.00',
      time: '5 hours ago',
      status: 'completed',
      read: true,
      orderId: 'CGT-2023-019'
    }
  ];
  
  // State management
  let notifications = [...mockNotifications];
  let selectedPlatform = null;
  
  // DOM Elements
  const notificationButton = document.getElementById('notification-button');
  const notificationPanel = document.getElementById('notification-panel');
  const notificationsList = document.getElementById('notifications-list');
  const notificationBadge = document.getElementById('notification-badge');
  const closePanel = document.getElementById('close-panel');
  const markAllRead = document.getElementById('mark-all-read');
  const platformButtons = document.querySelectorAll('.platform-button');
  
  // Helper functions
  function getStatusIcon(status) {
    switch (status) {
      case 'completed':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
      case 'pending':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
      case 'urgent':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
      default:
        return '';
    }
  }
  
  function getPlatformIcon(platform) {
    const icons = {
      fiverr: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
      upwork: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      paypal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>',
      cgtrader: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
    };
    return icons[platform] || '';
  }
  
  function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    notificationBadge.textContent = unreadCount;
    notificationBadge.classList.toggle('hidden', unreadCount === 0);
  }
  
  function renderNotifications() {
    const filteredNotifications = selectedPlatform
      ? notifications.filter(n => n.platform === selectedPlatform)
      : notifications;
  
    if (filteredNotifications.length === 0) {
      notificationsList.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">No notifications</h3>
          <p class="mt-1 text-sm text-gray-500">You're all caught up! Check back later for new updates.</p>
        </div>
      `;
      return;
    }
  
    notificationsList.innerHTML = filteredNotifications
      .map(notification => `
        <div class="notification-item ${!notification.read ? 'unread' : ''}" data-id="${notification.id}">
          <div class="notification-content">
            <div class="notification-icon ${notification.platform}-bg">
              ${getPlatformIcon(notification.platform)}
            </div>
            <div class="notification-details">
              <div class="notification-header-content">
                <span class="notification-title">${notification.title}</span>
                <span class="notification-time">${notification.time}</span>
              </div>
              <p class="notification-message">${notification.message}</p>
              <div class="notification-status status-${notification.status}">
                ${getStatusIcon(notification.status)}
                <span>${notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>
      `)
      .join('');
  }
  
  // Event Listeners
  notificationButton.addEventListener('click', () => {
    notificationPanel.classList.toggle('hidden');
  });
  
  closePanel.addEventListener('click', () => {
    notificationPanel.classList.add('hidden');
  });
  
  markAllRead.addEventListener('click', () => {
    notifications = notifications.map(n => ({ ...n, read: true }));
    updateNotificationBadge();
    renderNotifications();
  });
  
  platformButtons.forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.dataset.platform;
      selectedPlatform = selectedPlatform === platform ? null : platform;
      
      platformButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.platform === selectedPlatform);
      });
      
      renderNotifications();
    });
  });
  
  notificationsList.addEventListener('click', (e) => {
    const notificationItem = e.target.closest('.notification-item');
    if (notificationItem) {
      const id = notificationItem.dataset.id;
      const notification = notifications.find(n => n.id === id);
      if (notification && !notification.read) {
        notification.read = true;
        updateNotificationBadge();
        renderNotifications();
      }
    }
  });
  
  // Initialize
  updateNotificationBadge();
  renderNotifications();