// Xử lý form tìm kiếm
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Lấy giá trị từ các trường input
            const searchInput = searchForm.querySelector('.search-input').value;
            const area = searchForm.querySelector('select[value=""]').value;
            const age = searchForm.querySelector('select[value=""]').value;

            // Thực hiện tìm kiếm (sẽ được cập nhật sau)
            console.log('Đang tìm kiếm:', {
                searchTerm: searchInput,
                area: area,
                age: age
            });

            // TODO: Gọi API tìm kiếm và hiển thị kết quả
            searchAndDisplayResults(searchInput, area, age);
        });
    }
});

// Hàm giả lập tìm kiếm và hiển thị kết quả
function searchAndDisplayResults(searchTerm, area, age) {
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {
        // Xóa kết quả cũ
        resultsGrid.innerHTML = '';

        // Thêm thông báo đang tìm kiếm
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'loading-message';
        loadingMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tìm kiếm...';
        resultsGrid.appendChild(loadingMessage);

        // Giả lập delay để demo
        setTimeout(() => {
            // Xóa thông báo loading
            resultsGrid.removeChild(loadingMessage);

            // Thêm kết quả mẫu
            const sampleResults = [
                {
                    name: 'Nguyễn Văn A',
                    date: '15/08/2025',
                    location: 'Hà Nội',
                    age: '7 tuổi'
                },
                {
                    name: 'Trần Thị B',
                    date: '20/08/2025',
                    location: 'TP. Hồ Chí Minh',
                    age: '5 tuổi'
                }
            ];

            sampleResults.forEach(result => {
                const card = createResultCard(result);
                resultsGrid.appendChild(card);
            });
        }, 1000);
    }
}

// Hàm tạo card kết quả
function createResultCard(data) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <div class="card-image">
            <img src="assets/images/placeholder.jpg" alt="Ảnh trẻ">
        </div>
        <div class="card-content">
            <h3>${data.name}</h3>
            <p><i class="fas fa-calendar"></i> Thất lạc: ${data.date}</p>
            <p><i class="fas fa-map-marker-alt"></i> Địa điểm: ${data.location}</p>
            <p><i class="fas fa-child"></i> Tuổi: ${data.age}</p>
            <a href="chi-tiet.html" class="btn btn-outline">Xem chi tiết</a>
        </div>
    `;
    return card;
}
