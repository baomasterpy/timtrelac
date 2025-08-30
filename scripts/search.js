// Constants
const ITEMS_PER_PAGE = 12;

// DOM Elements
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const resultsGrid = document.getElementById('searchResults');
const viewToggles = document.querySelectorAll('.view-toggle');
const sortSelect = document.querySelector('.sort-select');
const filterSelects = document.querySelectorAll('.filter-select');

// Sample data - Replace with actual API calls
let searchData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        age: 7,
        location: "Hà Nội",
        lastSeen: "2025-08-25",
        image: "assets/images/placeholder.jpg",
        status: "searching",
        description: "Mặc áo xanh, quần jean, đi dép xăng đan",
        urgency: "high"
    },
    // Add more sample data here
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchPage();
});

function initializeSearchPage() {
    renderResults(searchData);
    setupEventListeners();
}

function setupEventListeners() {
    // Search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch();
    });

    // View toggle (Grid/List)
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            handleViewToggle(toggle);
        });
    });

    // Sort change
    sortSelect.addEventListener('change', () => {
        handleSort();
    });

    // Filter changes
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            handleFilters();
        });
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredData = searchData.filter(item => {
        return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    });
    renderResults(filteredData);
}

function handleViewToggle(toggle) {
    const view = toggle.dataset.view;
    viewToggles.forEach(t => t.classList.remove('active'));
    toggle.classList.add('active');
    resultsGrid.className = `results-${view}`;
}

function handleSort() {
    const sortBy = sortSelect.value;
    const sortedData = [...searchData].sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return new Date(b.lastSeen) - new Date(a.lastSeen);
            case 'urgent':
                return b.urgency.localeCompare(a.urgency);
            case 'relevance':
                // Implement relevance sorting logic
                return 0;
            default:
                return 0;
        }
    });
    renderResults(sortedData);
}

function handleFilters() {
    let filteredData = [...searchData];
    
    filterSelects.forEach(select => {
        const filterValue = select.value;
        if (filterValue) {
            filteredData = filteredData.filter(item => {
                switch (select.parentElement.querySelector('.filter-label').textContent) {
                    case 'Khu vực':
                        return getRegion(item.location) === filterValue;
                    case 'Độ tuổi':
                        return isInAgeRange(item.age, filterValue);
                    case 'Giới tính':
                        return item.gender === filterValue;
                    case 'Trạng thái':
                        return item.status === filterValue;
                    default:
                        return true;
                }
            });
        }
    });
    
    renderResults(filteredData);
}

function renderResults(data) {
    resultsGrid.innerHTML = '';
    
    if (data.length === 0) {
        resultsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy kết quả</h3>
                <p>Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc.</p>
            </div>
        `;
        return;
    }

    data.forEach(item => {
        const card = createResultCard(item);
        resultsGrid.appendChild(card);
    });

    updatePagination(data.length);
}

function createResultCard(item) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const urgencyClass = item.urgency === 'high' ? 'urgent' : '';
    const statusClass = item.status === 'found' ? 'found' : '';
    
    card.innerHTML = `
        <div class="card-image ${urgencyClass} ${statusClass}">
            <img src="${item.image}" alt="Ảnh ${item.name}">
            ${item.urgency === 'high' ? '<span class="urgent-badge">Khẩn cấp</span>' : ''}
            ${item.status === 'found' ? '<span class="found-badge">Đã tìm thấy</span>' : ''}
        </div>
        <div class="card-content">
            <h3>${item.name}</h3>
            <p class="age">Tuổi: ${item.age}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
            <p class="last-seen">Lần cuối gặp: ${formatDate(item.lastSeen)}</p>
            <p class="description">${item.description}</p>
            <button class="btn btn-primary" onclick="viewDetails(${item.id})">
                Xem chi tiết
            </button>
        </div>
    `;
    
    return card;
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    // Implement pagination update logic
}

// Utility functions
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

function getRegion(location) {
    // Implement region determination logic
    const northCities = ['Hà Nội', 'Hải Phòng', 'Quảng Ninh'];
    const centralCities = ['Đà Nẵng', 'Huế', 'Quảng Nam'];
    const southCities = ['Hồ Chí Minh', 'Cần Thơ', 'Đồng Nai'];
    
    if (northCities.some(city => location.includes(city))) return 'north';
    if (centralCities.some(city => location.includes(city))) return 'central';
    if (southCities.some(city => location.includes(city))) return 'south';
    return '';
}

function isInAgeRange(age, range) {
    const [min, max] = range.split('-').map(Number);
    return age >= min && age <= max;
}

function viewDetails(id) {
    // Implement view details logic
    window.location.href = `/chi-tiet/${id}`;
}
