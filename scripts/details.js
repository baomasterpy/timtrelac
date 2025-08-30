// Constants
const MAPS_API_KEY = 'YOUR_MAPS_API_KEY';  // Replace with actual API key
const SHARING_URL = window.location.href;

// DOM Elements
const photoGrid = document.querySelector('.photo-grid');
const mapContainer = document.querySelector('.map-container');
const shareButtons = document.querySelectorAll('.share-buttons button');
const reportButton = document.querySelector('.case-report button');
const updatesList = document.querySelector('.updates-list');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDetailsPage();
});

function initializeDetailsPage() {
    setupPhotos();
    setupMap();
    setupSharing();
    setupReporting();
    setupUpdates();
}

// Photo Gallery
function setupPhotos() {
    const photos = photoGrid.querySelectorAll('img');
    
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            openPhotoModal(photo.src);
        });
    });
}

function openPhotoModal(src) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <img src="${src}" alt="Full size photo">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Maps Integration
function setupMap() {
    // Replace with actual maps implementation
    // This is just a placeholder
    const mapPlaceholder = `
        <div class="map-placeholder">
            <i class="fas fa-map-marker-alt"></i>
            <p>Bản đồ đang tải...</p>
        </div>
    `;
    mapContainer.innerHTML = mapPlaceholder;
}

// Social Sharing
function setupSharing() {
    const shareData = {
        title: document.title,
        text: 'Hãy giúp tìm kiếm. Xem chi tiết tại:',
        url: SHARING_URL
    };

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.textContent.trim().toLowerCase();
            shareContent(platform, shareData);
        });
    });
}

function shareContent(platform, data) {
    const encodedUrl = encodeURIComponent(data.url);
    const encodedText = encodeURIComponent(`${data.text} ${data.url}`);
    
    let shareUrl;
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodedText}`;
            break;
        default:
            return;
    }
    
    if (!shareUrl.startsWith('mailto:')) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    } else {
        window.location.href = shareUrl;
    }
}

// Reporting
function setupReporting() {
    reportButton.addEventListener('click', () => {
        openReportModal();
    });
}

function openReportModal() {
    const modal = document.createElement('div');
    modal.className = 'report-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <h2>Báo cáo thông tin mới</h2>
            <form class="report-form">
                <div class="form-group">
                    <label class="form-label">Thời gian phát hiện</label>
                    <input type="datetime-local" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Địa điểm</label>
                    <input type="text" class="form-input" placeholder="Nhập địa điểm cụ thể" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Mô tả chi tiết</label>
                    <textarea class="form-textarea" rows="4" placeholder="Mô tả chi tiết những gì bạn đã thấy" required></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Thông tin liên hệ của bạn</label>
                    <input type="text" class="form-input" placeholder="Họ tên">
                    <input type="tel" class="form-input" placeholder="Số điện thoại">
                    <input type="email" class="form-input" placeholder="Email">
                </div>
                <div class="form-group">
                    <label class="form-label">Hình ảnh (nếu có)</label>
                    <input type="file" accept="image/*" multiple>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Gửi thông tin</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const form = modal.querySelector('form');
    const closeButton = modal.querySelector('.modal-close');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitReport(form);
    });
    
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function submitReport(form) {
    // Replace with actual API call
    console.log('Submitting report...');
    const formData = new FormData(form);
    // API call here
    
    // Show success message
    alert('Cảm ơn bạn đã cung cấp thông tin. Chúng tôi sẽ xác minh và cập nhật sớm nhất có thể.');
    
    // Close modal
    const modal = form.closest('.report-modal');
    if (modal) {
        modal.remove();
    }
}

// Updates
function setupUpdates() {
    // Set up real-time updates if available
    // This is just a placeholder
    console.log('Setting up updates...');
}

// Add live updates via WebSocket or polling
function addUpdate(update) {
    const updateElement = document.createElement('div');
    updateElement.className = 'update-item';
    updateElement.innerHTML = `
        <div class="update-time">${update.time}</div>
        <div class="update-content">
            <p>${update.content}</p>
        </div>
    `;
    
    updatesList.insertBefore(updateElement, updatesList.firstChild);
}

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function validateForm(form) {
    // Add custom form validation logic here
    return form.checkValidity();
}
