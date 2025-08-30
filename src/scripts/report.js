// Form validation and submission
const reportForm = document.getElementById('reportForm');
const formSections = document.querySelectorAll('.form-section');
let currentSection = 0;

// File upload limits
const PORTRAIT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const OTHER_PHOTOS_MAX_SIZE = 20 * 1024 * 1024; // 20MB

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();
    setupFileUploads();
    setupProgressTracking();
});

function setupFormValidation() {
    // Custom form validation
    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            await submitForm();
        }
    });

    // Real-time validation
    const inputs = reportForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateField(field) {
    const parent = field.closest('.form-group');
    const errorElement = parent.querySelector('.error-message') || 
                        createErrorElement(parent);
    
    // Reset errors
    field.classList.remove('invalid');
    errorElement.textContent = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('invalid');
        errorElement.textContent = 'Trường này là bắt buộc';
        return false;
    }
    
    // Custom validations based on field type
    switch (field.type) {
        case 'email':
            if (field.value && !validateEmail(field.value)) {
                field.classList.add('invalid');
                errorElement.textContent = 'Email không hợp lệ';
                return false;
            }
            break;
            
        case 'tel':
            if (field.value && !validatePhone(field.value)) {
                field.classList.add('invalid');
                errorElement.textContent = 'Số điện thoại không hợp lệ';
                return false;
            }
            break;
            
        case 'number':
            if (field.name === 'height' && field.value) {
                if (field.value < 30 || field.value > 200) {
                    field.classList.add('invalid');
                    errorElement.textContent = 'Chiều cao không hợp lệ';
                    return false;
                }
            }
            if (field.name === 'weight' && field.value) {
                if (field.value < 1 || field.value > 150) {
                    field.classList.add('invalid');
                    errorElement.textContent = 'Cân nặng không hợp lệ';
                    return false;
                }
            }
            break;
            
        case 'file':
            if (field.hasAttribute('required') && !field.files.length) {
                field.classList.add('invalid');
                errorElement.textContent = 'Vui lòng chọn file';
                return false;
            }
            break;
    }
    
    return true;
}

function validateForm() {
    let isValid = true;
    const requiredFields = reportForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            // Scroll to first error
            if (isValid) {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // File validations
    const portraitInput = reportForm.querySelector('input[name="portrait"]');
    const otherPhotosInput = reportForm.querySelector('input[name="otherPhotos"]');
    
    if (!validateFileSize(portraitInput, PORTRAIT_MAX_SIZE)) {
        isValid = false;
    }
    
    if (otherPhotosInput.files.length && 
        !validateFileSize(otherPhotosInput, OTHER_PHOTOS_MAX_SIZE)) {
        isValid = false;
    }
    
    // Consent checkbox
    const consentCheckbox = reportForm.querySelector('input[name="consent"]');
    if (!consentCheckbox.checked) {
        const errorElement = consentCheckbox.closest('.form-group')
                            .querySelector('.error-message') || 
                           createErrorElement(consentCheckbox.closest('.form-group'));
        errorElement.textContent = 'Bạn phải đồng ý với điều khoản sử dụng';
        isValid = false;
    }
    
    return isValid;
}

async function submitForm() {
    const submitButton = reportForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        
        // Create FormData object
        const formData = new FormData(reportForm);
        
        // Add any additional data processing here
        
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('success', 'Báo cáo đã được gửi thành công! Chúng tôi sẽ liên hệ sớm nhất có thể.');
        
        // Reset form
        reportForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('error', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
}

function setupFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const hint = input.closest('.file-upload').querySelector('.file-hint');
        const originalHint = hint.textContent;
        
        input.addEventListener('change', () => {
            if (input.files.length) {
                const fileList = Array.from(input.files)
                    .map(file => `${file.name} (${formatFileSize(file.size)})`)
                    .join(', ');
                hint.textContent = fileList;
            } else {
                hint.textContent = originalHint;
            }
        });
    });
}

function validateFileSize(input, maxSize) {
    const files = Array.from(input.files);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    if (totalSize > maxSize) {
        const errorElement = input.closest('.form-group')
                            .querySelector('.error-message') || 
                           createErrorElement(input.closest('.form-group'));
        errorElement.textContent = `Tổng dung lượng file không được vượt quá ${formatFileSize(maxSize)}`;
        input.classList.add('invalid');
        return false;
    }
    
    return true;
}

function setupProgressTracking() {
    // Add progress indicators
    formSections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        if (heading) {
            heading.innerHTML = `
                <span class="step-number">${index + 1}</span>
                ${heading.textContent}
            `;
        }
    });
}

// Utility functions
function createErrorElement(parent) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    parent.appendChild(errorElement);
    return errorElement;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9]{10,11}$/.test(phone.replace(/[^0-9]/g, ''));
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
