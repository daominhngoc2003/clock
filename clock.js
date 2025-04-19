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

// Hàm tạo âm thanh với tần số và âm lượng tùy chỉnh
function playSound(frequency, volume, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Loại sóng âm (sine)
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Tần số âm thanh (Hz)
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime); // Âm lượng

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration); // Phát âm thanh trong thời gian `duration`
}

// Hàm phát âm thanh "tích tắc" nhẹ nhàng hoặc âm thanh lớn khi đến tròn giờ
function playTickSound(seconds) {
    if (seconds === 0) {
        // Phát âm thanh lớn hơn khi đến tròn giờ
        playSound(800, 0.5, 0.2); // Tần số 800Hz, âm lượng 0.5, thời gian 0.2 giây
    } else {
        // Phát âm thanh nhẹ nhàng mỗi giây
        playSound(400, 0.1, 0.1); // Tần số 400Hz, âm lượng 0.1, thời gian 0.1 giây
    }
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

    // Phát âm thanh "tích tắc" hoặc âm thanh lớn khi đến tròn giờ
    playTickSound(parseInt(seconds, 10));
}

// Gọi hàm mỗi giây
setInterval(updateClock, 1000);

// Gọi ngay khi tải trang
updateClock();