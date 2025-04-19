function toggleMode() {
    const body = document.body;
    const button = document.querySelector('.toggle-mode');

    // Chuyển đổi lớp giữa 'dark' và 'light'
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        button.textContent = 'Switch to Dark Mode';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        button.textContent = 'Switch to Light Mode';
    }
}

// Hàm tạo âm thanh "tích tắc" bằng Web Audio API
function playTickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Loại sóng âm (sine, square, sawtooth, triangle)
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Tần số âm thanh (Hz)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Âm lượng

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Phát âm thanh trong 0.1 giây
}

// Hàm cập nhật thời gian
function updateClock() {
    const now = new Date(); // Lấy thời gian hiện tại
    const hours = String(now.getHours()).padStart(2, '0'); // Lấy giờ, định dạng 2 chữ số
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Lấy phút, định dạng 2 chữ số
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Lấy giây, định dạng 2 chữ số
    const day = now.getDay(); // Lấy ngày trong tuần (0 = Chủ nhật, 6 = Thứ Bảy)

    // Cập nhật thời gian vào phần tử HTML có id="time"
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    // Cập nhật ngày trong tuần
    const weekDays = document.querySelectorAll('.week div'); // Lấy tất cả các phần tử ngày trong tuần
    weekDays.forEach((el, index) => {
        el.classList.toggle('active', index === day); // Thêm lớp 'active' cho ngày hiện tại
    });

    // Phát âm thanh "tích tắc"
    playTickSound();
}

// Gọi hàm mỗi giây
setInterval(updateClock, 1000);

// Gọi ngay khi tải trang
updateClock();